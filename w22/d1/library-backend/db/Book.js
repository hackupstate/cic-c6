import { DataTypes } from "sequelize";

const BookModel = (db) => {
	return db.define("book", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: DataTypes.STRING,
		author: DataTypes.STRING,
	});
};

export default BookModel;
