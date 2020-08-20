import { Button, Form, Radio, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";

import Error from "./../../component/Error";
import Success from "./../../component/Success";
import axios from "axios";

export default function MaintainDept() {
	const [form] = Form.useForm();
	const [collectionPoint, setCollectionPoint] = useState("");
	const [deptRep, setDeptRep] = useState("");
	const [deptRepOptions, setDeptRepOptions] = useState([]);

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	const radioStyle = {
		display: "block",
		height: "30px",
		lineHeight: "30px",
	};
	const collectionPointOptions = [
		"Stationery Store - Administration Building (9:00 AM)",
		"Management School (11:00 AM)",
		"Management School (11:00 AM)",
		"Engineering School (11:00 AM)",
		"Science School (9:30 AM)",
		"University Hospital (11:00 AM)",
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/dept", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setCollectionPoint(result.data);
					form.setFieldsValue({
						collectionPoint: result.data,
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		axios
			.get("https://localhost:5001/api/deptStaff?roles=DEPTREP&roles=EMPLOYEE", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				console.log(result);
				if (result.success) {
					setDeptRepOptions(
						result.data.reduce(
							(options, deptStaff) => [
								...options,
								{ label: deptStaff.name, value: deptStaff.email },
							],
							[]
						)
					);
					let currentDeptRep = result.data.filter((val) => val.role === "DEPTREP");
					if (currentDeptRep.length === 1) {
						setDeptRep(currentDeptRep[0].email);
						form.setFieldsValue({
							deptRep: currentDeptRep[0].email,
						});
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const onValuesChange = (val) => {
		if (val.collectionPoint) setCollectionPoint(val.collectionPoint);
		if (val.deptRep) setDeptRep(val.deptRep);
	};

	const onFinish = () => {
		axios
			.post("https://localhost:5001/api/dept", `"${collectionPoint}"`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					axios
						.post("https://localhost:5001/api/deptStaff", `"${deptRep}"`, {
							headers: {
								Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
								"Content-type": "application/json",
							},
						})
						.then((res) => {
							const result = res.data;
							if (result.success) {
								Success("Department info update successfully");
							} else {
								Error(result.message);
							}
						});
				} else {
					Error(result.message);
				}
			});
	};
	return (
		<Space direction="vertical" style={{ minWidth: 600 }}>
			<h3>Maintain Department</h3>
			<Form {...layout} form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
				<Form.Item name="collectionPoint" label="Collection Point:" labelAlign="left">
					<Radio.Group>
						{collectionPointOptions.map((val) => (
							<Radio style={radioStyle} value={val}>
								{val}
							</Radio>
						))}
					</Radio.Group>
				</Form.Item>
				<Form.Item name="deptRep" label="New Representative:" labelAlign="left">
					<Select options={deptRepOptions} style={{ width: "100%" }}></Select>
				</Form.Item>
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Row justify="end">
						<Button type="primary" htmlType="submit">
							Update
						</Button>
					</Row>
				</Form.Item>
			</Form>
		</Space>
	);
}
