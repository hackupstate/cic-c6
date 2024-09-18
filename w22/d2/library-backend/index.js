import express from "express";
import cors from "cors";
import { Book, CheckedOut, db, User } from "./db/db.js";
import { Op } from "sequelize";

const server = express();
server.use(cors());
server.use(express.json());

server.get("/test", (req, res) => {
	res.send({ server: "running" });
});

server.get("/books", async (req, res) => {
	res.send({ books: await Book.findAll() });
});

server.post("/book", async (req, res) => {
	await Book.create(req.body);
	res.send({});
});

server.get("/users", async (req, res) => {
	res.send({ users: await User.findAll() });
});

server.post("/checkedOut", async (req, res) => {
	const alreadyCheckedOut = await CheckedOut.findOne({ where: req.body });
	if (alreadyCheckedOut) {
		res.send({ error: "You already have this (jackass)" });
	} else {
		await CheckedOut.create(req.body);
		res.send({ success: true });
	}
});

server.get("/checkedOutBooks/:userID", async (req, res) => {
	res.send({
		checkedOutBooks: await CheckedOut.findAll({
			where: { userID: req.params.userID },
			include: [Book],
		}),
	});
});

server.post("/search", async (req, res) => {
	res.send({
		books: await Book.findAll({
			where: { title: { [Op.iLike]: `%${req.body.searchText}%` } },
		}),
	});
});

server.listen(3002, () => {
	console.log("Server running on 3002");
});
