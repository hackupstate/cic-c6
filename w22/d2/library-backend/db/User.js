import { DataTypes } from "sequelize";

const UserModel = (db) => {
	return db.define("user", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
	});
};

export default UserModel;
