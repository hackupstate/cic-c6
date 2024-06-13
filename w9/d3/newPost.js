console.log("JS Linked");

// #32 This function is triggered when the form is submitted
const createPost = (event) => {
	// #34 Function now runs because form is submitted
	// #35 Prevent the default action of the broswer (refreshing the page and clearing the form)
	// because we don't want the data sent to the server, we want our JS to control the form
	//submission instead
	event.preventDefault();
	// #36 We go to the event that was triggered from #9 => #7 => #10 and get the target (ie the form)
	const form = event.target;

	// #37 Retrieve existing posts from localStorage
	const oldPostsAsString = window.localStorage.getItem("posts");
	// #38 Create a let variable so we can access it outside the if statement block scope
	let posts;

	// #39 Check if there are existing posts in storage
	if (!oldPostsAsString) {
		// #40 There aren't so make posts an empty array
		posts = [];
	} else {
		posts = JSON.parse(oldPostsAsString);
	}

	//#41 Create a post object to hold the four keys of the details we need about a post.
	//Access the form's elements from #12, using the IDs from the HTML, to get inputs and subsquently
	//their values. Also use Date.now() to store the time the post was created.
	const post = {
		title: form.elements.titleInput.value,
		content: form.elements.content.value,
		author: form.elements.author.value,
		timestamp: Date.now(),
	};

	// #42 Add the object from #41 to the end of the array from #40
	posts.push(post);

	// #43 Local storage can not store anything other than strings, so use JSON to convert the post
	//array from #42 into a string that we can store.
	const postsAsString = JSON.stringify(posts);

	// #44 Store the string from #43 into localStorage using the key of "post"
	window.localStorage.setItem("posts", postsAsString);
	// #45 Redirect the user to the homepage
	window.location = "/";
};
