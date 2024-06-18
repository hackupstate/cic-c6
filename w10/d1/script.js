let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

// for (let [rowIndex, row] of Object.entries(board)) {
// 	for (let [colIndex, col] of Object.entries(row)) {
// 		console.log(rowIndex, colIndex, col);
// 	}
// }

console.log("JS Linked");

// //DOM & JS Variable, JS Data Structure (Array)
// const allButtons = document.getElementsByTagName("button");
// //JS Console & Output
// console.log(allButtons);

// //JS Variable (Global) Scope
// let xPlayersTurn = true;

// //JS For Loop
// for (const button of allButtons) {
// 	//JS Event & JS (Arrow) Function
// 	button.onclick = () => {
// 		//JS Conditional (If statement)
// 		if (button.innerHTML !== "&nbsp;") {
// 			alert("You little cheater");
// 		} else {
// 			//JS Ternary Operator (Inline If Statement)
// 			button.innerHTML = xPlayersTurn ? "X" : "O";
// 			xPlayersTurn = !xPlayersTurn;
// 		}
// 	};
// }

let xPlayersTurn = true;

const buttonClicked = (event) => {
	if (event.target.innerHTML !== "&nbsp;") {
		alert("You little cheater");
	} else {
		const rowIndex = event.target.getAttribute("data-rowIndex");
		const colIndex = event.target.getAttribute("data-colIndex");

		board[rowIndex][colIndex] = xPlayersTurn ? "X" : "O";
		xPlayersTurn = !xPlayersTurn;

		generateBoard();

		const winner = checkWin(board);
		if (winner) {
			setTimeout(() => {
				alert(winner + " has won");
			}, 250);
		}
	}
};

const generateBoard = () => {
	let generatedHTML = "";
	for (const [rowIndex, row] of Object.entries(board)) {
		generatedHTML += "<div>";
		for (const [colIndex, col] of Object.entries(row)) {
			generatedHTML += `<button 
			onclick="buttonClicked(event)"
			data-rowIndex="${rowIndex}"
			data-colIndex="${colIndex}"
			>${col || "&nbsp;"}</button>`;
		}

		generatedHTML += "</div>";
	}
	console.log("Setting HTML");
	document.getElementById("board").innerHTML = generatedHTML;
};

generateBoard();

const checkWin = (board) => {
	// Check rows
	for (let i = 0; i < 3; i++) {
		if (
			board[i][0] &&
			board[i][0] === board[i][1] &&
			board[i][0] === board[i][2]
		) {
			return board[i][0]; // Return the winning player ("X" or "O")
		}
	}

	// Check columns
	for (let i = 0; i < 3; i++) {
		if (
			board[0][i] &&
			board[0][i] === board[1][i] &&
			board[0][i] === board[2][i]
		) {
			return board[0][i]; // Return the winning player ("X" or "O")
		}
	}

	// Check diagonals
	if (
		board[0][0] &&
		board[0][0] === board[1][1] &&
		board[0][0] === board[2][2]
	) {
		return board[0][0]; // Return the winning player ("X" or "O")
	}
	if (
		board[0][2] &&
		board[0][2] === board[1][1] &&
		board[0][2] === board[2][0]
	) {
		return board[0][2]; // Return the winning player ("X" or "O")
	}

	// No winner
	return null;
};
