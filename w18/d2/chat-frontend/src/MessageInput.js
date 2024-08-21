import { useState } from "react";

const MessageInput = ({ updateMessages, existingMessages }) => {
	// #13 Set up state to contain the inputted message of the input
	const [inputtedMessage, setInputtedMessage] = useState("");

	// #15B User has triggered the form submit event
	const sendMessage = async (event) => {
		event.preventDefault();

		const response = await fetch(`http://localhost:3001/message`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: inputtedMessage,
				outgoing: true,
				timestamp: new Date(),
			}),
		});

		//#16 Update state coming in from props, from App.js #2
		updateMessages([
			// #17 Spread a copy of all the existing messages into this new array
			...existingMessages,
			{
				// #18 Make a new message (the one we're sending) with outgoing to true
				//the timestamp to the current time, and finally the inputted message from
				// state on #13 & 15A
				text: inputtedMessage,
				timestamp: new Date(),
				outgoing: true,
			},
		]);
		// #19 Clear the inputted message text input
		setInputtedMessage("");

		console.log(inputtedMessage);
	};

	return (
		// #14 Link form submission to sendMessage function
		<form className="row" onSubmit={sendMessage}>
			<div className="col-10">
				<input
					type="text"
					className="form-control"
					// #15A Link this input value & onChange to our state from #13
					//which makes this a controlled input
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
