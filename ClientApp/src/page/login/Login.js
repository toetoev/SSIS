import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import axios from "axios";

export default function Login() {
	const [nameOrEmail, setNameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = (event) => {
		// TODO: call backend login api
		// pass in nameOrEmail, password, role
		// get token, redirect to home page of the role
		axios
			.post("https://localhost:5001/api/auth/login", {
				name: nameOrEmail,
				password: password,
				role: role,
			})
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
		// console.log(nameOrEmail, password, role);
		event.preventDefault();
	};

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
						<Form.Check
							inline
							type="radio"
							label="Admin"
							value="ADMIN"
							name="role"
							id="role3"
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
		</div>
	);
}
