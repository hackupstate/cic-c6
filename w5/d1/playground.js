console.log("Hello World! Max is here.");
console.log(7 + 5);

const num1 = 4;
const num2 = "is a number. This isn't 7abc";
const sum = num1 + num2;

console.log(sum);

let name = "Max";
// this concatenates strings together
console.log("Hello World! " + name + " is here!");
console.log("Some string");

/* this comment is across
multiple lines */

const firstName = "Max";
const lastName = "Matthews";
console.log("Name length is:" + (firstName.length + lastName.length));
console.log("Name length is:");
console.log(firstName.length + lastName.length);

const car = { make: "Toyota", model: "RAV4" };
const car2 = { make: "Honda", model: "CRV" };
console.log(car.make, car.model);
console.log(car2.model.length);
console.log("RAV4".length);

console.log(car["make"]);

const whatIWant = "model";
console.log(car2[whatIWant]);

let num3 = 6;

num3 = 101;
if (num3 < 10) {
	console.log("Oh good a small number");
} else if (num3 >= 10 && num3 < 100) {
	console.log("Eek a larger number");
} else {
	console.log("Huge number.");
}

const fruits = ["apple", "banana", "orange"];
console.log(fruits[2]);
console.log(fruits.length);

const cars = [
	{ make: "Toyota", model: "RAV4" },
	{ make: "Honda", model: "CRV" },
];

console.log(cars[1].make);

for (let i = 1; i <= 5; i++) {
	console.log("Num times run: ", i);
}

for (const fruit of fruits) {
	console.log("I really like " + fruit + "s");
}
