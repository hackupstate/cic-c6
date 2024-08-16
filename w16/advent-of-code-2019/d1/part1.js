// import fs from "fs";
const fs = require("fs");
const fileContents = fs.readFileSync("./input.txt", "utf-8");
const allLines = fileContents.split(/\r?\n/);

console.log(allLines);
let sum = 0;
for (const line of allLines) {
	const dividedByThree = line / 3;
	const roundedDown = Math.floor(dividedByThree);
	const finalAnswer = roundedDown - 2;
	sum += finalAnswer;
}

console.log(sum);

// fs.writeFileSync("./output.txt", "Some example in the file");
