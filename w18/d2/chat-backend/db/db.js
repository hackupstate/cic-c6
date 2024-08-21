// F3 Import sequelize from npm
import Sequelize from "sequelize";
// F4 Import message model from message.js in the same folder as db.js
import MessageModel from "./Message.js";

// F8 Specifiy the configuration to use Sequelize to connect to the db.
// Messages (the name of the DB) must exist before we can connect to it.
// We happened to create it in BeeKeeper.
const db = new Sequelize("postgres://localhost:5432/messages");
// F9 Now give the model from F4 access to the DB. What it returns will
//be an accessible portal to the messages table.
const Message = MessageModel(db);

// F11 Make an async function so we can use the await keyword
const connectToDB = async () => {
	// F13 Surround this in a try/catch block, so we can easily handle
	//if the DB connection fails
	try {
		// F14 Authenticate with the DB. This is testing our connection
		// from F8 to make sure it's working, with assuming it is and
		// running into problems when we go to execute our first query.
		await db.authenticate();
		// F15 Log this out only if there isn't a problem
		console.log("Connected to the database");

		// F16 If there are modles (like from F9) that don't have a table
		//yet in the database, go create those tables using the model structure.
		db.sync(); //{force: true}
	} catch (error) {
		// F17 If there is an error, log these two out so we can debug.
		console.error(error);
		console.error("DB ISSUE! EVERYONE PANIC!");
	}
};
// F12 Execute the async function from F11
connectToDB();

// F18 Export the model instances out so we can use them to interact with the db
// in other files like server.js
export { db, Message };
