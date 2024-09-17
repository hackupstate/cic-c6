import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav>
			<NavLink to="/">Home</NavLink> |{" "}
			<NavLink to="/checkedOutBooks">Checked out Books</NavLink> |{" "}
			<NavLink to="/addNewBook">Add New Book</NavLink>
		</nav>
	);
};

export default Navbar;
