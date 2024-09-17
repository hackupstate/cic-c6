import express from "express";
import cors from "cors";
import { Book, db } from "./db/db.js";

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
	console.log(req.body);
	res.send({ server: "running" });
});

server.get("/books", async (req, res) => {
	res.send({ books: await Book.findAll() });
});

server.listen(3001, () => {
	console.log("Server is running");
});
