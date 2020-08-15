import { Button, Checkbox, Col, Form, Input, Row, Select, Table } from "antd";
import React, { useState } from "react";

export default function AcknowledgeRequisition() {
	const [state, setState] = useState({
		columns: [
			{
				title: "No",
				dataIndex: "no",
			},
			{
				title: "Catalogue Item Code",
				dataIndex: "id",
			},
			{
				title: "Description",
				dataIndex: "description",
			},
			{
				title: "Requested Quantity",
				dataIndex: "requested",
			},
			{
				title: "Received Quantity",
				dataIndex: "received",
			},
			{
				title: "Unfulfilled Quantity",
				dataIndex: "unfulfilled",
			},
		],
	});

	let data = [
		{
			no: "0",
			id: "A001",
			description: "Clips Double 2",
			requested: "30",
			received: "10",
			unfulfilled: "20",
		},
	];

	const columns = state.columns.map((col, index) => ({
		...col,
	}));

	const { Option } = Select;

	return (
		<div className="col-lg-10 mt-3">
			<h4>Requisition History for Department of Registrar</h4>
			<Form className="mt-5">
				<Row>
					<Col span={4}>
						<Form.Item label="Requested Date : "></Form.Item>
					</Col>
					<Col span={8}>
						<Input />
					</Col>
				</Row>
				<Row>
					<Col span={4}>
						<Form.Item label="Approved By : "></Form.Item>
					</Col>
					<Col span={8}>
						<Input />
					</Col>
				</Row>
				<Row>
					<Col span={4}>
						<Form.Item label="Approved Date :"></Form.Item>
					</Col>
					<Col span={8}>
						<Input />
					</Col>
				</Row>
				<Row>
					<Col span={4}>
						<Form.Item label="Collection Date : "></Form.Item>
					</Col>
					<Col span={8}>
						<Input />
					</Col>
				</Row>
				<Row>
					<Col span={4}>
						<Form.Item label="Collection Point : "></Form.Item>
					</Col>
					<Col span={8}>
						<Input />
					</Col>
				</Row>
				<Row>
					<Col span={4}>
						<Form.Item label="Requested Items :"></Form.Item>
					</Col>
				</Row>
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					striped
					bordered
					hover
				/>
				<Row className="mt-3">Do you want to re-order the unfulfilled items?</Row>
				<Row className="mt-3">
					<Checkbox.Group>
						<Checkbox value={1}>Yes</Checkbox>
						<Checkbox value={2}>No</Checkbox>
					</Checkbox.Group>
				</Row>
				<Row className="mt-3">Do acknowledge when you receive the stationeries?</Row>
				<Row className="mt-4 mb-4">
					<Button type="button" className="btn btn-danger mr-3">
						Cancel
					</Button>
					<Button type="button" className="btn btn-success">
						Acknowledge
					</Button>
				</Row>
			</Form>
		</div>
	);
}
