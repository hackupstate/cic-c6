import { useEffect, useState } from "react";
import "./App.css";
import Collapse from "./Collapse";

function App() {
	const [movies, setMovies] = useState(null);
	const [selectedMovie, setSelectedMovie] = useState();
	const [characters, setCharacters] = useState();

	useEffect(() => {
		const makeAPICall = async () => {
			const res = await fetch(`https://swapi.dev/api/films/`);
			const data = await res.json();
			console.log(data);

			// ❌ NOT ALLOWED
			// movies = data.results;

			setMovies(data.results);
		};
		makeAPICall();
	}, []);

	useEffect(() => {
		const makeAPICall = async () => {
			const selectedMovieData = movies.find(
				(movie) => movie.title === selectedMovie
			);

			const characterURLs = selectedMovieData.characters;
			let characterResults = [];

			for (const character of characterURLs) {
				const res = await fetch(character);
				const data = await res.json();
				characterResults.push(data);
			}

			setCharacters(characterResults);
		};

		if (selectedMovie) {
			setCharacters(null);
			makeAPICall();
		}
	}, [selectedMovie]);

	if (!movies) {
		return <div className="container text-center">Loading...</div>;
	}

	return (
		<div className="App container">
			<h1>Max's SWAPI UI</h1>
			<div className="row">
				<div className="col">
					<label htmlFor="movieSelect">Select a Movie:</label>
					<select
						className="form-control"
						value={selectedMovie}
						onChange={(evt) => {
							setSelectedMovie(evt.target.value);
						}}
						id="movieSelect"
					>
						<option></option>
						{movies.map((movie) => {
							return (
								<option key={movie.episode_id}>
									{movie.title}
								</option>
							);
						})}
					</select>
					{selectedMovie && (
						<Collapse
							movieSelected={selectedMovie}
							movieData={movies}
						/>
					)}
				</div>
				<div className="col">
					<label htmlFor="characterSelect">Select a character:</label>
					{characters && (
						<select id="characterSelect" className="form-control">
							<option></option>
							{characters.map((character) => {
								return (
									<option key={character.url}>
										{character.name}
									</option>
								);
							})}
						</select>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
