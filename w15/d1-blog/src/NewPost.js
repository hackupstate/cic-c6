import { useNavigate } from "react-router-dom";

const NewPost = () => {
	const navigate = useNavigate();
	const createPost = (event) => {
		// #19 Function now runs because form is submitted
		// #20 Prevent the default action of the broswer (refreshing the page and clearing the form)
		// because we don't want the data sent to the server, we want our JS to control the form
		//submission instead
		event.preventDefault();
		// #21 We go to the event that was triggered
		const form = event.target;

		// #22 Retrieve existing posts from localStorage
		const oldPostsAsString = window.localStorage.getItem("posts");
		// #23 Create a let variable so we can access it outside the if statement block scope
		let posts;

		// #24 Check if there are existing posts in storage
		if (!oldPostsAsString) {
			// #25 There aren't so make posts an empty array
			posts = [];
		} else {
			posts = JSON.parse(oldPostsAsString);
		}

		//#26 Create a post object to hold the four keys of the details we need about a post.
		//Access the form's elements, using the IDs from the HTML, to get inputs and subsquently
		//their values. Also use Date.now() to store the time the post was created.
		const post = {
			title: form.elements.titleInput.value,
			content: form.elements.content.value,
			author: form.elements.author.value,
			timestamp: Date.now(),
		};

		// #27 Add the object from #26 to the array from #24
		posts.push(post);

		// #28 Local storage can not store anything other than strings, so use JSON to convert the post
		//array from #27 into a string that we can store.
		const postsAsString = JSON.stringify(posts);

		// #29 Store the string from #28 into localStorage using the key of "post"
		window.localStorage.setItem("posts", postsAsString);
		// #30 Take us back to the home screen using navigate that came from the useNavigate hook at the
		//top of the function.
		navigate("/");
	};
	//#17 Show form
	return (
		<div className="container">
			<h1>New Post</h1>
			<hr />
			{/* <!-- #28 Create a form that links to create post --> */}
			{/* <!-- #33 Form is submitted with valid inputs --> */}
			{/* #18 User submits form */}
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
