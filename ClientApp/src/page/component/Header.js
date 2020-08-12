import { Button, Navbar } from "react-bootstrap";

import React from "react";
import { useHistory } from "react-router-dom";

export default function Header() {
	let history = useHistory();

	const logout = () => {
		localStorage.removeItem("ACCESS_TOKEN");
		localStorage.removeItem("ROLE");
		history.push("/");
	};

	return (
		<div>
			<Navbar bg="primary" variant="dark" sticky="top">
				<Navbar.Brand href="/">
					<img
						alt=""
						src="/logo.svg"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>
					Hello
				</Navbar.Brand>
				<Navbar.Collapse className="justify-content-end">
					<Button type="button" onClick={logout}>
						Sign Out
					</Button>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
