import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeAPICall from "./makeAPICall.js";
import { useOutletContext } from "react-router-dom";

const Home = () => {
	const [selectedUser] = useOutletContext();

	const [books, setBooks] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(`http://localhost:3002/books`);
			const data = await res.json();
			setBooks(data.books);
		};
		getData();
	}, []);

	const checkOutItem = (bookID) => {
		makeAPICall(`/checkedOut`, "POST", {
			bookID,
			userID: selectedUser,
		});
		alert("You've checked this out");
	};

	if (!books) {
		return <p>Loading...</p>;
	}

	return (
		<div id="home">
			<h1>Home</h1>

			<ul>
				{books.map((book) => {
					return (
						<li key={book.id}>
							{book.title} ({book.author}){" "}
							<span
								style={{
									textDecoration: "underline",
									color: "blue",
								}}
								onClick={() => {
									checkOutItem(book.id);
								}}
							>
								Check out Item
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Home;
