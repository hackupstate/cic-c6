import logo from "./logo.svg";
import "./App.css";
// #1 Import two hooks (state and effect) from react so JS knows where they come from
import { useEffect, useState } from "react";

// #2 Make a component called App
function App() {
	// #3 Set up an empty variable in state that will eventually hold the API results
	// #11 State is retained across re-renders
	const [movieData, setMovieData] = useState(null);

	//#4 Define a function called makeAPI call, but don't run it yet
	//#7 makeAPICall function is running in background (because it's async) from #5
	//#12 Function has not been called, so ignore this
	const makeAPICall = async () => {
		if (movieData) {
			setMovieData(null);
		}
		// #8 Fetch the data
		const res = await fetch(
			`https://owen-wilson-wow-api.onrender.com/wows/random`
		);
		// #9 Parse the JSON
		const data = await res.json();

		//#10 Extract the data from the array from #9 AND set it into state from #3.
		//Setting state triggers re-render
		setMovieData(data[0]);

		console.log(data);
	};

	//#5 useEffect runs either when the variables in the second argument are updated
	//OR (as in this case) when the page first loads IF the depedency array is empty
	//#13 This is the second render of this component so the useEffect doesn't run because
	//the array is empty
	useEffect(() => {
		makeAPICall();
	}, []);

	// #6 Because makeAPICall is async and running in the background, it hasn't
	//set the state yet, so return a loading message in an h1.
	//#14 Ignore this loading message because there *IS* now movie data
	if (!movieData) {
		return <h1>Loading...</h1>;
	}

	//#15 Return this div instead
	return (
		<div className="App">
			{/* #16 Access the movie title from state and display it in an h1, and img, and in a video */}
			<h1>{movieData.movie}</h1>
			<img src={movieData.poster} style={{ height: 240 }} />
			<video controls width="320" height="240">
				<source src={movieData.video["1080p"]} type="video/mp4" />
			</video>
			<br />

			<button onClick={makeAPICall}>Wow Me!</button>
		</div>
	);
}

export default App;
