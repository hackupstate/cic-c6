console.log("JS Linked");

const postsAsString = window.localStorage.getItem("posts");
const posts = JSON.parse(postsAsString);

console.log(posts);

const params = new URL(window.location.href);
const dateID = params.searchParams.get("timestamp");
console.log(dateID);

const post = posts.find(
	(searchPost) => searchPost.timestamp === parseInt(dateID)
);

console.log(post);

document.getElementById("post").innerHTML = `
<h5>${post.title}</h5><hr/>
<p style="margin-bottom: 0">by: ${post.author}</p>
<p>${new Date(post.timestamp).toLocaleString()}</p><hr/>
<p>${post.content}</p>`;
