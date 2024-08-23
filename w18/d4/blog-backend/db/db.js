import Sequelize from "sequelize";
import PostModel from "./Post.js";
import CommentModel from "./Comment.js";
import UserModel from "./User.js";

const db = new Sequelize("postgres://localhost:5432/blog", {
	logging: false,
});
const Post = PostModel(db);
const User = UserModel(db);
const Comment = CommentModel(db);

Post.belongsTo(User, { foreignKey: "authorID" });

const connectToDB = async () => {
	try {
		await db.authenticate();
		console.log("Connected to DB");

		db.sync(); //{ alter: true }
	} catch (error) {
		console.error(error);
		console.error("DB Connection FAILED!");
	}
};

connectToDB();

export { db, Post, Comment, User };
