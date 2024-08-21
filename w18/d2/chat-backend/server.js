//F1 Import express and cors packages from npm (they need to be installed first)
import express from "express";
import cors from "cors";
// F2 Import db.js file from db folder (F18)
import { db, Message } from "./db/db.js";

// F19 Set up an express server
const server = express();
// F20 Tell the server that CORS requests are allowed
server.use(cors());
// F21 Tell the server if JSON is sent in, parse it and store it
// in req.body
server.use(express.json());

// F22 Set up a bunch of endpoints based off a URL and a method type
server.get("/", (req, res) => {
	res.send({ server: "running" });
});

server.get("/messages", async (req, res) => {
	res.send({ messages: await Message.findAll({ order: ["timestamp"] }) });
});

// F30 The request comes in from the frontend
server.post("/message", async (req, res) => {
	console.log(req.body);
	// F31 using the Message model instance from F2, create a row in the database
	//using the data sent in from the body. Because the object names in the
	// body match the column names in the model, Sequelize can build the INSERT INTO
	// statement for us.
	await Message.create(req.body);
	// F32 We *always* need to respond to a request, so send something back, even if
	// it's empty.
	res.send();
});

server.put("/editMessage", async (req, res) => {
	const messageToEdit = await Message.findOne({ where: { id: req.body.id } });
	console.log(messageToEdit);
	messageToEdit.text = req.body.newMessageText;
	await messageToEdit.save();
	res.send({ messages: await Message.findAll({ order: ["timestamp"] }) });
});

// F23 When the endpoints are done being created, tell the server to listen on
// port 3001 for any incoming requests from fetches on the frontend
server.listen(3001, () => {
	console.log("Server is listening for requests");
});
