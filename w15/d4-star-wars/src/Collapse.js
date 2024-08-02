import { useState } from "react";

const Collapse = ({ movieSelected, movieData }) => {
	// console.log(movieSelected, movieData);
	const [showOpeningCrawl, setShowOpeningCrawl] = useState(false);

	const selectedMovieData = movieData.find(
		(movie) => movie.title === movieSelected
	);

	console.log(selectedMovieData);

	return (
		<div
			style={{
				border: "1px solid gray",
				marginTop: 15,
				padding: 20,
				borderRadius: 10,
				cursor: "pointer",
			}}
		>
			<h4
				// onMouseEnter={() => {
				// 	setShowOpeningCrawl(true);
				// }}
				// onMouseLeave={() => {
				// 	setShowOpeningCrawl(false);
				// }}
				onClick={() => {
					setShowOpeningCrawl(!showOpeningCrawl);
				}}
			>
				{showOpeningCrawl ? "Hide" : "Show"} Opening Crawl{" "}
				{showOpeningCrawl ? "⬆️" : "⬇️"}
			</h4>
			{showOpeningCrawl ? <p>{selectedMovieData.opening_crawl}</p> : null}
		</div>
	);
};

export default Collapse;
