// const url =
// 	process?.env.REACT_APP_PROD === true
// 		? "http://myURL.com"
// 		: "http://localhost:3002";
const url = "http://localhost:3002";

const makeAPICall = async (path, method, body) => {
	const res = await fetch(`${url}${path}`, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const data = await res.json();
	return data;
};

export default makeAPICall;
