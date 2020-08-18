import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, InputNumber } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function StockAdjustment() {
	//const [dataSource, setDataSource] = useState([]);
	const dataSource = [
		{
			key: "1",
			submittedOn: "09-09-2020",
			submittedBy: "09-09-2020",
			authorizedBy: "Meka",
			status: "Applied",
			action: "action",
		},
	];

	const columns = [
		{
			title: "Submitted On",
			dataIndex: "submittedOn",
			key: "submittedOn",
		},
		{
			title: "Submitted By",
			dataIndex: "submittedBy",
			key: "submittedBy",
		},
		{
			title: "Authorized By",
			dataIndex: "authorizedBy",
			key: "authorizedBy",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: AdjustmentVoucher,
		},
	];

	const { Search } = Input;
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
						<Add dataSource={dataSource} />
					</Space>
				</Col>
			</Row>
			<Table
				columns={columns}
				dataSource={dataSource}
			/>
		</Space>
	);
}

const AdjustmentVoucher = () => {
	const dataSource = [
		{
			key: "1",
			category: "File",
			description: "File-Brown w/o Logo",
			quantityAdjusted: "-6",
			reason: "Broken Item",
		},
	];
	const columns = [
		{
			title: "Item Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Item Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Quantity Adjusted",
			dataIndex: "quantityAdjusted",
			key: "quantityAdjusted",
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason",
		},
	];

	const [visible, setVisible] = useState(false);
	//const [status, setStatus] = useState("PENDING_COLLECTION");

	const showModal = () => {
		setVisible(true);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};

	return (
		<div>
			<Space>
				<Button>
					<a onClick={showModal}>View</a>
				</Button>
				<Button type="primary">
					<a>Edit</a>
				</Button>
				<Button type="danger">
					<a>Delete</a>
				</Button>
			</Space>
			<Modal
				title="Adjustment Voucher"
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<p>Submitted By : </p>
				<p>Date Submitted : </p>
				<p>Issued On : </p>

				<Table columns={columns} dataSource={dataSource} pagination={false}/>
			</Modal>
		</div>
	);
};

const Add = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = () => {

	};

	const handleCancel = (e) => {
		setVisible(false);
	};

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

	const { TextArea } = Input;

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add
			</Button>

			<Modal
				title="Create Supplier"
				visible={visible}
				onOk={handleSubmit}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Form
					form={form}
					layout="vertical"
				>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Item Description : ">
								<Select placeholder="Pilot pencil">
									<Select.Option value="demo">Demo</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Quantity Adjusted : ">
								<InputNumber placeholder="0" />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item label="Reason : ">
						<TextArea rows={4} placeholder="Reason..." />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};