import { Sequelize } from "sequelize";
import BookModel from "./Book.js";
import bookSeed from "./bookSeed.json" with {type: "json"};

const db = new Sequelize(`postgres://localhost:5432/library`, {
	logging: false,
});

const Book = BookModel(db);

// CheckedOutBook.belongsTo(User, { foreignKey: "userID" });

const connectToDB = async () => {
	try {
		await db.authenticate();
		console.log("DB connected");

		await db.sync();

		const existingBooks = await Book.findAll();
		if (existingBooks.length===0){
			for (const bookData of bookSeed){
				await Book.create(bookData)
			}
		}
	} catch (err) {
		console.error(err);
		console.error("DB failure");
	}
};

connectToDB();
export { db, Book };
