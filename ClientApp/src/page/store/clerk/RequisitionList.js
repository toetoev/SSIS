import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, InputNumber, Checkbox, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function RequisitionList() {
	//const [dataSource, setDataSource] = useState([]);
	const { Search } = Input;
	const { TabPane } = Tabs;

	const dataSource = [
		{
			key: "1",
			departmentName: "",
			requestedBy: "",
			requestedDate: "",
			collectionPoint: "",
			action: "action",
		},
	];

	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
			key: "departmentName",
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
			key: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			key: "requestedDate",
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
			key: "collectionPoint",
		},
		{
			title: "Details",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Button>View</Button>
			),
		},
		{
			title: "Select",
			dataIndex: "select",
			key: "select",
			render: () => (
				<Checkbox />
			),
		},
	];

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Stock Adjustment</h3>
			<Row
				justify="space-between"
				style={{ float: "right" }}
			>
				<Col>
					<Space>
						<Search
							placeholder="input search text"
							onSearch={value => console.log(value)}
							style={{ width: 200 }}
						/>
						
						<Button type="primary">Add</Button>
					</Space>
				</Col>
			</Row>

			<Tabs defaultActiveKey="To-Do" type="card">
				<TabPane tab="To-Do" key="To-Do">
					<Table
						columns={columns}
						dataSource={dataSource}
					/>
				</TabPane>
				<TabPane tab="Retrieval" key="Retrieval">
					<Retrieval />
				</TabPane>
				<TabPane tab="Disbursement" key="Disbursement">
				</TabPane>
				<TabPane tab="Ready for Delivery" key="RFD">
				</TabPane>
				<TabPane tab="Completed" key="Completed">
				</TabPane>
			</Tabs>
		</Space>
	);
}

const Retrieval = () => {
	const [form] = Form.useForm();

	const dataSource = [
		{
			key: "1",
			processedBy: "Meka",
			createdOn: "18-8-2020",
		},
	];

	const columns = [
		{
			title: "Processed By",
			dataIndex: "processedBy",
			key: "processedBy",
		},
		{
			title: "Created On",
			dataIndex: "createdOn",
			key: "createdOn",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<Button>
						<a>View</a>
					</Button>
					<Button type="danger">
						<a>Delete</a>
					</Button>
				</Space>
			),
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item")
			.then((res) => {
				const result = res.data;
				if (result.success) {

				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={false}
			/>
		</>
	);
};