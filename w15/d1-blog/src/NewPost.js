import { useNavigate } from "react-router-dom";

const NewPost = () => {
	const navigate = useNavigate();
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
		navigate("/");
	};
	return (
		<div className="container">
			<h1>New Post</h1>
			<hr />
			{/* <!-- #28 Create a form that links to create post --> */}
			{/* <!-- #33 Form is submitted with valid inputs --> */}
			<form onSubmit={createPost}>
				<div className="mb-3">
					<label htmlFor="titleInput" className="form-label">
						Title
					</label>
					{/* <!-- #29 Create inputs for all the data fields we need to collect about our new */}
					{/* post and store IDs on them so we can access their values in */}
					{/* our JS --> */}
					<input
						type="text"
						className="form-control"
						id="titleInput"
						placeholder="Your smart title goes here"
					/>
					{/* <!-- End of title input div --> */}
				</div>
				<div className="mb-3">
					<label htmlFor="content" className="form-label">
						Content
					</label>
					<textarea
						className="form-control"
						id="content"
						rows="3"
					></textarea>
					{/* <!-- End of div for content text area --> */}
				</div>
				<div className="mb-3">
					<label htmlFor="author" className="form-label">
						Author
					</label>
					<input
						type="text"
						className="form-control"
						id="author"
						placeholder="A brillant writer's name goes here"
					/>
					{/* <!-- End of title input div --> */}
				</div>
				{/* <!-- #30 We add a button with a type of submit, that triggers the onsubmit function */}
				{/* from #7 --> */}
				<button type="submit" className="btn btn-success">
					Create Post
				</button>
			</form>
		</div>
	);
};

export default NewPost;
