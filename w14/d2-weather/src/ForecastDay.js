// #11 Tell ForecastDay component it is getting a prop
const ForecastDay = ({ daysData }) => {
	let forecastIcon = "";
	if (daysData.precip === "Clear") {
		forecastIcon = "☀️";
	} else if (daysData.precip === "Rain") {
		forecastIcon = "🌧️";
	} else {
		forecastIcon = "🌈";
	}

	return (
		<div className="col text-center">
			{/* #12 Make the value of the prop day show up in our HTML */}
			{daysData.dayName}
			<div className="forecastIcon">{forecastIcon}</div>
			{Math.round(daysData.temp)}°
		</div>
	);
};

export default ForecastDay;
