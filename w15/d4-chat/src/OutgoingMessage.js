const OutgoingMessage = (props) => {
	return (
		<div className="row">
			<div className="col-2"></div>
			<div className="col-10 text-end">
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
