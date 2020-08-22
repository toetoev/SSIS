import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

export default function Logout() {
	let history = useHistory();
	const logout = () => {
		localStorage.removeItem("ACCESS_TOKEN");
		localStorage.removeItem("ROLE");
		localStorage.removeItem("NAME");
		history.push("/");
	};
	return (
		<Button type="primary" onClick={logout}>
			Sign Out{" "}
		</Button>
	);
}
