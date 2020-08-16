import { Button, Form, Radio, Select, Space } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

const { Option } = Select;
export default function MaintainDept() {
	const [collectionPoint, setCollectionPoint] = useState("Management School (11:00 AM)");
	const [deptRep, setDeptRep] = useState("1");

	const layout = {
		labelCol: { span: 3 },
	};
	const tailLayout = {
		wrapperCol: { offset: 7 },
	};
	const collectionPointOptions = [
		{
			label: "Stationery Store - Administration Building (9:30 AM)",
			value: "Stationery Store - Administration Building (9:30 AM)",
		},
		{ label: "Management School (11:00 AM)", value: "Management School (11:00 AM)" },
		{ label: "Medical School (9:30 AM)", value: "Medical School (9:30 AM)" },
		{ label: "Engineering School (9:30 AM)", value: "Engineering School (9:30 AM)" },
		{ label: "Science School (9:30 AM)", value: "Science School (9:30 AM)" },
		{ label: "University Hospital (11:00 AM)", value: "University Hospital (11:00 AM)" },
	];
	const deptRepOptions = [];
	const onValuesChange = (val) => {
		if (val.collectionPoint) setCollectionPoint(val.collectionPoint);
		if (val.deptRep) setDeptRep(val.deptRep);
	};
	const onFinish = () => {
		axios.post("https://localhost:5001/api/dept", {
			collectionPointId: collectionPoint,
		});
		// TODO: call DeptStaffController Update Dept Rep
	};

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/dept", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				console.log(res);
				const result = res.data;
				if (result.success) {
					setCollectionPoint(result.data);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		// TODO: call DeptStaffController Get DeptStaff By Role, set deptRep to be initial value, and employees to be options
	}, []);

	return (
		// TODO: change the layout
		<Space direction="vertical" style={{ minWidth: 500 }}>
			<h3>Maintain Department</h3>
			<Form
				{...layout}
				onFinish={onFinish}
				onValuesChange={onValuesChange}
				initialValues={{ collectionPoint: collectionPoint, deptRep: deptRep }}
			>
				<Form.Item name="collectionPoint" label="Collection Point:" labelAlign="left">
					<Radio.Group options={collectionPointOptions}></Radio.Group>
				</Form.Item>
				<Form.Item name="deptRep" label="New Representative:" labelAlign="left">
					<Select options={deptRepOptions} style={{ width: "24%" }}></Select>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Update
					</Button>
				</Form.Item>
			</Form>
		</Space>
	);
}
