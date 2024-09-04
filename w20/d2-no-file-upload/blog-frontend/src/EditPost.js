import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getIndividualPost from "./lib/getIndividualPost";

const EditPost = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [post, setPost] = useState(null);

	useEffect(() => {
		console.log("checking to see if signed in");
		if (window.localStorage.getItem("loggedIn") !== "yes") {
			navigate("/");
		}
		const makeAPICall = async () => {
			const matchingPost = await getIndividualPost(id);
			console.log(matchingPost);
			setPost(matchingPost);
		};
		makeAPICall();
	}, []);

	const editPost = async (event) => {
		// #19 Function now runs because form is submitted
		// #20 Prevent the default action of the broswer (refreshing the page and clearing the form)
		// because we don't want the data sent to the server, we want our JS to control the form
		//submission instead
		event.preventDefault();

		const res = await fetch(`http://localhost:3001/post`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ post }),
		});

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
