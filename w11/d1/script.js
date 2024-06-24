// console.log("Hello");
// setTimeout(() => {
// 	console.log("How are you doing today?");
// }, 5000);
// console.log("Goodbye");

const bake = (item, time) => {
	console.log("Starting to cook: " + item);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Done cooking: " + item);
			resolve({ time: time });
		}, time);
	});
};

const cookingTurkey = bake("Turkey", 3000);
console.log(cookingTurkey);

cookingTurkey.then((resolvedData) => {
	console.log(resolvedData.time);
	const cookingPie = bake("Pie", 2000);
	console.log(
		"It took " + resolvedData.time + "milliseconds to cook the turkey"
	);
	cookingPie.then((pieResults) => {
		console.log("It took " + pieResults.time + "milliseconds to cook");

		const mashPotatosWarming = bake("🥔", 1000);
		mashPotatosWarming.then(() => {
			console.log("All done baking");
		});
	});
});

const cook = async () => {
	await cookingTurkey;
	const cookingPie = await bake("Pie", 2000);
	console.log("It took " + cookingPie.time + " to cook the pie");
	const mashPotatosWarming = await bake("🥔", 1000);
	console.log("It took " + mashPotatosWarming.time + " to cook the potato");

	await mashPotatosWarming;
	console.log("All done baking");
};

cook();
