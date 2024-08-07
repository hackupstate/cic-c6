import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "reactstrap";

function App() {
	return (
		<div className="App">
			<Container>
				<Row>
					{/* <div className="row"> */}
					<Col md={4}>Left col</Col>
					<Col md={8} style={{ border: "1px solid red" }}>
						Right col
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
