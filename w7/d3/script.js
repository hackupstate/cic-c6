// #4 This file runs from #3
// #5 Make new variable called buttonClicked that stores a function BUT DOES NOT RUN YET
const buttonClicked = (event) => {
	// #10,15 Log out button clicked so we know the function is linked to the button using an event
	console.log("Button clicked");
	// #11,16 Reach back into the HTML and get the element with ID of screen and store it in
	// JS variable called "screen"
	const screen = document.getElementById("screen");

	// console.log(event);

	//#12,17 Access the event's (onclick) target (button we clicked on), and retrieve the innerHTML of it.
	const numberClicked = event.target.innerHTML;

	//#13,18 Look at the contents of the screen.
	if (screen.innerHTML === "0" || screen.innerHTML === "ERROR") {
		// #14 If it is 0 (it is on first load), override the contents and set it equal to the number we
		//clicked on from #12
		screen.innerHTML = numberClicked;
	} else {
		// #19 Screen has something in it other than 0 so take whatever is in it and add to it the number
		//that was clicked on.
		screen.innerHTML = screen.innerHTML + numberClicked;
	}
};

const clearButton = () => {
	const car = { make: "Toyota", model: "Rav4" };
	car.model = "Prius";
	console.log(car.model); //Prius

	const screen = document.getElementById("screen");
	screen.innerHTML = "0";
};

const equalClicked = () => {
	console.log("equal clicked");
	const screen = document.getElementById("screen");

	console.log(screen.innerHTML);

	try {
		const result = eval(screen.innerHTML);
		console.log(result);
		screen.innerHTML = result;
	} catch (error) {
		screen.innerHTML = "ERROR";
	}
};

// #6 Make a new variables called allButtons and store in it, all of the HTML
//elements that have a tag name of <button> that returns an array
const allButtons = document.getElementsByTagName("button");

// #7 Loop through each item of the allButtons array so that we can get access to
//each individual button
for (const individualButton of allButtons) {
	// #8 For each individual button, access the onclick property from the DOM and set
	//it equal to the function we defined in #5
	if (individualButton.innerHTML === "=") {
		individualButton.onclick = equalClicked;
	} else if (individualButton.innerHTML === "c") {
		individualButton.onclick = clearButton;
	} else {
		individualButton.onclick = buttonClicked;
	}
}
// #9 All buttons have been looped over and assigned an onclick, so we reach the end of the
//file and are done.

//Adhoc examples. Not related to the calculator
// const img = document.getElementById("myImage");
// console.log(img);
// img.style = "width: 100%;";
// // img.src =
// // 	"https://images.unsplash.com/photo-1714733708350-494d0d28dfa0?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// console.log(img.src);
// img.className = "border";
