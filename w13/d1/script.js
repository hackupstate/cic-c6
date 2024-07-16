// fetch(`https://owen-wilson-wow-api.onrender.com/wows/random`)
// 	.then((res) => {
// 		return res.json();
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	});

const makeAPICall = async () => {
	const res = await fetch(
		`https://owen-wilson-wow-api.onrender.com/wows/random`
	);
	const data = await res.json();

	console.log(data);
	const movieTitle = data[0].movie;
	const poster = data[0].poster;
	const videoURL = data[0].video["1080p"];
	console.log(movieTitle);

	const movieInfo = document.getElementById("movieInfo");

	console.log(Object.keys(movieInfo));

	movieInfo.innerHTML = `
	<h1>${movieTitle}</h1>
	<img src="${poster}" style="height: 100px;"/>
	<video controls width="320" height="240">
		<source src="${videoURL}" type="video/mp4">
	</video>
	`;
};

makeAPICall();

// const anotherButton = document.getElementById("anotherButton");
// anotherButton.onclick = makeAPICall;
