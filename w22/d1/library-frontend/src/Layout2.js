import { Outlet } from "react-router-dom";

const Layout2 = () => {
	return (
		<div>
			<h1>Max's Library</h1>
			<Outlet />
		</div>
	);
};

export default Layout2;
