import { useEffect, useState } from "react";
import makeAPICall from "./makeAPICall";
import { useOutletContext } from "react-router-dom";

const CheckedOutBooks = () => {
	const [selectedUser] = useOutletContext();
	const [checkedOutBooks, setCheckedOutBooks] = useState();

	useEffect(() => {
		console.log(selectedUser);

		const getData = async () => {
			const data = await makeAPICall(
				`/checkedOutBooks/${selectedUser}`,
				"GET"
			);
			setCheckedOutBooks(data.checkedOutBooks);
		};

		if (selectedUser) {
			getData();
		}
	}, [selectedUser]);

	if (!checkedOutBooks) {
		return <p>Loading...</p>;
	}
	return (
		<div id="checkedOutBooks">
			<h1>Checked Out Books</h1>
			<ul>
				{checkedOutBooks.map((checkedOutBook) => {
					return (
						<li key={checkedOutBook.id}>
							{checkedOutBook.book.title}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default CheckedOutBooks;
