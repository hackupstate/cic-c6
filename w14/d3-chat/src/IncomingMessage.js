const IncomingMessage = ({ messageToSingle }) => {
	return (
		<div className="row">
			<div className="col-10">
				<span className="messageText incomingMessage">
					{messageToSingle.text}
				</span>
			</div>
		</div>
	);
};
export default IncomingMessage;
