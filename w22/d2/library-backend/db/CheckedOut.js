import { DataTypes } from "sequelize";

const CheckedOutModel = (db) => {
	return db.define("checkedOut", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		bookID: DataTypes.INTEGER,
		userID: DataTypes.INTEGER,
	});
};

export default CheckedOutModel;
