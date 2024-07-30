import "./App.css";
import Header from "./Header";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import { useState } from "react";

function App() {
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
	return (
		<div className="container">
			<Header />
			<MessagesList messagesToList={messagesInState} />
			<MessageInput />
		</div>
	);
}

export default App;
