// F5 Import DataTypes from Sequelize so we can define the types of the columns
import { DataTypes } from "sequelize";

// F6 This is a function, so we don't run it yet.
const Message = (db) => {
	// F10 We now have access to the DB from F8, so tell the database
	//to define a new model (table) with four columns and specify each
	// of their datatypes.
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

// F7 Export the function so it can be accessed in db.js
export default Message;
