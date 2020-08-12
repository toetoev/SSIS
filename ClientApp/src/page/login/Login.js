import { Button, Col, Form, Row } from "react-bootstrap";
import React, { Component } from "react";

import DeptRole from "../../constant/DeptRole";
import StoreRole from "../../constant/StoreRole";
import axios from "axios";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameOrEmail: "",
			password: "",
			role: "",
		};
		this.directToHomePageBasedOnRole();
	}

	handleSubmit = (event) => {
		axios
			.post("https://localhost:5001/api/auth/login", {
				name: this.state.nameOrEmail,
				password: this.state.password,
				role: this.state.role,
			})
			.then((res) => {
				if (res.data.success) {
					localStorage.setItem("ACCESS_TOKEN", res.data.data.accessToken);
					localStorage.setItem("ROLE", res.data.data.role);
					this.directToHomePageBasedOnRole();
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		event.preventDefault();
	};

	directToHomePageBasedOnRole = () => {
		const isAuthenticated = localStorage.getItem("ACCESS_TOKEN") !== null;
		const currentRole = localStorage.getItem("ROLE");
		if (isAuthenticated) {
			if (Object.values(DeptRole).includes(currentRole)) {
				switch (currentRole) {
					case DeptRole.DeptHead:
						this.props.history.push("/dept/dept-head");
						break;
					case DeptRole.DeptRep:
						this.props.history.push("/dept/dept-rep");
						break;
					case DeptRole.Employee:
						this.props.history.push("/dept/employee");
						break;
					default:
						break;
				}
			} else if (Object.values(StoreRole).includes(currentRole)) {
				switch (currentRole) {
					case StoreRole.Manager:
						this.props.history.push("/store/manager");
						break;
					case StoreRole.Supervisor:
						this.props.history.push("/store/supervisor");
						break;
					case StoreRole.Clerk:
						this.props.history.push("/store/clerk");
						break;
					default:
						break;
				}
			}
		}
	};

	render() {
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
								onChange={(e) => this.setState({ nameOrEmail: e.target.value })}
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
								onChange={(e) => this.setState({ password: e.target.value })}
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
							onChange={(e) => this.setState({ role: e.target.value })}
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
							<Button type="button" className="w-100" onClick={this.handleSubmit}>
								Sign in
							</Button>
						</Col>
					</Form.Group>
				</Form>
			</div>
		);
	}
}
