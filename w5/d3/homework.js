//#1 create a variable that's mutable

//#2 change the value of that variable

//#3 Output a concatentation of strings

//#4 Make a list of data using three data types and store it in a immutable variable.

//#5 Write a single line and multi line comment below this one.

//#6 Create an object with that has at least two different data types for the values

//Use this object for #7-10 below
const school = {
	elementary: {
		address: "123 Main Street",
		teachers: [
			{ name: "Ariel", students: ["Sue", "Jim"], score: 29 },
			{ name: "Max", students: ["Tom", "Harry"], score: 99 },
			{ name: "Karin", score: 75 },
		],
	},
	middleTeacher: {
		name: "Kaitlyn",
		students: ["Stella", "Susan", "Michael"],
		averageScore: 97,
	},
};

//#7 Log out the second teachers name at the elementary school (🧅)
console.log(school.elementary.teachers[2].name);

//#8 Log out all the students names of the middle school teacher using a loop (🧅🔁)

//#9 Find the average score of all three teachers in the elementary school. (HARDEST!)

//#10 Make a function that converts fahrenheit to celsius. Make sure to call the function and log the output.
