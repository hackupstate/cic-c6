const getIndividualPost = async (id) => {
	const res = await fetch(`http://localhost:3001/post/${id}`);
	const data = await res.json();
	return data.post;
};

export default getIndividualPost;
