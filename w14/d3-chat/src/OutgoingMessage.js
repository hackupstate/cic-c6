const OutgoingMessage = (props) => {
	return (
		<div className="row">
			<div className="col-2"></div>
			<div className="col-10 text-end">
				<span className="messageText outgoingMessage">
					{props.messageToSingle.text}
				</span>
			</div>
		</div>
	);
};

export default OutgoingMessage;
