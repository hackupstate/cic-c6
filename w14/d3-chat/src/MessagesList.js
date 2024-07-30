import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import "./MessagesList.css";

const MessagesList = ({ messagesToList }) => {
	return (
		<div id="messagesList">
			{messagesToList.map((individualMessage) => {
				// console.log(message);
				if (individualMessage.outgoing) {
					return (
						<OutgoingMessage messageToSingle={individualMessage} />
					);
				} else {
					return (
						<IncomingMessage messageToSingle={individualMessage} />
					);
				}
			})}
		</div>
	);
};

export default MessagesList;
