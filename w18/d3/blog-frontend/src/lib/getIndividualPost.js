const getIndividualPost = (timestamp) => {
	const postsAsString = window.localStorage.getItem("posts");
	const posts = JSON.parse(postsAsString);

	//R6: Confirm we can access the timestamp from R1
	console.log(timestamp);

	// R7: Search through all the posts in local storage using a loop, and
	//find the one where the timestamp in storage matches the timestamp from the
	//params path/URL in R1
	const matchingPost = posts.find(
		(individualPost) => individualPost.timestamp === parseInt(timestamp)
	);

	return matchingPost;
};

export default getIndividualPost;
