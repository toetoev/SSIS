import { Button, Col, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useState } from "react";

export default function SubmitRequisition() {
	const columns = [
		{
			title: "Product Description",
			dataIndex: "description",
		},
		{
			title: "Unit of Measure",
			dataIndex: "uom",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<Space>
					<Button type="danger">Delete</Button>
				</Space>
			),
		},
	];

	const dataSource = [
		{
			description: "Pencil 2B",
			uom: "Box of 10",
			quantity: "5",
		},
	];

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Submit Requisition</h3>
			<Row justify="space-between">
				<Col>
					<Space>
						<Button type="primary">Stapler</Button>
						<Button type="primary">Tray</Button>
						<Button type="primary">Clip</Button>
					</Space>
				</Col>
				<Row>
					<Add />
					<Submit />
				</Row>
			</Row>
			<Table columns={columns} dataSource={dataSource} />
		</Space>
	);
}
const Add = () => {
	const { Option } = Select;
	const [visible, setVisible] = useState(false);
	const showModal = () => {
		setVisible(true);
	};

	const handleOk = (e) => {
		setVisible(false);
	};

	const handleCancel = (e) => {
		setVisible(false);
	};
	const handleChange = () => {
		console.log("handle change");
	};
	const handleSubmit = () => {};
	return (
		<>
			<Button type="secondary" onClick={showModal}>
				Add
			</Button>
			<Modal
				title="Stationery Catalogue"
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						Submit
					</Button>,
				]}
			>
				<Form layout="vertical" onSubmit={handleSubmit}>
					<Form.Item label="Item Description : ">
						<Select
							style={{ width: "100%" }}
							defaultValue="blue"
							onChange={handleChange}
						>
							<Option value="blue">Highlighter Blue</Option>
							<Option value="red">Highlighter Red</Option>
						</Select>
					</Form.Item>

					<Form.Item label="Quantity : ">
						<Input type="number" placeholder="0" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const Submit = () => {
	const { Option } = Select;
	const [visible, setVisible] = useState(false);

	const handleChange = () => {
		console.log("handle change");
	};
	const handleSubmit = () => {};
	return (
		<>
			<Button type="primary">
				{/* Add onClick() */}
				Submit
			</Button>
		</>
	);
};
