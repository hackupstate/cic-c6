console.log("JS Linked");

//DOM & JS Variable, JS Data Structure (Array)
const allButtons = document.getElementsByTagName("button");
//JS Console & Output
console.log(allButtons);

//JS Variable (Global) Scope
let xPlayersTurn = true;

//JS For Loop
for (const button of allButtons) {
	//JS Event & JS (Arrow) Function
	button.onclick = () => {
		//JS Conditional (If statement)
		if (button.innerHTML !== "&nbsp;") {
			alert("You little cheater");
		} else {
			//JS Ternary Operator (Inline If Statement)
			button.innerHTML = xPlayersTurn ? "X" : "O";
			xPlayersTurn = !xPlayersTurn;
		}
	};
}
