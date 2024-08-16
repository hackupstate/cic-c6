import "./App.css";
import { useEffect, useState } from "react";

function App() {
	// #8 Set up state as an empty array to eventually store the tasks
	//coming back from the backend
	// #16 State is updated using setTasks method
	const [tasks, setTasks] = useState([]);

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

	return (
		<div className="App">
			{/* #17 State has been updated so rerun this map */}
			{tasks.map((task) => {
				// #18 Using each indiviudal task in the database, show a
				//new <li> that uses the tasks ID for a key, and the name column
				//for the contents of the bullet/
				return <li key={task.id}>{task.name}</li>;
			})}
		</div>
	);
}

export default App;
