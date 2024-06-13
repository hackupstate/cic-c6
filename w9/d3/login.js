// #17 Make function called loginFormSubmitted but don't run it yet
// #19 Form is submitted so run the function
const loginFormSubmitted = (event) => {
	// #20 Prevent the page from refreshing
	event.preventDefault();

	// #21 Get username and password typed in values from for inputs
	//(Two different ways of achieving this)
	const username = event.target.elements.username.value;
	const password = document.getElementById("password").value;

	// #22 Check to make sure the username is exactly max
	if (username !== "max") {
		alert("Wrong username. Get out.");
		// #23 Check to make sure the password is exactly secret
	} else if (password !== "secret") {
		alert("Wrong password. Get out.");
	} else {
		// #24 The username and pass are correct, so store localStorage key so we know the user is
		//signed in for future visits.
		window.localStorage.setItem("loggedIn", "yes");
		// #25 Redirect them to the newPost page.
		window.location = "newPost.html";
	}
};
