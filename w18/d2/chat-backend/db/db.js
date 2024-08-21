import Sequelize from "sequelize";
import MessageModel from "./Message.js";

const db = new Sequelize("postgres://localhost:5432/messages");
const Message = MessageModel(db);

const connectToDB = async () => {
	try {
		await db.authenticate();
		console.log("Connected to the database");

		db.sync();
	} catch (error) {
		console.error(error);
		console.error("DB ISSUE! EVERYONE PANIC!");
	}
};

connectToDB();

export { db, Message };
