import { Button, Navbar, Nav } from "react-bootstrap";

import React from "react";
import { useHistory } from "react-router-dom";
import SignoutBtn from "../icon/SignoutBtn";

export default function Header() {
	let history = useHistory();

	const logout = () => {
		localStorage.removeItem("ACCESS_TOKEN");
		localStorage.removeItem("ROLE");
		history.push("/");
	};

	return (
		<div>
			<Navbar bg="dark" variant="dark" sticky="top">
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
					<a onClick={logout}><SignoutBtn></SignoutBtn></a>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
