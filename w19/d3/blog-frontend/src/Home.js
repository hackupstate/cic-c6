import { Link } from "react-router-dom";
import PostPreview from "./PostPreview";
import { useEffect, useState } from "react";
import carPhoto from "./myImages/car.jpg";
import { UserButton } from "@clerk/clerk-react";

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
		const makeAPICall = async () => {
			setLoading(true);
			const res = await fetch(`http://localhost:3001/posts`);
			const data = await res.json();

			console.log(data.posts);
			setPostsInState(data.posts);
			setLoading(false);
		};

		makeAPICall();
	}, []);

	//#8,34 Check to see if loading is true. It is from #6 so show the loading... message to the user
	// #13 Loading is now false, so skip this return
	if (loading) {
		return <div className="container text-center">Loading...</div>;
	}

	return (
		<div className="container">
			<div className="topbar">
				<h1>Max's Blog</h1>
				<UserButton />
			</div>
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
						return (
							<PostPreview
								key={postFromState.timestamp}
								postDetails={postFromState}
							/>
						);
					})
				)}
			</div>
			<div className="links" id="links">
				{/* #16 User clicks link to new post */}
				{window.localStorage.getItem("loggedIn") === "yes" ? (
					<>
						<Link to="/newPost">New Post</Link> |{" "}
						<span
							style={{
								color: "blue",
								textDecoration: "underline",
							}}
							onClick={() => {
								window.localStorage.setItem("loggedIn", "no");
								// MZM 7-31-24 This window location triggers the page to reload.
								//This is required because updating local storage does not cause the
								//page to re-render which would show the user, they are now logged out.
								window.location = "/";
							}}
						>
							Logout
						</span>
					</>
				) : (
					<Link to="/sign-in">Login with Clerk</Link>
				)}
			</div>
			<img style={{ width: 300 }} src="/img/publicFolderImg.jpg" />
			<img style={{ width: 300 }} src={carPhoto} />
		</div>
	);
};

export default Home;
