let accounts = [
	{ id: 1, type: "checking", balance: 100 },
	{ id: 2, type: "savings", balance: 50 },
	{ id: 3, type: "savings", balance: 350 },
	{ id: 4, type: "checking", balance: 350 },
	{ id: 5, type: "checking", balance: 150 },
];

//start the sum at 0
let sum = 0;

//loop over each account
for (const account of accounts) {
	//if the type key in the account object from the accounts array is equal to checking
	if (account.type === "checking") {
		//add the account balance to the sum from line #9
		sum = sum + account.balance;
	}
}
//log out the output after looping over each account
console.log(sum);

//access second account in array then get it's type
console.log(accounts[1].type);
