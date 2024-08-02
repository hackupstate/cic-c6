const IncomingMessage = ({ messageToSingle }) => {
	return (
		<div className="row">
			<div className="col-10">
				<span className="messageText incomingMessage">
					{/* #11 Show the text of the messageToSingle prop */}
					{messageToSingle.text}
				</span>
				<div style={{ color: "gray", fontSize: 12, marginTop: 5 }}>
					{messageToSingle.timestamp.toLocaleTimeString()}
				</div>
			</div>
		</div>
	);
};
export default IncomingMessage;
