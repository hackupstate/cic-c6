import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NewPost = () => {
	const navigate = useNavigate();

	const [title, setTitle] = useState("");

	useEffect(() => {
		console.log("checking to see if signed in");
		if (window.localStorage.getItem("loggedIn") !== "yes") {
			navigate("/");
		}
	}, []);

	const createPost = async (event) => {
		// #19 Function now runs because form is submitted
		// #20 Prevent the default action of the broswer (refreshing the page and clearing the form)
		// because we don't want the data sent to the server, we want our JS to control the form
		//submission instead
		event.preventDefault();
		// #21 We go to the event that was triggered
		const form = event.target;

		//#26 Create a post object to hold the four keys of the details we need about a post.
		//Access the form's elements, using the IDs from the HTML, to get inputs and subsquently
		//their values. Also use Date.now() to store the time the post was created.
		const post = {
			title: form.elements.titleInput.value,
			content: form.elements.content.value,
		};

		await fetch(`http://localhost:3001/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(post),
		});

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
						value={title}
						onChange={(evt) => {
							setTitle(evt.target.value);
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
					></textarea>
					{/* <!-- End of div for content text area --> */}
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
