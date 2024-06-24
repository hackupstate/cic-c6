// #5 Create empty array to hold answers
let pollAnswers = [];

// #7 This function runs based off #6
const addPollAnswer = (event) => {
	// #8 We push an object with two keys (text and count) into an array as a placeholder for what gets entered
	pollAnswers.push({ text: "", count: 0 });
	// #9 Call generate HTML function to update the HTML on the page based off the array from #5
	generateHTML();
};

const generateHTML = () => {
	// #10 Started out generated HTML as empty
	let generatedHTML = "";
	// #11 Loop over every item in the poll answers and get us access to the object and the index in the array
	for (const [index, answer] of Object.entries(pollAnswers)) {
		// #12 Use template literal to make an input for each answer, store the index in data-index so when
		//it is updated we can access which one is getting updated. Add onchange that runs when the answer is modified
		generatedHTML += `<input 
		type="text" 
		data-index="${index}" 
		placeholder="Answer #${parseInt(index) + 1}" 
		value="${answer.text}"
		onchange="answerUpdated(event)"
		/>`;
	}

	// #13 Update pollAnswers div with the HTML we generated from #12
	document.getElementById("pollAnswers").innerHTML = generatedHTML;
};

// #14 When answer text is typed in
const answerUpdated = (event) => {
	//#15 Retrieve the data-index from the input that's being typed in from #12
	const index = event.target.getAttribute("data-index");
	//#16 Update the poll answer's text in array from #5 so our JS data is in sync with the interface
	pollAnswers[index].text = event.target.value;
};

const empty = () => {
	pollAnswers = [];
	document.getElementById("question").value = "";
	generateHTML();
};

// #17 Wait for the start quiz button to be pressed
// #27 Rerun this function based off calling it in #26
const startQuiz = () => {
	//#18 Regenerate the HTML that's displayed now in a non-editable format
	let generatedHTML = "";

	//#19 Grab the question element
	const questionElement = document.getElementById("question");

	for (let answer of pollAnswers) {
		if (!answer.text) {
			return alert("Empty answer, can't start poll");
		}
	}

	//#20 Make a h5 that has a value of either the element's value (if it was a input box) or the innerHTML
	//if it was already turned into an h5
	// #28 Everything is the same in this function, except now the questionElement is an h5, so grab the innerHTML
	// instead of the value
	generatedHTML += `<h5 id="question">${
		questionElement.value || questionElement.innerHTML
	}</h5><ul>`;

	//#21 Generate out a li for each answer that has a button that display's the count
	// #29 The count is now incremented by one, so show that number inside the button instead
	for (const [index, answer] of Object.entries(pollAnswers)) {
		generatedHTML += `<li>${answer.text}<button 
		onclick="vote(event)" 
		data-index="${index}">${answer.count}</button>
	</li>`;
	}
	generatedHTML += "</ul>";

	// #22 Update the HTML now with buttons and not editable
	document.getElementById("main").innerHTML = generatedHTML;
};

// #23 Wait for a button to be clicked on
const vote = (event) => {
	// #24 Figure out the index of the button
	const index = event.target.getAttribute("data-index");
	// #25 Add one to the count of the answer from the array in #5 that we added to in #8
	pollAnswers[index].count += 1;
	// #26 Re-run start quiz to update the HTML based off the array we updated in the line above
	startQuiz();
};

let count = 20;
while (count < 10) {
	console.log(count);
	count++;
}
