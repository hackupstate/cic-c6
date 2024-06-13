console.log("JS Linked on homepage");

// #6, 47 Go to localStorage and get the item out with a key of posts.
const postsAsString = window.localStorage.getItem("posts");
// #7, 48 Localstorage returns out value as a string, so we need to parse (convert the string back to an object)
//using JSON.
let posts = JSON.parse(postsAsString);
// #8, 49 Test to make sure we can access keys in the object, because if it were a string, we wouldn't be able to.
console.log(posts);

// #9, 50 Make an empty string to store our HTML
let generatedHTML = "";

// #10, 51 Check to see if there is not (!) any posts in the string
if (!postsAsString) {
	// #11 The first time the site loads, there are no posts, so show a message in our HTML
	generatedHTML = "No posts exist yet";
} else {
	// #52 This time there are posts in storage, so sort them by timestamp so the newest posts are first
	posts = posts.sort((a, b) => {
		return b.timestamp - a.timestamp;
	});
	// #53 Create a large template literal that represents the HTML for a single post and drop in
	//the parsed data from the object that came from localstorage. The keys of this data
	//line up with the object.
	for (let post of posts) {
		generatedHTML += `
<div class="col-4">
	<div class="card">
		<!-- <img src="..." class="card-img-top" alt="..." /> -->
		<div class="card-body">
			<h5 class="card-title">${post.title}</h5>
			<div class="card-text">
				<div class="author">by ${post.author}</div>
				<div class="timestamp">${new Date(post.timestamp).toLocaleTimeString()}</div>
				<p>${post.content}</p>
			</div>
			<a href="read.html?timestamp=${
				post.timestamp
			}" class="btn btn-primary">Read more</a>
			<!-- End of card-body -->
		</div>
		<!-- End of card -->
	</div>
	<!-- end of the col -->
</div>`;
	}
}

//alternative to using a template litertal which we did above using string concatentation
// let generatedHTML =
// 	'<div class="col-4"><div class="card"><div class="card-body"><h5 class="card-title">' +
// 	post.title +
// 	'</h5><div class="card-text"><div class="author">by ' +
// 	post.author +
// 	'</div><div class="timestamp">' +
// 	new Date(post.timestamp).toLocaleTimeString() +
// 	"</div><p>" +
// 	post.content +
// 	'</p></div><a href="#" class="btn btn-primary">Read more</a></div></div></div>';

// #12 Put the "no posts" message into the HTML from #11
// #54 Use the HTML we generated to make them show up
document.getElementById("posts").innerHTML = generatedHTML;

// #13 Check local storage to see if user is logged in. They aren't so we ignore this.
// #55 The user is now signed in
if (window.localStorage.getItem("loggedIn") === "yes") {
	// #56 Update the links div to show the new post link instead of the login button.
	document.getElementById(
		"links"
	).innerHTML = `<a href="newPost.html">New Post</a>`;
}
