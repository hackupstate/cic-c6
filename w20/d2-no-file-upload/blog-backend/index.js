import express from "express";
import cors from "cors";
import { db, Post, User } from "./db/db.js";
import bcrypt from "bcrypt";

const server = express();
server.use(cors());
server.use(express.json());

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

server.put("/post", async (req, res) => {
	await Post.update(
		{ title: req.body.post.title, content: req.body.post.content },
		{
			where: {
				id: req.body.post.id,
			},
		}
	);
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
