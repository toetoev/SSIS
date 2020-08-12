import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import Bootbox from "bootbox-react";
import DeptRole from "../../constant/DeptRole";
import StoreRole from "../../constant/StoreRole";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
	let history = useHistory();

	const [nameOrEmail, setNameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [alertMsg, setAlertMsg] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const handleSubmit = (event) => {
		axios
			.post("https://localhost:5001/api/auth/login", {
				name: nameOrEmail,
				password: password,
				role: role,
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					localStorage.setItem("ACCESS_TOKEN", result.data.accessToken);
					localStorage.setItem("ROLE", result.data.role);
					directToHomePageBasedOnRole();
				} else {
					setAlertMsg(result.message);
					setShowAlert(true);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		event.preventDefault();
	};

	const directToHomePageBasedOnRole = () => {
		const isAuthenticated = localStorage.getItem("ACCESS_TOKEN") !== null;
		const currentRole = localStorage.getItem("ROLE");
		if (isAuthenticated) {
			if (Object.values(DeptRole).includes(currentRole)) {
				switch (currentRole) {
					case DeptRole.DeptHead:
						history.push("/dept/dept-head");
						break;
					case DeptRole.DeptRep:
						history.push("/dept/dept-rep");
						break;
					case DeptRole.Employee:
						history.push("/dept/employee");
						break;
					default:
						break;
				}
			} else if (Object.values(StoreRole).includes(currentRole)) {
				switch (currentRole) {
					case StoreRole.Manager:
						history.push("/store/manager");
						break;
					case StoreRole.Supervisor:
						history.push("/store/supervisor");
						break;
					case StoreRole.Clerk:
						history.push("/store/clerk");
						break;
					default:
						break;
				}
			}
		}
	};
	directToHomePageBasedOnRole();

	return (
		<div>
			<Form>
				<Form.Group as={Row} controlId="nameOrEmail">
					<Form.Label column sm={2}>
						Name / Email
					</Form.Label>
					<Col sm={10}>
						<Form.Control
							type="text"
							placeholder="Name / Email"
							onChange={(e) => setNameOrEmail(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="password">
					<Form.Label column sm={2}>
						Password
					</Form.Label>
					<Col sm={10}>
						<Form.Control
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label as="legend" column sm={2}>
						Role
					</Form.Label>
					<Col
						sm={10}
						className="m-auto d-flex justify-content-start"
						onChange={(e) => setRole(e.target.value)}
					>
						<Form.Check
							inline
							type="radio"
							label="Store"
							value="STORE"
							name="role"
							id="role1"
						/>
						<Form.Check
							inline
							type="radio"
							label="Department"
							value="DEPARTMENT"
							name="role"
							id="role2"
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="justify-content-center">
					<Col sm={12}>
						<Button type="button" className="w-100" onClick={handleSubmit}>
							Sign in
						</Button>
					</Col>
				</Form.Group>
			</Form>
			<Bootbox
				show={showAlert}
				type={"alert"}
				message={alertMsg}
				onClose={(e) => setShowAlert(false)}
			/>
		</div>
	);
}
