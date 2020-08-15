import { Button, Form, Radio, Select, Space } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function MaintainDept() {
	const radioStyle = {
		display: "block",
		height: "30px",
		lineHeight: "30px",
	};
	const layout = {
		labelCol: { span: 3 },
	};
	const tailLayout = {
		wrapperCol: { offset: 7 },
	};

	const { Option } = Select;
	const handleChange = () => {
		console.log("handle change");
	};
	const handleSubmit = () => {};

	const [collectionPoint, setCollectionPoint] = useState("");
	const [deptRep, setDeptRep] = useState("");

	useEffect(() => {
		// fetch initial value for collectionPoint and deptRep
		axios
			.get("https://localhost:5001/api/dept", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					console.log(result.data);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		// TODO: change the layout
		<Space direction="vertical" style={{ minWidth: 500 }}>
			<h3>Maintain Department</h3>
			<Form {...layout} onSubmit={handleSubmit}>
				<Form.Item name="radio-group" label="Collection Point:" labelAlign="left">
					<Radio.Group>
						<Radio style={radioStyle} value="DEPARTMENT1">
							Stationery Store - Administration Building (9:30 AM)
						</Radio>
						<Radio style={radioStyle} value="DEPARTMENT2">
							Management School (11:00 AM)
						</Radio>
						<Radio style={radioStyle} value="DEPARTMENT3">
							Medical School (9:30 AM)
						</Radio>
						<Radio style={radioStyle} value="DEPARTMENT4">
							Engineering School (9:30 AM)
						</Radio>
						<Radio style={radioStyle} value="DEPARTMENT5">
							Science School (9:30 AM)
						</Radio>
						<Radio style={radioStyle} value="DEPARTMENT6">
							University Hospital (11:00 AM)
						</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="New Representative:" labelAlign="left">
					<Select
						defaultValue="Martini Zhao"
						onChange={handleChange}
						style={{ width: "24%" }}
					>
						<Option value="jack">Jack</Option>
						<Option value="lucy">Lucy</Option>
						<Option value="Yiminghe">Yiminghe</Option>
					</Select>
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
