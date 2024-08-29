import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getIndividualPost from "./lib/getIndividualPost";

const EditPost = () => {
	const navigate = useNavigate();
	const { timestamp } = useParams();

	const [post, setPost] = useState(null);

	useEffect(() => {
		console.log("checking to see if signed in");
		if (window.localStorage.getItem("loggedIn") !== "yes") {
			navigate("/");
		}
		const matchingPost = getIndividualPost(timestamp);
		console.log(matchingPost);
		setPost(matchingPost);
	}, []);

	const editPost = (event) => {
		// #19 Function now runs because form is submitted
		// #20 Prevent the default action of the broswer (refreshing the page and clearing the form)
		// because we don't want the data sent to the server, we want our JS to control the form
		//submission instead
		event.preventDefault();

		// #22 Retrieve existing posts from localStorage
		const oldPostsAsString = window.localStorage.getItem("posts");
		// #23 Create a let variable so we can access it outside the if statement block scope
		let posts = JSON.parse(oldPostsAsString);

		const existingPostIndex = posts.findIndex(
			(searchPost) => searchPost.timestamp === parseInt(timestamp)
		);
		posts[existingPostIndex] = post;

		// #28 Local storage can not store anything other than strings, so use JSON to convert the post
		//array from #27 into a string that we can store.
		const postsAsString = JSON.stringify(posts);

		// #29 Store the string from #28 into localStorage using the key of "post"
		window.localStorage.setItem("posts", postsAsString);
		// #30 Take us back to the home screen using navigate that came from the useNavigate hook at the
		//top of the function.
		navigate("/");
	};

	if (!post) {
		return <p>Loading...</p>;
	}
	//#17 Show form
	return (
		<div className="container">
			<h1>Edit Post</h1>
			<hr />
			{/* <!-- #28 Create a form that links to create post --> */}
			{/* <!-- #33 Form is submitted with valid inputs --> */}
			{/* #18 User submits form */}
			<form onSubmit={editPost}>
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
						value={post.title}
						onChange={(evt) => {
							setPost({ ...post, title: evt.target.value });
						}}
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
						value={post.content}
						onChange={(evt) => {
							setPost({ ...post, content: evt.target.value });
						}}
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
						value={post.author}
						onChange={(evt) => {
							setPost({ ...post, author: evt.target.value });
						}}
					/>
					{/* <!-- End of title input div --> */}
				</div>
				{/* <!-- #30 We add a button with a type of submit, that triggers the onsubmit function */}
				{/* from #7 --> */}
				<button type="submit" className="btn btn-success">
					Edit Post
				</button>
			</form>
		</div>
	);
};

export default EditPost;
