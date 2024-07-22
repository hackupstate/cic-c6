import logo from "./logo.svg";
import "./App.css";
// #1 Import useState hook from react.
import { useState } from "react";

// #2 Create a function component that uses some JS and returns HTML to show to the user.
function App() {
	// #3 Create two variables that will hold our inputted task text. The first variable holds the
	//value of what is typed in. The second variable is a function that allows us to update the value.
	//We need square braces around them because useState returns more than one value. We set that equal
	//to useState from #1 and the parameter useState takes is the initial value of taskText.
	//We need to use state whenever we have a value (or data) that should be shown to the end user.
	const [taskText, setTaskText] = useState("");
	// #4 We do the same thing to create another state variable, but this time we set the initial value to
	//an array because we will be storing the list of tasks in this variable.
	const [tasks, setTasks] = useState([]);

	// #5 Create function for adding task but ignore it until called.
	// #11 This function now runs
	const addTask = (event) => {
		// #12 Prevent the page from refreshing
		event.preventDefault();

		console.log("Form submitted");

		//#13 Make a new array that has a copy of the current task array spread out into it and add to the
		// end of the array, the taskText stored in state from #8,9,3. Then take that new array and set it into
		//the tasks from #4.
		setTasks([...tasks, { done: false, name: taskText }]);
	};

	const doneButtonClicked = (index) => {
		console.log("done button clicked", index);
		const updatedTasks = [...tasks];
		updatedTasks[index].done = true;
		setTasks(updatedTasks);
		console.log(updatedTasks);
	};

	// #6 Hit the return of our component, this is what will get shown to the end user.
	return (
		<div className="App">
			<h1>To Do List App</h1>
			{/* #7 Tie the form submission to the function in #5. The curly braces say to React, switch
			from HTML to some JS code. */}
			<form onSubmit={addTask}>
				<input
					type="text"
					// #8 Tie the value of this input to the state from #3. This is called a controlled input when
					//we link the onChange and value to state in React.
					value={taskText}
					onChange={(event) => {
						// #9 On change of this input (every letter press), set the value of the input
						//into state so we can control and access what is typed in.
						setTaskText(event.target.value);
					}}
				/>
				{/* #10 User submits task.  */}
				<button type="submit">Add Task</button>
			</form>
			<ul>
				{/* #14 Map (loop) over the tasks from #4 */}
				{tasks.map((task, index) => {
					// #15 For each task in the array, return out a <li> with the task text in between the tags.
					return (
						<li
							key={index}
							style={{
								textDecoration: task.done ? "line-through" : "",
							}}
						>
							{task.name}
							<button
								onClick={() => {
									doneButtonClicked(index);
								}}
							>
								Done
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
export default App;
