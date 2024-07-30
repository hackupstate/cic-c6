import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NewPost from "./NewPost";
import ReadPost from "./ReadPost";
import Login from "./Login";

const myRoutes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/newPost",
		element: <NewPost />,
	},
	{
		path: "/read",
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
			<RouterProvider router={myRoutes} />
		</div>
	);
}

export default App;
