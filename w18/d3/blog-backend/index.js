import express from "express";
import cors from "cors";
import { db, Post } from "./db/db.js";

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
	res.send({ api: "online" });
});

server.get("/posts", async (req, res) => {
	res.send({ posts: await Post.findAll() });
});

server.post("/posts", async (req, res) => {
	await Post.create(req.body);
	res.send();
});

server.listen(3001, () => {
	console.log("API server online");
});
