// #1 Log out linked so we know HTML is connected to JS
console.log("JS Linked");

// #2 Initialize a object with keys (our movie titles) and values as a nested
//object that has two keys (price & seats) with values of numbers and an empty array so we
//have a place to store the seats once we generate them.
const movies = {
	"The Godfather": {
		price: 8,
		seats: [],
	},
	"Citizen Kane": {
		price: 9,
		seats: [],
	},
	"Planet of the Apes": {
		price: 10,
		seats: [],
	},
	Rugrats: {
		price: 11,
		seats: [],
	},
};

//#3 Get the movieSelection <select> from the HTML using the DOM
const movieDropdown = document.getElementById("movieSelection");
// #4 Log our select to make sure we got it
// console.log(movieDropdown);
// #5 Log out the key value pairs using Object.entries function (built into JS) so we
//can see the structure of the data before we loop over it.
// console.log(Object.entries(movies));

// for (const data of Object.values(movies)) {
// 	console.log(data);
// }

// #6 Create new variable called options that starts as a string with an empty option element
let options = "<option></option>";

//#7 Loop over each movie in the movies object and using the Object.entries function, get access
//to both the key of the object (movieTitle) and also the movieData (another object that has both
// price and seats).
for (const [movieTitle, movieData] of Object.entries(movies)) {
	//#8 Log out both the movieTitle and the price to make sure our loop is running over each
	//movie and we can confirm we have access to the data we care about
	// console.log(movieTitle, movieData.price);

	//The line below is a way to avoid template literals and use string concatentation instead
	// options +=
	// 	"<option value='" +
	// 	movieTitle +
	// 	"'>" +
	// 	movieTitle +
	// 	" ($" +
	// 	movieData.price +
	// 	")</option>";

	//#9 Add onto the current value of options (so the loop doesn't overwrite previous runs)
	//Using a template literal, create a string with a value of the movie title as an HTML attribute
	//so we can know the movie that gets selected without the price information.
	//In the innerHTML of the option element, use the movie title and the price (displayed in parenthesis)
	//to display to the user.
	options += `<option value="${movieTitle}">${movieTitle} ($${movieData.price})</option>`;
} //Run #8 & #9 for each one of the movies thanks to the for loop from #7

// #10 Using all the options we generated from #9, set that into the <select> tag from #3
movieDropdown.innerHTML = options;

movieDropdown.onchange = (event) => {
	const selectedMovie = event.target.value;
	console.log(selectedMovie);
	console.log(movies[selectedMovie]);
};

// #11 Loop over all of the values from the movies obj from #2
for (const movieData of Object.values(movies)) {
	//start of for loop for each movie
	// console.log(movieData);
	// #12 For each movie, start a loop, that will run 8 times
	for (let rowIterator = 0; rowIterator < 8; rowIterator++) {
		//start of for loop for each row
		// #13 Create an empty array so we have a place to store each col of seats
		let row = [];
		// #14 Write a for loop that also runs 8 times for each of the columns
		for (let colIterator = 0; colIterator < 8; colIterator++) {
			//start of for loop for each col
			// #15 Push an empty obj (which will eventually include the seat data) for all
			//8 cols AND all eight rows AND all four movies
			row.push({});
		} // end of for loop for each col
		//#16 After generating the entire 8 cols of seats, push the row we generated into the
		//seats key of the movieData object which we have one of for each movie
		movieData.seats.push(row);
	} //end of for loop for each row
} //end of for loop for each movie
