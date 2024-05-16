// #1 Create a new variable called cToF that stores a function.
// #5 store the argument sent into the paramater of inputCelsiusTemp (#20)
const cToF = (inputCelsiusTemp) => {
	// #6 Multiply inputCelsiusTemp (#20) by 9/5, and store it in a new const called result1
	const result1 = inputCelsiusTemp * (9 / 5);
	// #7 Add 32 to result 1 and store it in a new variable called final result
	const finalResult = result1 + 32;
	//#8 Return final result to where the function was called
	return finalResult;
};

// #2 Create an array (list) of tempatures that are all numbers
const temps = [20, 100, 0, 50, 30, 10];

// #3 For each number in the temps array, store it in a variable called celsius temp, then run the code in the { }
// #11... Rerun the loop from #4-#10 to convert all the other numbers in the array
for (const celsiusTemp of temps) {
	// #4 Use celsiusTemp (the first item in our array) to call or execute the function from #1
	// #9 Store returned value from #8 into a new variable called convertedTemp
	const convertedTemp = cToF(celsiusTemp);
	// #10 Logt out the celsius input temp from the for loop, concat it with a string, and then print out the result of the function from #9
	console.log(
		celsiusTemp + " celsius is this temp in faren: " + convertedTemp
	);
}

// NOTE: Other ways to write the exact same loop with the same output
// for (let i = 0; i < temps.length; i++) {
// 	const celsiusTemp = temps[i];
// 	const convertedTemp = cToF(celsiusTemp);
// 	console.log(
// 		celsiusTemp + " celsius is this temp in faren: " + convertedTemp
// 	);
// }

// let i = 0;
// while (i < temps.length) {
// 	const celsiusTemp = temps[i];
// 	const convertedTemp = cToF(celsiusTemp);
// 	console.log(
// 		celsiusTemp + " celsius is this temp in faren: " + convertedTemp
// 	);
// 	i = i + 1;
// }

// cToF(20);
// cToF(100);
// cToF(0);
