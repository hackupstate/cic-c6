import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import getIndividualPost from "./lib/getIndividualPost";

const ReadPost = () => {
	// R1: Extract timestamp from URL path using react router hook
	const { id } = useParams();
	const navigate = useNavigate();

	// R2: Set up place in state to store the ONE post we're trying to view
	const [postInState, setPostInState] = useState(null);

	// R3: Set up useEffect ONCE the page has loaded
	useEffect(() => {
		// R5: Because the component has loaded (it's currently showing a loading message)
		//Proceed to get posts from local storage

		const getPost = async () => {
			const matchingPost = await getIndividualPost(id);
			// R8: Set the one matching post we found in R7 into state
			setPostInState(matchingPost);
		};
		getPost();
	}, []);

	const deletePost = async () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			await fetch(`http://localhost:3001/post/${id}`, {
				method: "DELETE",
			});
			navigate("/");
		}
	};

	// R4: The useEffect hasn't loaded the post into state yet, so ignore the second
	//return that will error out trying to access data in an object that isn't loaded.
	//Instead return this loading message.
	// R9: Skip this if statement because postInState is now set
	if (!postInState) {
		return <p className="container text-center">Loading...</p>;
	}

	//R10: Return this HTML instead, which uses the keys set from the post object
	return (
		<div className="container">
			<h5>{postInState.title}</h5>
			<hr />
			<p style={{ marginBottom: 0 }}>by: {postInState.author}</p>
			<p>{new Date(postInState.updatedAt).toLocaleString()}</p>
			<hr />
			<p>{postInState.content}</p>
			<hr />
			{window.localStorage.getItem("loggedIn") === "yes" ? (
				<>
					<Link to={`/editPost/${id}`}>
						<button className="btn btn-primary">Edit</button>
					</Link>
					<button className="btn btn-danger" onClick={deletePost}>
						Delete
					</button>
				</>
			) : null}
		</div>
	);
};

export default ReadPost;

// #T1 When the page first loads (useEffect)
// #T2 Get the posts from localStorage & parse them
// #T3 Get the timestamp from the URL
// #T4 Find the post based off the timestamp
// #T5 Generate the HTML based off the data (state)
