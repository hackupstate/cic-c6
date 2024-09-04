import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const loginFormSubmitted = async (event) => {
		event.preventDefault();
		console.log("login form submitted");
		console.log(username, password);

		const res = await fetch(`http://localhost:3001/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: username, password }),
		});
		const data = await res.json();
		if (data.error) {
			setError(data.message);
		} else {
			window.localStorage.setItem("loggedIn", "yes");
			window.localStorage.setItem("userID", data.userID);
			navigate("/newPost");
		}
	};
	return (
		<div className="container">
			<h1>Login</h1>
			{/* <!-- #15 Make form for user to fill out --> */}
			{/* <!--  #18 User enters valid username and password and submits the form--> */}
			<form onSubmit={loginFormSubmitted}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username
					</label>
					<input
						type="text"
						className="form-control"
						id="username"
						value={username}
						onChange={(evt) => {
							setUsername(evt.target.value);
						}}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(evt) => {
							setPassword(evt.target.value);
						}}
					/>
				</div>
				<button className="btn btn-primary" type="submit">
					Login
				</button>
				<p style={{ color: "red" }}>{error}</p>
			</form>
		</div>
	);
};

export default Login;
