import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import "./MessagesList.css";

// const evenNums = [2, 4, 6];
// const oddNums = evenNums.map((evenNum) => {
// 	return evenNum + 1;
// });
// console.log(oddNums);

// #5 Receive the state from the parent component (App.js) trhough a prop
//called messagesToList
const MessagesList = ({ messagesToList }) => {
	//below is an alternative to map, but it's not preferred in react code
	// let messageComponents = [];
	// for (let individualMessage of messagesToList) {
	// 	if (individualMessage.outgoing) {
	// 		messageComponents.push(
	// 			<OutgoingMessage messageToSingle={individualMessage} />
	// 		);
	// 	} else {
	// 		messageComponents.push(
	// 			<IncomingMessage messageToSingle={individualMessage} />
	// 		);
	// 	}
	// }

	return (
		<div id="messagesList">
			{/* {messageComponents} */}
			{/* #6 Loop (map) over each message in the prop to get access to each individual message */}
			{/* #20 A new message has been added to this list, so map over the messages again and make the new meessage now show */}
			{messagesToList.map((individualMessage, index) => {
				// #7 Check to seew if the individual message is outgoing
				// #21 The new message IS an outgoing message
				if (individualMessage.outgoing) {
					// #8 If it is, return a OutgoingMessage component that has the individual
					//message sent in as a prop.
					// #22 Send the new message into OutgoingMessage component
					return (
						<OutgoingMessage
							key={index}
							messageToSingle={individualMessage}
						/>
					);
				} else {
					// #10 If it isn't an outgoing message, instead show the incoming Message component.
					return (
						<IncomingMessage
							key={index}
							messageToSingle={individualMessage}
						/>
					);
				}
			})}
		</div>
	);
};

export default MessagesList;
