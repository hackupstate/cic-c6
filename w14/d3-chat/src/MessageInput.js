import { useState } from "react";

const MessageInput = () => {
	const [inputtedMessage, setInputtedMessage] = useState("");

	const sendMessage = (event) => {
		event.preventDefault();

		console.log(inputtedMessage);
	};

	return (
		<form className="row" onSubmit={sendMessage}>
			<div className="col-10">
				<input
					type="text"
					className="form-control"
					value={inputtedMessage}
					onChange={(evt) => setInputtedMessage(evt.target.value)}
				/>
			</div>
			<div className="col-2">
				<button
					type="submit"
					className="btn btn-success"
					style={{ width: "100%" }}
				>
					Send
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
