import logo from "./logo.svg";
import "./App.css";
import ForecastDay from "./ForecastDay";
import { useState, useEffect } from "react";

function App() {
	const [forecastData, setForecastData] = useState(null);

	useEffect(() => {
		const makeAPICall = async () => {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=43.0481&lon=-76.1474&appid=d59eed60405472090f0e27860f6df5ad&units=imperial`
			);
			const data = await res.json();
			setForecastData(data);
			console.log(data);
		};

		makeAPICall();
	}, []);

	if (!forecastData) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="App">
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
						Wed 7:30pm
						<br />
						Cloudy
					</div>

					{/* <!-- End of row #1 --> */}
				</div>
				<hr />
				<div className="row">
					<ForecastDay day="Thur" />
					<ForecastDay day="Fri" />
					<ForecastDay day="Sat" />
					<ForecastDay day="Sun" />
					<ForecastDay day="Mon" />
				</div>
			</div>
		</div>
	);
}

export default App;
