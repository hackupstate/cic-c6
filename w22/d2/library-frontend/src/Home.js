import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeAPICall from "./makeAPICall.js";
import { useOutletContext } from "react-router-dom";

const Home = () => {
	const cars = [
		{
			make: "Tesla",
			model: "Model Y",
		},
		{
			make: "Ford",
			model: "Mustang Mach-E",
		},
		{
			make: "Audi",
			model: "e-tron",
		},
		{
			make: "BMW",
			model: "iX",
		},
		{
			make: "Hyundai",
			model: "Ioniq 5",
		},
		{
			make: "Rivian",
			model: "R1S",
		},
	];

	const [selectedUser] = useOutletContext();

	const [books, setBooks] = useState(null);
	const [searchResults, setSearchResults] = useState();
	const [inputtedSearch, setInputtedSearch] = useState("");

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(`http://localhost:3002/books`);
			const data = await res.json();
			setBooks(data.books);
		};
		getData();
	}, []);

	const checkOutItem = async (bookID) => {
		const result = await makeAPICall(`/checkedOut`, "POST", {
			bookID,
			userID: selectedUser,
		});
		if (result.success) {
			alert("You've checked this out");
		} else {
			alert(result.error);
		}
	};

	const search = (event) => {
		event.preventDefault();
		const searchText = event.target.elements.searchText.value.toLowerCase();

		if (searchText) {
			const results = books.filter((book) => {
				if (
					book.title.toLowerCase().includes(searchText) ||
					book.author.toLowerCase().includes(searchText)
				) {
					return true;
				} else {
					return false;
				}
			});

			setSearchResults(results);
		} else {
			setSearchResults(null);
		}
	};

	useEffect(() => {
		if (inputtedSearch) {
			const results = books.filter((book) => {
				if (
					book.title
						.toLowerCase()
						.includes(inputtedSearch.toLowerCase()) ||
					book.author
						.toLowerCase()
						.includes(inputtedSearch.toLowerCase())
				) {
					return true;
				} else {
					return false;
				}
			});

			setSearchResults(results);
		} else {
			setSearchResults(null);
		}
	}, [inputtedSearch]);

	const searchAPI = async (event) => {
		event.preventDefault();
		const searchText = event.target.elements.searchText.value.toLowerCase();

		if (searchText) {
			const data = await makeAPICall("/search", "POST", { searchText });
			setSearchResults(data.books);
		} else {
			setSearchResults(null);
		}
	};

	if (!books) {
		return <p>Loading...</p>;
	}

	return (
		<div id="home">
			{/* <Table data={cars} />
			<Table
				data={[
					{ make: "apple", model: "MacBook" },
					{ make: "Microsoft", model: "Shit" },
				]}
			/> */}

			<h1>Home</h1>

			<form onSubmit={search}>
				<input type="text" placeholder="Search..." id="searchText" />
				<button type="submit">Search</button>
			</form>

			<input
				type="text"
				placeholder="Live Search..."
				value={inputtedSearch}
				onChange={(evt) => {
					setInputtedSearch(evt.target.value);
				}}
			/>

			<form onSubmit={searchAPI}>
				<input
					type="text"
					placeholder="API Search..."
					id="searchText"
				/>
				<button type="submit">Search</button>
			</form>

			<ul>
				{(searchResults || books).map((book) => {
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
			<Button buttonText="My Button" />
			<Button buttonText="My Second Button" />
		</div>
	);
};

const Button = ({ buttonText }) => {
	return <button>{buttonText}</button>;
};

const Table = ({ data }) => {
	if (!data) {
		return <p>No table data to show</p>;
	}
	return (
		<table>
			<thead>
				<tr>
					<th>Make</th>
					<th>Model</th>
				</tr>
			</thead>
			<tbody>
				{data.map((car) => {
					return (
						<tr>
							<td style={{ border: "1px solid gray" }}>
								{car.make}
							</td>
							<td style={{ border: "1px solid gray" }}>
								{car.model}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Home;
