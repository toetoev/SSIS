import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Space, Table, Descriptions } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function StockAdjustment() {
	const { Search } = Input;
	const [dataSource, setDataSource] = useState([]);

	const columns = [
		{
			title: "Submitted On",
			dataIndex: "submittedOn",
		},
		{
			title: "Submitted By",
			dataIndex: "submittedBy",
		},
		{
			title: "Issued By",
			dataIndex: "authorizedBy",
		},
		{
			title: "Status",
			dataIndex: "status",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <StockAdjustmentModal text={text} />,
		},
	];

	// TODO: call get all adjustment
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/adjustment", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					console.log(result);

					setDataSource(
						result.data.reduce((rows, stocks) => {
							return [
								...rows,
								{
									key: stocks.id,
									submittedOn: stocks.submittedOn,
									submittedBy: stocks.submittedBy.name,
									//authorizedBy: stocks.requestedOn,
									status: stocks.status,
									action: stocks,
								},
							];
						}, [])
					);
				}
			})

			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Stock Adjustment</h3>
			<Row justify="space-between" style={{ float: "right" }}>
				<Col>
					<Space>
						<Search
							placeholder="input search text"
							onSearch={(value) => console.log(value)}
							style={{ width: 200 }}
						/>
						<CreateAdjustmentVoucher dataSource={dataSource} />
					</Space>
				</Col>
			</Row>
			<Table columns={columns} dataSource={dataSource} size="middle" />
		</Space>
	);
}

const StockAdjustmentModal = ({ text }) => {
	const stocks = text.action;
	const [dataSource] = useState(
		stocks.adjustmentItems.reduce((rows, adjustmentItems) => {
			return [
				...rows,
				{
					key: adjustmentItems.adjustmentId,
					category: adjustmentItems.item.categoryName,
					description: adjustmentItems.item.description,
					quantityAdjusted: adjustmentItems.adjustedQty,
					reason: adjustmentItems.reason,
				},
			];
		}, [])
	);

	const columns = [
		{
			title: "Item Category",
			dataIndex: "category",
		},
		{
			title: "Item Description",
			dataIndex: "description",
		},
		{
			title: "Quantity Adjusted",
			dataIndex: "quantityAdjusted",
		},
		{
			title: "Reason",
			dataIndex: "reason",
		},
	];

	const [visible, setVisible] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const hideModal = (e) => {
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
			<Modal title="Adjustment Voucher" visible={visible} onCancel={hideModal} footer={null}>
				<Descriptions>
					<Descriptions.Item label="Submitted By ">
						{stocks.submittedBy.name}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Date Submitted">
						{stocks.submittedOn}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Issued On">
						{stocks.issuedOn}
					</Descriptions.Item>
				</Descriptions>
				<Table columns={columns} dataSource={dataSource} pagination={false} size="small" />
			</Modal>
		</div>
	);
};

const CreateAdjustmentVoucher = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [itemOptions, setItemOptions] = useState([]);

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = () => { };

	const handleCancel = (e) => {
		setVisible(false);
	};

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setItemOptions(
						result.data.reduce(
							(options, itemDescription) => [
								...options,
								{ label: itemDescription.description, value: itemDescription.description },
							],
							[]
						)
					);
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
				Create Adjustment Voucher
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
				<Button 
					style={{float: "right"}}
					type="primary">
					Add More
				</Button>
				
				<Form form={form} layout="vertical">
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item name="itemDescription" label="Item Description : ">
								<Select placeholder="Select Item" options={itemOptions}>
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
// TODO: add Add Item modal
