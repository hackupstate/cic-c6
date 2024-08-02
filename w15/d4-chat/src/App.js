import "./App.css";
// #1 Import components so we can use them on this page in the return JSX
import Header from "./Header";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import { useState } from "react";

function App() {
	// #2 Set up state of some initial messages that uses an array of objects
	//to represent each message that was sent or received
	const [messagesInState, setMessages] = useState([
		{
			text: "Hello World. First message!",
			timestamp: new Date(),
			outgoing: true,
		},
		{
			text: "Responding to hello out there!",
			timestamp: new Date(),
			outgoing: false,
		},
	]);

	// #3 Return out our user interface for the first time
	return (
		<div className="container">
			<Header />
			{/* #4 Show the messages list component and pass in the state
			as a prop calles messagesToList */}
			{/* #19 Because messages list has changed from #16-18 and this prop
			now receives a new value. */}
			<MessagesList messagesToList={messagesInState} />
			{/* #12 After we are done looping over the existing messages,
			 show the input to send a new message. Give this component access to both
			 the state value and the function to update the messages BOTH via props.*/}
			<MessageInput
				updateMessages={setMessages}
				existingMessages={messagesInState}
			/>
		</div>
	);
}

export default App;
