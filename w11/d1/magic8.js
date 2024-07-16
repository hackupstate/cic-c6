const responses = [
	"It is certain",
	"Reply hazy, try again",
	"Don’t count on it",
	"It is decidedly so",
	"Ask again later",
	"My reply is no",
	"Without a doubt",
	"Better not tell you now",
	"My sources say no",
	"Yes definitely",
	"Cannot predict now",
	"Outlook not so good",
	"You may rely on it",
	"Concentrate and ask again",
	"Very doubtful",
	"As I see it, yes",
	"Most likely",
	"Outlook good",
	"Yes",
	"Signs point to yes",
];

console.log("Shaking the ball...");

const seeingTheFuture = new Promise((resolve, reject) => {
	console.log("Seeing the future...");
	setTimeout(() => {
		const randomResponse =
			responses[Math.floor(Math.random() * responses.length)];
		resolve(randomResponse);
		// reject("Shit hit the fan");
	}, 5000);
});

seeingTheFuture
	.then((selectedResponse) => {
		console.log(selectedResponse);
	})
	.catch((rejection) => {
		console.error(rejection);
	});

// const shakeTheBall = async () => {
// 	try {
// 		console.log(await seeingTheFuture);
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
// shakeTheBall();
