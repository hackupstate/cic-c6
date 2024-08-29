import { DataTypes } from "sequelize";

const PostModel = (db) => {
	return db.define("post", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: DataTypes.STRING,
		content: DataTypes.TEXT,
		authorID: DataTypes.INTEGER,
	});
};

export default PostModel;
