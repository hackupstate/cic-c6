const ForecastDay = ({ day }) => {
	return (
		<div class="col text-center">
			{day}
			<div class="forecastIcon">❄️</div>
			28°
		</div>
	);
};

export default ForecastDay;
