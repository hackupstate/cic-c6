import { Sequelize } from "sequelize";
import BookModel from "./Book.js";
import UserModel from "./User.js";
import bookSeed from "./bookSeed.json" with {type: "json"};
import CheckedOutModel from "./CheckedOut.js";

const db = new Sequelize(`postgres://localhost:5432/library`, {
	logging: false,
});

const Book = BookModel(db);
const User = UserModel(db);
const CheckedOut = CheckedOutModel(db);

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

		const existingUsers = await User.findAll();
		if (existingUsers.length === 0){
			await User.create({name: "Max"});
			await User.create({name: "Joe"});
			await User.create({name: "Teri"});
		}

		User.hasMany(CheckedOut, {foreignKey: "userID"});
		CheckedOut.belongsTo(Book, {foreignKey: "bookID"});
	} catch (err) {
		console.error(err);
		console.error("DB failure");
	}
};

connectToDB();
export { db, Book, User, CheckedOut };
