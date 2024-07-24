import logo from "./logo.svg";
import "./App.css";
// #1 Our first component outside of App, called ForecastDay
import ForecastDay from "./ForecastDay";
// #2 Import useState and useEffect, both hooks from react
import { useState, useEffect } from "react";

function App() {
	//#3 Set up a new state variable that will hold our forecast data
	const [forecastData, setForecastData] = useState(null);
	const [locationInput, setLocationInput] = useState("");

	const makeAPICall = async (lat = "43.0481", lon = "-76.1474") => {
		//#6 Running in the background, we now make the API call
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d59eed60405472090f0e27860f6df5ad&units=imperial`
		);
		const data = await res.json();
		//#7 After parsing the data, we set it into state
		let extractedData = [];
		for (let i = 0; i < data.list.length; i += 8) {
			const daysForecast = data.list[i];
			// console.log(daysForecast);
			const date = new Date(daysForecast.dt_txt);
			const dayName = date.toLocaleDateString("en-US", {
				weekday: "long",
			});
			console.log(dayName);

			extractedData.push({
				temp: daysForecast.main.temp,
				dayName, //dayName: dayName
				precip: daysForecast.weather[0].main,
			});
		}
		console.log(extractedData);

		setForecastData(extractedData);
		// console.log(data);
	};

	//#4 useEffect with an empty array as the second parameter tells React
	//to only run this API call when the component first loads. If we leave this
	//out, and make the API call instead directly, the API call will run every time
	//the component re-renders (in otherwords, every time state is updated)
	useEffect(() => {
		makeAPICall();
	}, []);

	const getWeather = async (event) => {
		event.preventDefault();
		// console.log(event.target.elements.locationInput.value);
		if (!locationInput.includes("NY")) {
		// 	return alert("NY Weather Only!");
		// }
		const res = await fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${locationInput},US&limit=1&appid=d59eed60405472090f0e27860f6df5ad`
		);
		const data = await res.json();
		const { lat, lon } = data[0];
		console.log(data);
		makeAPICall(lat, lon);
	};

	//#5 Check to see if forecastData is in state yet, it's not so show a loading message
	//#8 This forecastData in state is no longer empty, so skip this return
	if (!forecastData) {
		return <h1>Loading...</h1>;
	}

	//#9 Show all this HTML instead
	return (
		<div className="App">
			<form className="container" onSubmit={getWeather}>
				<label htmlFor="locationInput">Enter Location:</label>
				<input
					type="text"
					id="locationInput"
					className="form-control"
					value={locationInput}
					onChange={(event) => {
						setLocationInput(event.target.value);
					}}
					required
				/>
				<button className="btn btn-primary" type="submit">
					Get Weather
				</button>
			</form>
			<div className="container" id="container">
				<div className="row">
					<div className="col-2 text-center" id="weatherIcon">
						☁️
					</div>
					<div className="col-2">
						<div id="currentTemp">48</div>
						<span className="bold">℉</span> | ℃
						{/* <!-- End of current temp div --> */}
					</div>
					<div className="col-2" id="details">
						Precipitation: 88%
						<br />
						Humdity: 76%
						<br />
						Wind: 10mph
					</div>
					<div className="col-6 text-end">
						<span className="bold">Manlius, NY 13104</span>
						<br />
						{new Date().toLocaleDateString("en-US", {
							weekday: "short",
						})}{" "}
						{new Date().toLocaleTimeString("en-US")}
						<br />
						Cloudy
					</div>

					{/* <!-- End of row #1 --> */}
				</div>
				<hr />
				<div className="row">
					{/* #10 Render 5 forecast dat components that were imported from #1 and pass them a prop
					called "day" with the value we want to show */}
					{forecastData.map((daysData) => {
						return (
							<ForecastDay
								key={daysData.dayName}
								daysData={daysData}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
