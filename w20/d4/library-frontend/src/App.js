import { useEffect, useState } from "react";

function App() {
	const [books, setBooks] = useState(null);
	useEffect(() => {
		const makeAPICall = async () => {
			const res = await fetch(`http://localhost:3001/books`);
			const data = await res.json();
			setBooks(data.books);
		};
		makeAPICall();
	}, []);

	if (!books) {
		return <p>Loading...</p>;
	}
	return (
		<div className="App">
			<ul>
				{books.map((book) => {
					return (
						<li key={book.id}>
							{book.title} ({book.author})
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
