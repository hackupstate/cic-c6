let animals = ["dog", "cat", "elephant"];

console.log(animals[1]);

let animalsJSON = `["dog", "cat", "elephant"]`;
const animalsArr = JSON.parse(animalsJSON);
console.log(animalsArr);
console.log(animalsArr[1]);
