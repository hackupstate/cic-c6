import { Link } from "react-router-dom";
import PostPreview from "./PostPreview";
import { useEffect, useState } from "react";

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [postsInState, setPostsInState] = useState(null);

	useEffect(() => {
		const postsAsString = window.localStorage.getItem("posts");
		let posts = JSON.parse(postsAsString);
		console.log(posts);

		setLoading(false);
		if (!posts) {
			setPostsInState([]);
		} else {
			setPostsInState(posts);
		}
	}, []);

	if (loading) {
		return <div className="container text-center">Loading...</div>;
	}

	return (
		<div className="container">
			<h1>Max's Blog</h1>
			<hr />
			<div className="row" id="posts">
				{postsInState.length === 0 ? (
					<div className="text-center">No posts created yet.</div>
				) : (
					postsInState.map((postFromState) => {
						return <PostPreview key={postFromState.timestamp} />;
					})
				)}
			</div>
			<div className="links" id="links">
				{/* <Link to="/login">Login</Link> */}
				<Link to="/newPost">New Post</Link>
			</div>
		</div>
	);
};

export default Home;
