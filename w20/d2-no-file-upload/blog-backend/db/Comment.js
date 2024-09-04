import { DataTypes } from "sequelize";

const CommentModel = (db) => {
	return db.define("comment", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		text: DataTypes.TEXT,
		authorID: DataTypes.INTEGER,
	});
};

export default CommentModel;
