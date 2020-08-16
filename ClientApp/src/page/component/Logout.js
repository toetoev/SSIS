import { Button, Col, Row } from "antd";

import React from "react";
import { useHistory } from "react-router-dom";

export default function Logout() {
	let history = useHistory();
	const logout = () => {
		localStorage.removeItem("ACCESS_TOKEN");
		localStorage.removeItem("ROLE");
		history.push("/");
	};
	return (
		<Row justify="end" align="middle">
			<Col>
				<Button type="primary" onClick={logout}>
					Sign Out{" "}
				</Button>
			</Col>
		</Row>
	);
}
