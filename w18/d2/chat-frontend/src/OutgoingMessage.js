const OutgoingMessage = (props) => {
	// console.log(props);
	const editMessage = async () => {
		const newMessageText = window.prompt(
			"What is the new message content?"
		);
		const response = await fetch(`http://localhost:3001/editMessage`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				newMessageText,
				id: props.messageToSingle.id,
			}),
		});

		props.makeAPICall();
	};

	return (
		<div className="row">
			<div className="col-2"></div>
			<div className="col-10 text-end" onClick={editMessage}>
				<span className="messageText outgoingMessage">
					{/* #9 Render the text from the messageToSingle prop sent in from #8 */}
					{/* #23 Show the new message text */}
					{props.messageToSingle.text}
				</span>
				<div style={{ color: "gray", fontSize: 12, marginTop: 5 }}>
					{props.messageToSingle.timestamp.toLocaleTimeString()}
				</div>
			</div>
		</div>
	);
};

export default OutgoingMessage;
