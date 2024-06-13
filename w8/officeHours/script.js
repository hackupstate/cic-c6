// let animals = ["dog", "cat", "elephant"];

// console.log(animals[1]);

// let myData = `"animal": "cat"`;
//
// try {
// 	const parsedData = JSON.parse(myData);

// 	output.innerHTML = "My animal is a " + parsedData.animal;
// } catch (error) {
// 	alert("We don't know your animal");
// }

const add = (num1, num2) => {
	return num1 + num2;
};

function add(num1, num2) {
	return num1 + num2;
}

// console.log(num3);

const output = document.getElementById("output");
console.log(output);
output.innerHTML = add(2, 3);
console.log(add(2, 3));
