import { Link } from "react-router-dom";
import PostPreview from "./PostPreview";
import { useEffect, useState } from "react";

//#5,31 Load the homepage based off the route/path
const Home = () => {
	// #6,32 Set up two variables in state, both of which will be based off
	// data that will eventually be shown to the user. Start loading off as
	//true (because we have to wait for the localStorage to get the data), and
	//start the posts out as null, because they haven't loaded yet.
	const [loading, setLoading] = useState(true);
	const [postsInState, setPostsInState] = useState(null);

	//#7,33 useEffect with an empty array as a second parameter tells React
	//to do the function only the first time the page loads. This prevents an
	//infinite loop of us reading posts from local storage, then setting them
	//into state, which then loops back to local storage.
	useEffect(() => {
		// #9,35 The component has now loaded (mounted) so go run the useEffect here.
		// Retrieve posts from local storage
		const postsAsString = window.localStorage.getItem("posts");
		// #10,36 Parse them from the string to an array
		let posts = JSON.parse(postsAsString);
		console.log(posts);

		// #11,37 Set loading to false, no matter if we have posts or not, we have pulled
		//what we have from storage, so we no longer want to show the loading message.
		setLoading(false);
		if (!posts) {
			// #12 There are not posts in localStorage, so set the posts to an empty array.
			setPostsInState([]);
		} else {
			// #38 Because there are posts from localStorage, set them into state
			setPostsInState(posts);
		}
	}, []);

	//#8,34 Check to see if loading is true. It is from #6 so show the loading... message to the user
	// #13 Loading is now false, so skip this return
	if (loading) {
		return <div className="container text-center">Loading...</div>;
	}

	return (
		<div className="container">
			<h1>Max's Blog</h1>
			<hr />
			<div className="row" id="posts">
				{/* #14 Check to see if number of posts in state is zero. It is, so return everything between
				the ? and the : */}
				{/* #39 There are now posts in state, but there are no longer 0 of them so instead map over them */}
				{postsInState.length === 0 ? (
					// #15 Display this message.
					<div className="text-center">No posts created yet.</div>
				) : (
					// #40 Map loops over each post from state and returns a PostPreview for each one of them
					postsInState.map((postFromState) => {
						return <PostPreview key={postFromState.timestamp} />;
					})
				)}
			</div>
			<div className="links" id="links">
				{/* <Link to="/login">Login</Link> */}
				{/* #16 User clicks link to new post */}
				<Link to="/newPost">New Post</Link>
			</div>
		</div>
	);
};

export default Home;
