import "./App.css";
import { useEffect, useState } from "react";

function App() {
	// #8 Set up state as an empty array to eventually store the tasks
	//coming back from the backend
	// #16 State is updated using setTasks method
	const [tasks, setTasks] = useState([]);
	const [newItemText, setNewItemText] = useState("");

	// #9 When the component loads, make the API call
	useEffect(() => {
		const makeAPICall = async () => {
			// #10 Go make the API call to the tasks endpoint on the backend
			const response = await fetch("http://localhost:3001/tasks");
			//#14 Parse the JSON from the backend
			const data = await response.json();
			console.log(data);
			// #15 Set the data from the backend into state
			setTasks(data.tasks);
		};
		makeAPICall();
	}, []);

	// #21 Function runs because form is submitted
	const addNewTask = async (event) => {
		event.preventDefault();

		// #22 Make a POST request to the backend /tasks endpoint
		const response = await fetch("http://localhost:3001/tasks", {
			method: "POST",
			headers: {
				// #23 Specify to the backend that the body is formatted as JSON
				"Content-Type": "application/json",
			},
			// #24 Convert a object that holds the inputted text from state into JSON
			body: JSON.stringify({ newItem: newItemText }),
		});
		// #29 Parse out the JSON
		const data = await response.json();
		// #30 Look the tasks key in the response and set it into state
		setTasks(data.tasks);
		// #31 Clear out the inputted text box
		setNewItemText("");
	};

	return (
		<div className="App" style={{ margin: 25 }}>
			<form onSubmit={addNewTask}>
				{/* #19 Enters a new task into the textbox which updates state */}
				<input
					type="text"
					value={newItemText}
					onChange={(event) => {
						setNewItemText(event.target.value);
					}}
				/>
				{/* #20 User submits form  */}
				<button type="submit">Add Item</button>
			</form>
			{/* #17 State has been updated so rerun this map */}
			{/* #32 Tasks were updated in state, rerun this map to show the newly added item */}
			{tasks.map((task) => {
				// #18 Using each indiviudal task in the database, show a
				//new <li> that uses the tasks ID for a key, and the name column
				//for the contents of the bullet
				return (
					<li
						key={task.id}
						style={{
							textDecoration: task.completed
								? "line-through"
								: "",
						}}
					>
						<input
							type="checkbox"
							checked={task.completed}
							onChange={async (event) => {
								const response = await fetch(
									`http://localhost:3001/tasks/${task.id}/${event.target.checked}`,
									{
										method: "PATCH",
									}
								);

								const data = await response.json();
								setTasks(data.tasks);
							}}
						/>
						{task.name}
						<button
							onClick={async (event) => {
								if (
									window.confirm(
										"Are you sure you want to delete this task?"
									)
								) {
									const response = await fetch(
										`http://localhost:3001/tasks?queryID=${task.id}`,
										{ method: "DELETE" }
									);
									const data = await response.json();
									setTasks(data.tasks);
								}
							}}
						>
							🗑️
						</button>
					</li>
				);
			})}
		</div>
	);
}

export default App;
