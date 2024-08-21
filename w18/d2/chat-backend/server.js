import express from "express";
import cors from "cors";
import { db, Message } from "./db/db.js";

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
	res.send({ server: "running" });
});

server.get("/messages", async (req, res) => {
	res.send({ messages: await Message.findAll({ order: ["timestamp"] }) });
});

server.post("/message", async (req, res) => {
	console.log(req.body);
	await Message.create(req.body);
	res.send();
});

server.put("/editMessage", async (req, res) => {
	const messageToEdit = await Message.findOne({ where: { id: req.body.id } });
	console.log(messageToEdit);
	messageToEdit.text = req.body.newMessageText;
	await messageToEdit.save();
	res.send({ messages: await Message.findAll({ order: ["timestamp"] }) });
});

server.listen(3001, () => {
	console.log("Server is listening for requests");
});
