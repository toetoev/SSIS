import "./Login.css";

import { Button, Form, Input, Radio } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import DeptRole from "../../constant/DeptRole";
import Error from "../component/Error";
import StoreRole from "../../constant/StoreRole";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
	let history = useHistory();
	const [nameOrEmail, setNameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	const tailLayout = {
		wrapperCol: { span: 24 },
	};
	const handleSubmit = () => {
		axios
			.post("https://localhost:5001/api/auth", {
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
					localStorage.setItem("NAME", result.data.name);
					directToHomePageBasedOnRole();
				} else {
					Error(result.message);
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
			<h3 className="login-box-msg">SSIS - Logic University</h3>
			<Form onFinish={handleSubmit}>
				<Form.Item
					name="nameOrEmail"
					rules={[
						{
							required: true,
							message: "Please input your name or email!",
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						type="text"
						placeholder="Name / Email"
						onChange={(e) => setNameOrEmail(e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					name="role"
					rules={[
						{
							required: true,
							message: "Please choose one role!",
						},
					]}
				>
					<Radio.Group
						onChange={(e) => setRole(e.target.value)}
						value={setRole}
						style={{ width: "100%" }}
					>
						<Radio.Button value={"STORE"} style={{ width: "50%", textAlign: "center" }}>
							Store
						</Radio.Button>
						<Radio.Button
							value={"DEPARTMENT"}
							style={{ width: "50%", textAlign: "center" }}
						>
							Department
						</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
						Sign in
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
