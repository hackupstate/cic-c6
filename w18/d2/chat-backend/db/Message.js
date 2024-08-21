import { DataTypes } from "sequelize";

const Message = (db) => {
	return db.define("message", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		text: DataTypes.TEXT,
		outgoing: DataTypes.BOOLEAN,
		timestamp: DataTypes.DATE,
	});
};

export default Message;
