import express from "express";
import cors from "cors";
import { db, Post, RandomWords, User } from "./db/db.js";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import { createClerkClient } from '@clerk/backend';
import randomWord from "random-word";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const server = express();
server.use(cors());
server.use(express.json());

const validateUserTokenMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).send({ error: 'Authorization header not specified!' });
    return;
  }

  const headerParts = header.split(' ');
  if (headerParts.length !== 2) {
    res.status(401).send({ error: `Malformed Authorization header - expected two words, found ${headerParts.length}` });
    return;
  }

  if (headerParts[0] !== 'Bearer') {
    res.status(401).send({ error: `Malformed Authorization header - expected Bearer scheme, found ${headerParts[0]}` });
    return;
  }

  const token = headerParts[1];
  if (token.length === 0) {
    res.status(401).send({ error: 'Malformed Authorization header - missing token!' });
    return;
  }

  const publicKey = fs.readFileSync('./clerk-public-key.pem', { encoding: 'utf-8' });
  let decoded;
  try {
    decoded = jwt.verify(token, publicKey);
  } catch (error) {
    console.error('Error validating token:', error.message);
    res.status(401).json({ error: 'Malformed Authorization header - invalid token!' });
    return;
  }

  // Extract the clerk user id from the decoded token data
  req.auth = { clerkUserId: decoded.sub };
  next();
};
server.use(validateUserTokenMiddleware);

server.get("/secret-word", (req, res) => {
  RandomWords.findOne({
	  where: { clerkId: req.auth.clerkUserId },
  }).then(matchingRow => {
	  if (matchingRow) {
		  // If a word is found, return it!
      res.send({ data: matchingRow.randomWord });
	    return;
	  }
  
	  // matchingRow is null!
	  // The word wasn't found - create a random word
	  const word = randomWord();
    RandomWords.create({
	    clerkId: req.auth.clerkUserId,
	    randomWord: word,
    }).then(() => {
      res.send({ data: word });
    });
  });
  
  //   console.log(decoded.sub)
  //   clerkClient.users.getUser(decoded.sub).then(user => {
  // 	console.log('USER:', user);
  
  // 	// Only allow in users that have an email that ends in `@gmail.com`
  // 	if (
  // 		user.primaryEmailAddress.emailAddress &&
  // 		user.primaryEmailAddress.emailAddress.endsWith("@gmail.com")
  // 	) {
  //       // Send secret word!
  //       res.send({ data: 'Gorillas' });
  // 	} else {
  //       // Send other word!
  //       res.send({ data: 'No gmail ending' });
  // 	}
  //   });
});


server.get("/", (req, res) => {
	res.send({ api: "online" });
});

server.get("/posts", async (req, res) => {
	res.send({
		posts: await Post.findAll({
			include: [
				{
					model: User,
					attributes: ["id", "firstName", "lastName"],
				},
			],
		}),
	});
});

server.get("/post/:id", async (req, res) => {
	res.send({ post: await Post.findByPk(req.params.id) });
});

server.post("/posts", async (req, res) => {
	await Post.create(req.body);
	res.send();
});

server.post("/login", async (req, res) => {
	const matchingUser = await User.findOne({
		where: { email: req.body.email },
	});

	if (!matchingUser) {
		return res.send({
			error: true,
			message: "No account found with that email address",
		});
	}

	const validPassword = bcrypt.compareSync(
		req.body.password,
		matchingUser.password
	);
	if (!validPassword) {
		res.send({ error: true, message: "Wrong password. No soup for you." });
	} else {
		res.send({ error: false, userID: matchingUser.id });
	}
});

server.delete("/post/:postID", async (req, res) => {
	await Post.destroy({
		where: {
			id: req.params.postID,
		},
	});
	res.send();
});

server.listen(3001, () => {
	console.log("API server online");
});

const checkForExistingUser = await User.findOne({
	where: { email: "maxm@hackupstate.com" },
});
if (!checkForExistingUser) {
	await User.create({
		email: "maxm@hackupstate.com",
		password: bcrypt.hashSync("notsosecure", 10),
		firstName: "Max",
		lastName: "Matthews",
	});
}
