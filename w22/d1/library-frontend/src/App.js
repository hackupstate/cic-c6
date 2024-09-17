import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import CheckedOutBooks from "./CheckedOutBooks";
import Layout from "./Layout";
import Layout2 from "./Layout2";
import Navbar from "./Navbar";
import AddNewBook from "./AddNewBook";

function App() {
	const myRoutes = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/checkedOutBooks", element: <CheckedOutBooks /> },
				{ path: "/addNewBook", element: <AddNewBook /> },
			],
		},
		{
			path: "/no-nav",
			element: <Layout2 />,
			children: [{ path: "", element: <Home /> }],
		},
	]);
	return (
		<div className="App">
			<RouterProvider router={myRoutes} />
		</div>
	);
}

export default App;
