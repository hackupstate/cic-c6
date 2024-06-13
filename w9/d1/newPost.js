console.log("JS Linked");

// #10 This function is triggered when the form is submitted
const createPost = (event) => {
	// #11 Prevent the default action of the broswer (refreshing the page and clearing the form)
	// because we don't want the data sent to the server, we want our JS to control the form
	//submission instead
	event.preventDefault();
	// #12 We go to the event that was triggered from #9 => #7 => #10 and get the target (ie the form)
	const form = event.target;

	const oldPostsAsString = window.localStorage.getItem("posts");
	let posts;

	if (!oldPostsAsString) {
		posts = [];
	} else {
		posts = JSON.parse(oldPostsAsString);
	}

	//#13 Create a post object to hold the four keys of the details we need about a post.
	//Access the form's elements from #12, using the IDs from the HTML, to get inputs and subsquently
	//their values. Also use Date.now() to store the time the post was created.
	const post = {
		title: form.elements.titleInput.value,
		content: form.elements.content.value,
		author: form.elements.author.value,
		timestamp: Date.now(),
	};

	posts.push(post);

	// #14 Local storage can not store anything other than strings, so use JSON to conver the post
	//object from #13 into a string that we can store.
	const postsAsString = JSON.stringify(posts);

	// #15 Store the string from #14 into localStorage using the key of "post"
	window.localStorage.setItem("posts", postsAsString);
	// #16 Redirect the user to the homepage
	window.location = "/";
};
