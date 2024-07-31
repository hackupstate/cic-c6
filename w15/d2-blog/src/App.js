// #1 Import functions and components from react-router-dom which is a package we
//installed using the terminal command: npm install react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// #2 Import components that we would like to be their own pages
import Home from "./Home";
import NewPost from "./NewPost";
import ReadPost from "./ReadPost";
import Login from "./Login";

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
		path: "/read/:timestamp",
		element: <ReadPost />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

function App() {
	return (
		<div className="App">
			{/* #4 Use RouterProvider from react-router to show our routes
			based off path in browser */}
			<RouterProvider router={myRoutes} />
		</div>
	);
}

export default App;
