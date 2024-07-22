import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
	const [taskText, setTaskText] = useState("");
	const [tasks, setTasks] = useState([]);

	// console.log("hi");
	const addTask = (event) => {
		event.preventDefault();

		console.log("Form submitted");

		setTasks([...tasks, taskText]);
	};

	return (
		<div className="App">
			<h1>To Do List App</h1>
			<form onSubmit={addTask}>
				<input
					type="text"
					value={taskText}
					onChange={(event) => {
						setTaskText(event.target.value);
					}}
				/>
				<button type="submit">Add Task</button>
			</form>
			<ul>
				{tasks.map((task) => {
					return <li>{task}</li>;
				})}
			</ul>
		</div>
	);
}

export default App;
