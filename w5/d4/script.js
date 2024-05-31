// #5 Console log out string "Connected" so our JS is confirm linked to our HTML
console.log("Connected");

//inputTextAndStuff //camel case
// input_text_goes_here //snake case
// input-text-goes-here //kebab case

// old way, don't do. bad!
// function addItem(event) {}

//#6 Create a function called addItem, but don't run it
// #12 Add button pressed from HTML onclick event, so run this function
const addItem = (event) => {
	// console.log("Button clicked");
	// #13 Go to the HTML Document, find an element with an id of inputtedText and store it in a variable called inputBpx
	const inputBox = document.getElementById("inputtedText");
	// #14 Use the variable from #13 to access the property of value from the HTML input and store it in value
	const value = inputBox.value;

	// #15 Go back to the HTML and access the element with an ID of listItems from #3
	const listUL = document.getElementById("listItems");
	// #16 Set the innerHTML from #15 to whatever it's current innerHTML is, plus a "<li>" plus the value from #14 plus another "</li>"
	listUL.innerHTML = listUL.innerHTML + "<li>" + value + "</li>";

	// MZM 5/16/24 - ALTERNATIVE #1
	// listUL.innerHTML += "<li>" + value + "</li>";

	// ALTERNATIVE #2
	// const newLI = document.createElement("li");
	// newLI.innerHTML = "<li>" + value + "</li>";
	// listUL.appendChild(newLI);

	// #17 Clear the inputBox from #13 by setting it's value to an empty string
	inputBox.value = "";
	// #18 Refocus the inputBox so the cursor display in it so we can add more items
	inputBox.focus();
};

// #7 Create a function called keyPressed, but don't run it yet.
// #9 Triggered by #8, this function runs because a key down event fired from the text input
// #19 User actually presses the enter button while in the input box
const keyPressed = (event) => {
	// #10 If the key from the event details is equal to Enter, run the add item function.
	//     It isn't (yet) so ignore
	// #20 The keypressed event fires with the details setting the key to enter
	if (event.key === "Enter") {
		// #21 Execute the addItem function by calling it's name and adding parenthesis after it
		addItem();
	}
};

//another way to to add an event listener in our JS only
// document.addEventListener("keydown", () => {
// 	console.log("key pressed");
// });
