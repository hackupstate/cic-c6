// import fs from "fs";
const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

// const calculateFuel = (weight)=>{

// }

console.log(allLines);
let sum = 0;
for (const line of allLines) {
	let inputWeight = line;
	do {
		const dividedByThree = inputWeight / 3;
		const roundedDown = Math.floor(dividedByThree);
		const fuelRequired = roundedDown - 2;
		if (fuelRequired > 0) {
			sum += fuelRequired;
		}
		inputWeight = fuelRequired;
		console.log(inputWeight);
	} while (inputWeight >= 0);
}

console.log(sum);
