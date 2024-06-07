// #1 Log out linked so we know HTML is connected to JS
console.log("JS Linked");

// #2 Initialize a object with keys (our movie titles) and values as a nested
//object that has two keys (price & seats) with values of numbers and an empty array so we
//have a place to store the seats once we generate them.
const movies = {
	"The Godfather": {
		price: 8,
		seats: [],
		rows: 2,
	},
	"Citizen Kane": {
		price: 9,
		seats: [],
		row: 10,
	},
	"Planet of the Apes": {
		price: 10,
		seats: [],
		rows: 15,
	},
	Rugrats: {
		price: 11,
		seats: [],
		rows: 20,
	},
};

let numSelected = 0;

// #37 This function not only gets called when we select a movie from the dropdown, it also gets called
//when we click on a seat.
const updateHTML = (movieData) => {
	// #20 Start an empty string that we can eventually add HTML to
	let seatsHTML = "";

	// #21 Using Object.entries, get access to the rows of seats from #19 and also the index so
	//we can keep track of what row num we are on
	for (let [rowIndex, row] of Object.entries(movieData.seats)) {
		// #22 Add the opening div tag for our row to the string
		seatsHTML += "<div>";
		// #23 Loop over all the cols in the row from #21
		for (let [colIndex, col] of Object.entries(row)) {
			console.log(`Row: ${rowIndex} & Col: ${colIndex}`);

			// #24 Generate a shitload of HTML using a template literal. This not only generates
			//the span tag with the chair as the contents, it also looks at the col we are looping over
			//to see if it is occupied using ternary operator. If it is, we add the class named "occpied".
			//We also use the row & col index that our favorite Object.entries method gives us access to from
			//#21 & 23 to include as HTML attributes so when the chair is clicked on, we can use that data to
			//know each one. Finally we add an onclick event, so when the chair is clicked on, we can fire an
			//event listener.
			// #38 Now, based off the seat object we add a class of selected which makes the seat display blue.
			seatsHTML += `<span 
			class="material-symbols-outlined ${col.occupied ? "occupied" : ""} ${
				col.selected ? "selected" : ""
			}" 
			data-rowIndex="${rowIndex}"
			data-colIndex="${colIndex}"
			onclick="seatClicked(event)"
			> chair </span>`;
		}
		// #25 After we are done generating these 8 seats, add the closing div tag to match #22
		seatsHTML += "</div>";
	}

	//#26 We are done generating all the seats, so add in the screen
	seatsHTML += `<div id="screen">Screen</div>`;

	//#27 Take all the HTML that we have generated as a string and set it into the seats div.
	//This is the step that JS stops treating our HTML as a string, and actually makes the browser show it.
	document.getElementById("seats").innerHTML = seatsHTML;

	// #39 Based off of the number of selected seats generate a string that shows the number of selected seats
	//and the singular vs plurar
	let selectedText = `You have <span class="bold">${numSelected}</span> seat${
		numSelected === 1 ? "" : "s"
	} selected.`;
	// #40 Use the text frmo #39 to make it show up in the HTML
	document.getElementById("selectionStatus").innerHTML = selectedText;
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

// #17 User change the movie in the dropdown
movieDropdown.onchange = (event) => {
	//#18 Retrieve what movie they selected as a string
	const selectedMovie = event.target.value;
	// #19 Use string from #18 to get the corresponding movieData from the obj from #2
	const movieData = movies[selectedMovie];
	console.log(movieData.seats);

	updateHTML(movieData);
};

// #11 Loop over all of the values from the movies obj from #2
for (const movieData of Object.values(movies)) {
	//start of for loop for each movie
	// console.log(movieData);
	// #12 For each movie, start a loop, that will run 8 times
	for (let rowIterator = 0; rowIterator < movieData.rows; rowIterator++) {
		//start of for loop for each row
		// #13 Create an empty array so we have a place to store each col of seats
		let row = [];
		// #14 Write a for loop that also runs 8 times for each of the columns
		for (let colIterator = 0; colIterator < 8; colIterator++) {
			//start of for loop for each col
			// #15 Push an empty obj (which will eventually include the seat data) for all
			//8 cols AND all eight rows AND all four movies
			const randomNum = Math.random();
			let seatOccupied;
			if (randomNum < 0.5) {
				seatOccupied = true;
			} else {
				seatOccupied = false;
			}
			let seat = {};
			seat.occupied = seatOccupied;
			row.push(seat);

			// We can generate the seat obj unsing the code above, or simplify to one line
			//of code using the line below
			// row.push({ occupied: Math.random() < 0.5 });
		} // end of for loop for each col
		//#16 After generating the entire 8 cols of seats, push the row we generated into the
		//seats key of the movieData object which we have one of for each movie
		movieData.seats.push(row);
	} //end of for loop for each row
} //end of for loop for each movie

console.log(movies);

// #28 Wait until a seat is clicked on
const seatClicked = (event) => {
	console.log("Seat clicked");
	// #29 Retrieve the value from the select so we know what movie is active
	const selectedMovie = document.getElementById("movieSelection").value;
	console.log(selectedMovie);
	// #30 Retrieve the rowIndex & colIndex from #24 based off what the event target was
	// Ie what was clicked on
	const rowIndex = event.target.getAttribute("data-rowIndex");
	const colIndex = event.target.getAttribute("data-colIndex");

	// #31 Use the data from #29 & #30 to access our main object from #2 to get out the
	//specific seat we care about.
	const seat = movies[selectedMovie].seats[rowIndex][colIndex];

	// #32 Check to see if the seat data from #31 has an occupied key with a value of true
	if (seat.occupied) {
		//#33 If it does, alert the user they can't take this seat and ignore the rest of the if statement
		alert("Already taken (jackass)");
	} else if (seat.selected) {
		// #34 If the seat isn't occupied, check to see if it's already selected
		// #35 If it is, set selected to false, subtract one from the counter selected seats, and update the HTML
		seat.selected = false;
		numSelected = numSelected - 1;
		updateHTML(movies[selectedMovie]);
	} else {
		// #36 The seat isn't selected OR occupied, so we must assume they are trying to select the seat
		//Set it equal to selected, log out the seat so we can confirm the data change, update the counter, then update
		//the HTML based off the selected movie that gets sent in as an argument to the function's parameter
		seat.selected = true;
		console.log(seat);
		numSelected++;

		updateHTML(movies[selectedMovie]);
	}
};
