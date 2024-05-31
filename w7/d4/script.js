// #4 Log linked so we know our script tag is working
console.log("JS Linked");

// #5 Store the weatherData in an object that has keys for each of our locations
const weatherData = {
	// #16 take the object associated with Manlius and store in #15 matchingData
	Manlius: { temperature: 65, precipitation: 55, wind: "10 mph" },
	Syracuse: { temperature: 68, precipitation: 95, wind: "5 mph" },
	"San Francisco": { temperature: 72, precipitation: 5, wind: "15 mph" },
};

// #6 Log out the precip in Syracuse so we have practice accessing nested keys/values
console.log(weatherData.Syracuse.precipitation);

// #7 Make a new variable and store the string temp in it
const dataToGet = "temperature";

// #8 Practice using a dynmaic key and a key with a space in it to get the data we want
console.log(weatherData["San Francisco"][dataToGet]);

// #9 Reach into the HTML using DOM model and store the select dropdown in a JS variab;e
const locationSelect = document.getElementById("location");
// #10 Log #9 so we know it's working
console.log(locationSelect);
// #11 Set the CSS text-align property for practice using the DOM
locationSelect.style.textAlign = "right";

// #12 Create a function called update data, but don't run it yet
// #21 Run the function as called from #20
const updateData = (selectedLocation) => {
	// #15 Retrieve the selected city using the argument sent in from #14
	const matchingData = weatherData[selectedLocation];

	// #16 Update all three HTML elements using the data from #15/16
	document.getElementById("currentTemp").innerHTML = matchingData.temperature;
	document.getElementById("precipitation").innerHTML =
		matchingData.precipitation + "%";
	document.getElementById("wind").innerHTML = matchingData.wind;

	// const now = new Date();
	// console.log(now);
	document.getElementById("currentTime").innerHTML = getFormattedDate();

	const conditions = [
		"Cloudy",
		"Sunny",
		"Raining",
		"Foggy",
		"Hazy",
		"Hailing",
		"Tornado",
	];
	document.getElementById("conditions").innerHTML =
		getRandomElement(conditions);
};

const getRandomElement = (arr) => {
	if (arr.length === 0) {
		return undefined; // or throw an error, or handle it as needed
	}
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
};

// #13 Use #9 to attach an event listener when the select changes
// #17 User changes the dropdown, so this function runs
locationSelect.addEventListener("change", (event) => {
	console.log("Location changed");
	// #18 Get the selected value from the event's target
	const selectedLocation = event.target.value;
	// #19 Log it to make sure it's what we expect
	console.log(selectedLocation);

	// #20 Call the update function using the argument from #18
	updateData(selectedLocation);
});

const getFormattedDate = () => {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const now = new Date();

	const dayOfWeek = daysOfWeek[now.getDay()];
	let hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const strMinutes = minutes < 10 ? "0" + minutes : minutes;
	const strSeconds = seconds < 10 ? "0" + seconds : seconds;

	const formattedTime2 = hours + ":" + strMinutes + " " + ampm;
	const formattedTime = `${hours}:${strMinutes} ${ampm}`;
	console.log(formattedTime === formattedTime2);
	// const formattedTime = `${hours}:${strMinutes} ${ampm}`;
	return `${dayOfWeek}, ${formattedTime}`;
};

// #14 Call the function from #12 sending the first location (Manlius) into the function's parameter's
//as an argument
updateData("Manlius");
