import { useState, useEffect } from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp, UserButton, useUser, useAuth } from "@clerk/clerk-react";

// #1 Import functions and components from react-router-dom which is a package we
//installed using the terminal command: npm install react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// #2 Import components that we would like to be their own pages
import Home from "./Home";
import NewPost from "./NewPost";
import ReadPost from "./ReadPost";
import Login from "./Login";
import EditPost from "./EditPost";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key!')
}
const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ProtectedSignedIn() {
	const { user } = useUser();
	const { getToken } = useAuth();

	const [word, setWord] = useState('');
  
	useEffect(() => {
	  getToken().then(token => {                            // 1) Ask clerk to generate a token
		return fetch('http://localhost:3001/secret-word', { // 2) Make a request...
		  headers: { 'Authorization': `Bearer ${token}` },  // ... including the token that was just generated!
		}).then(response => {
		  if (!response.ok) {                               // 3) Make sure the request was successful, log if not
			console.log(`Error making request to get data: received ${response.statusCode}`);
			return;
		  }
		  return response.json().then(json => {             // 4) Extract the json data out of the response...
			setWord(json.data);                             // ... and store the string found at key “data” in the response into state 
		  });
		});
	  });
	}, [getToken]);

	return (
	  <div style={{ backgroundColor: 'white' }}>
		<h1 style={{color: 'red'}}>This page is protected!</h1>
		<p>Welcome, {user.firstName}</p>
		<p>Secret word: {word}</p>                         {/* 5) Display the word into the user */}
		<UserButton />
	  </div>
	)
  }
  
  function Protected() {
	return (
	  <div>
		<SignedIn>
		  <ProtectedSignedIn />
		</SignedIn>
		<SignedOut>
		  <RedirectToSignIn />
		</SignedOut>
	  </div>
	);
  }

  function AnotherProtectedSignedIn() {
	return (
	  <div style={{ backgroundColor: 'white' }}>
		<h1 style={{ color: 'red' }}>This is another protected route!</h1>
	  </div>
	)
  }
  
  function AnotherProtectedRoute() {
	return (
	  <div>
		<SignedIn>
		  <AnotherProtectedSignedIn />
		</SignedIn>
		<SignedOut>
		  <RedirectToSignIn />
		</SignedOut>
	  </div>
	);
  }



// #3 Set up routes that connect paths to elements, combined they make a route
//which makes them their own page accessible in the browswer.
const myRoutes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		//#17 User clicks link on homepage, so we go to this component
		path: "/newPost",
		element: <NewPost />,
	},
	{
		path: "/read/:id",
		element: <ReadPost />,
	},
	{
		path: "/old-outdated-login", // This is no longer going to be used, so rename it to make things less confusing
		element: <Login />,
	},
	{
		path: "/editPost/:timestamp",
		element: <EditPost />,
	},

	// Clerk specific routes
	{ path: "/sign-in/*", element: <SignIn routing="path" path="/sign-in" /> },
	{ path: "/sign-up/*", element: <SignUp routing="path" path="/sign-up" /> },
	
	// Protected page - a user must be logged in to view this page
	{
		path: "/protected",
		element: <Protected />,
	},
	{ path: "/another-protected-route", element: <AnotherProtectedRoute /> },
]);

function App() {
	return (
		<ClerkProvider publishableKey={clerkPublishableKey} navigate={(to) => myRoutes.navigate(to)}>
			<div className="App">
				{/* #4 Use RouterProvider from react-router to show our routes
				based off path in browser */}
				<RouterProvider router={myRoutes} />
			</div>
		</ClerkProvider>
	);
}

export default App;
