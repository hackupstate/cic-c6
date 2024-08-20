// #1 Import express (node API framework), cors (which lets frontends
// access our API) & pg (postgres database client) from NPM (these need)
// to be installed before we can import them
const express = require("express");
const cors = require("cors");
const pg = require("pg");

//#2 Set up our express server and tell it to allow CORS requests
const server = express();
server.use(cors());
server.use(express.json());

// #3 Set up connection details for postgres client
const db = new pg.Client({
	database: "todo",
});

// #4 Connect to DB using details from #3
db.connect();

// #5 Create endpoint at root URL to send back some data
server.get("/", (request, response) => {
	console.log("We got our first request!");
	response.send({ hello: "world!", favoriteAnimal: "elephant" });
});

// #6 Create another GET endpoint at the /tasks URL
// #11 A request came in from the front end to this endpoint
server.get("/tasks", async (req, res) => {
	//#12 Run a SQL query using the connection from 3 & 4. Store the
	//results in dbResult
	const dbResult = await db.query(`SELECT * FROM todos;`);

	// #13 Extract the rows from the result and send them back in a
	//response to the request on the frontend #10
	res.send({ tasks: dbResult.rows });
});

// #25 This endpoint now runs because the frontend made a request
server.post("/tasks", async (req, res) => {
	console.log("post request received", req.body);
	// #26 Extract out the data from the body using the JSON parser
	//we set up on express. Generate a SQL INSERT command that drops in
	// the new item text from the front end into the VALUES
	await db.query(
		`INSERT INTO todos (name, completed) VALUES ('${req.body.newItem}', false);`
	);

	// #27 Run a SQL command to get all the todos in the database, now including the
	// new item we inserted from #26.
	const dbResult = await db.query(`SELECT * FROM todos;`);
	// #28 Respond to the request with the new todos.
	res.send({ tasks: dbResult.rows });
});

server.patch("/tasks/:paramsID/:completed", async (req, res) => {
	console.log(req.params.paramsID, req.params.completed);
	await db.query(
		`UPDATE todos SET completed=${req.params.completed} WHERE id=${req.params.paramsID};`
	);
	const dbResult = await db.query(`SELECT * FROM todos;`);
	res.send({ tasks: dbResult.rows });
});

server.delete("/tasks", async (req, res) => {
	await db.query(`DELETE FROM todos WHERE id=${req.query.queryID};`);
	const dbResult = await db.query(`SELECT * FROM todos;`);
	res.send({ tasks: dbResult.rows });
});

// #7 After creating all endpoints, tell the server to listen on
//port 3001.
server.listen(3001, () => {
	console.log("Server listening on 3001");
});
