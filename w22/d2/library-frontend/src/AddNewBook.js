import { useState } from "react";
import { useNavigate } from "react-router-dom";
import makeAPICall from "./makeAPICall";

const AddNewBook = () => {
	const navigateTo = useNavigate();
	const [title, setTitle] = useState("");

	const addBook = async (event) => {
		event.preventDefault();

		const author = event.target.elements.author.value;
		// setTitle("Something new");
		//not preferred in react
		// event.target.elements.author.value = "";

		await makeAPICall(`/book`, "POST", { title, author });

		navigateTo("/");
	};
	return (
		<div>
			<h1>Add New Book</h1>
			<form onSubmit={addBook}>
				<label htmlFor="title">Title: </label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<br />
				<label htmlFor="author">Author: </label>
				<input type="text" id="author" />
				<button type="submit">Add New Book</button>
			</form>
		</div>
	);
};

export default AddNewBook;
