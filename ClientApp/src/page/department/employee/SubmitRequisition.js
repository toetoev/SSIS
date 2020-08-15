import { Button, Col, Form, Input, Modal, Row, Select, Table } from "antd";
import React, { useState } from "react";

export default function SubmitRequisition() {
	const [state, setState] = useState({
		columns: [
			{
				title: "No",
				dataIndex: "no",
			},
			{
				title: "Product Id",
				dataIndex: "id",
				sorter: (a, b) => a.amount - b.amount,
			},
			{
				title: "Product Name",
				dataIndex: "name",
			},
			{
				title: "Product Price",
				dataIndex: "price",
			},
			{
				title: "Action",
				key: "action",
				render: () => (
					<div>
						<a className="btn btn-warning mr-3">Edit</a>
						<a className="btn btn-danger mr-3">Delete</a>
					</div>
				),
			},
		],
		visible: false,
	});

	let showModal = () => {
		setState({
			...state,
			visible: true,
		});
	};

	let handleOk = (e) => {
		console.log(e);
		setState({
			...state,
			visible: false,
		});
	};

	let handleCancel = (e) => {
		console.log(e);
		setState({
			...state,
			visible: false,
		});
	};

	let data = [
		{
			no: "0",
			id: "A001",
			name: "apple",
			price: "20",
		},
	];

	const columns = state.columns.map((col, index) => ({
		...col,
	}));

	const { Option } = Select;

	return (
		<div className="col-lg-10 mt-3">
			<h4>Submit Requisition</h4>
			<div className="mt-4 mb-4">
				<Button className="btn btn-primary mr-4">Stapler</Button>
				<Button className="btn btn-primary mr-4">Tray</Button>
				<Button className="btn btn-primary">Clip</Button>

				<Button className="btn btn-success float-right" onClick={showModal}>
					Add
				</Button>

				<Modal
					title="Stationery Catalogue"
					visible={state.visible}
					onOk={handleOk}
					onCancel={handleCancel}
					footer={[
						<Button key="back" onClick={handleCancel}>
							Cancel
						</Button>,
						<Button key="submit" type="primary" onClick={handleOk}>
							Submit
						</Button>,
					]}
				>
					<Form>
						<Row>
							<Col span={8}>
								<Form.Item label="Item Description : "></Form.Item>
							</Col>
							<Col span={8}>
								<Select style={{ width: "100%" }} defaultValue="blue">
									<Option value="blue">Highlighter Blue</Option>
									<Option value="red">Highlighter Red</Option>
								</Select>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<Form.Item label="Quantity : "></Form.Item>
							</Col>
							<Col span={8}>
								<Input type="number" placeholder="0" />
							</Col>
						</Row>
					</Form>
				</Modal>
			</div>
			<Table columns={columns} dataSource={data} striped bordered hover />
		</div>
	);
}
