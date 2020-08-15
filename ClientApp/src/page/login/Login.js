import "./Login.css";

import { Button, Form, Input, Radio } from "antd";
import React, { useState } from "react";

import DeptRole from "../../constant/DeptRole";
import StoreRole from "../../constant/StoreRole";
import axios from "axios";
import { useHistory } from "react-router-dom";

// TODO: style the page
export default function Login() {
	let history = useHistory();

	const [nameOrEmail, setNameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

	const handleSubmit = () => {
		axios
			.post("https://localhost:5001/api/auth/login", {
				name: nameOrEmail,
				password: password,
				role: role,
			})
			.then((res) => {
				const result = res.data;
				console.log(result);
				if (result.success) {
					localStorage.setItem("ACCESS_TOKEN", result.data.accessToken);
					localStorage.setItem("ROLE", result.data.role);
					directToHomePageBasedOnRole();
				} else {
					// TODO: show error msg using popup modal
				}
			})
			.catch(function (error) {
				console.log(error);
			});
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
		<div className="login-box-body login-box">
			<p className="login-box-msg">Sign in - Logic University</p>
			{/* TODO: change form layout */}
			<Form onFinish={handleSubmit}>
				<Form.Item
					label="Name / Email: "
					name="nameOrEmail"
					rules={[
						{
							required: true,
							message: "Please input your name or email!",
						},
					]}
				>
					<Input onChange={(e) => setNameOrEmail(e.target.value)} />
				</Form.Item>
				<Form.Item
					label="Password: "
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password onChange={(e) => setPassword(e.target.value)} />
				</Form.Item>
				<Form.Item
					label="Role: "
					name="role"
					rules={[
						{
							required: true,
							message: "Please choose one role!",
						},
					]}
				>
					<Radio.Group onChange={(e) => setRole(e.target.value)} value={setRole}>
						<Radio value={"STORE"}>Store</Radio>
						<Radio value={"DEPARTMENT"}>Department</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Sign in
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
