import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import makeAPICall from "./makeAPICall";

const Layout = () => {
	const [users, setUsers] = useState(null);
	const [selectedUser, setSelectedUser] = useState("");

	useEffect(() => {
		const getData = async () => {
			const { users } = await makeAPICall(`/users`, "GET");
			setUsers(users);
		};
		getData();
	}, []);

	if (!users) {
		return <p>Loading</p>;
	}

	return (
		<div className="container">
			<h1>Max's Library</h1>
			<Navbar />
			<select
				value={selectedUser}
				onChange={(event) => {
					setSelectedUser(event.target.value);
				}}
			>
				<option></option>
				{users.map((user) => {
					return (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					);
				})}
			</select>
			<Outlet context={[selectedUser]} />
		</div>
	);
};

export default Layout;
