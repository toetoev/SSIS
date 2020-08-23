import { Button, Col, Descriptions, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../component/Confirm";
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
			render: (text) => <AdjustmentDetailsModal text={text} />,
		},
	];

	// TODO: call get all adjustment (test after create adjustment)
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
					</Space>
				</Col>
			</Row>
			<Table columns={columns} dataSource={dataSource} size="middle" />
			<Row justify="end">
				<CreateAdjustmentVoucher dataSource={dataSource} />
			</Row>
		</Space>
	);
}

const AdjustmentDetailsModal = ({ text }) => {
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
	// TODO: call delete adjustment
	const handleDelete = () => {};
	return (
		<div>
			<Space>
				<Button onClick={showModal}>View</Button>
				<Button type="danger" onClick={handleDelete}>
					Delete
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
					<Descriptions.Item label="Issued On">{stocks.issuedOn}</Descriptions.Item>
				</Descriptions>
				<Table columns={columns} dataSource={dataSource} pagination={false} size="small" />
			</Modal>
		</div>
	);
};

const CreateAdjustmentVoucher = () => {
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Item Description",
			dataIndex: "description",
		},
		{
			title: "Quantity Adjusted",
			dataIndex: "adjustedQty",
		},
		{
			title: "Adjust Reason",
			dataIndex: "reason",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => (
				<Space>
					<DeleteAdjustmentItem
						dataSource={dataSource}
						handleDataChange={handleDataChange}
						text={text}
					></DeleteAdjustmentItem>
				</Space>
			),
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	// TODO: create adjustment post List<AdjustmentItem> itemId, adjustedQty, reason
	const handleSubmit = () => {};

	const handleCancel = (e) => {
		setVisible(false);
	};
	const handleDataChange = (data) => {
		setDataSource(data);
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Create Adjustment Voucher
			</Button>
			<Modal
				title="Create Adjustment Voucher"
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
				<Space direction="vertical" style={{ width: "100%" }}>
					<Row justify="end">
						<Space>
							<ClearAdjustmentItems
								dataSource={dataSource}
								handleDataChange={handleDataChange}
							></ClearAdjustmentItems>
							<AddAdjustmentItem
								dataSource={dataSource}
								handleDataChange={handleDataChange}
							/>
						</Space>
					</Row>
					<Table
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						size="middle"
					/>
				</Space>
			</Modal>
		</>
	);
};

const AddAdjustmentItem = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [item, setItem] = useState("");
	const [adjustedQty, setAdjustedQty] = useState(0);
	const [reason, setReason] = useState("");
	const [visible, setVisible] = useState(false);
	const [itemOptions, setItemOptions] = useState([]);
	const showModal = () => {
		setVisible(true);
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
						result.data.reduce((options, item) => {
							return [...options, { label: item.description, value: item.id }];
						}, [])
					);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const handleSubmit = () => {};

	const handleCancel = (e) => {
		setVisible(false);
	};

	const onValuesChange = (val) => {
		if (val.adjustedQty) setAdjustedQty(Number(val.adjustedQty));
		if (val.item) setItem(val.item);
		if (val.reason) setReason(val.reason);
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add
			</Button>
			<Modal
				title="Add Adjustment Item"
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
				<Form form={form} layout="vertical" onValuesChange={onValuesChange}>
					<Form.Item
						name="item"
						label="Item Description : "
						rules={[{ required: true, message: "Please choose one item" }]}
					>
						<Select options={itemOptions} style={{ width: "100%" }}></Select>
					</Form.Item>
					<Form.Item
						name="adjustedQty"
						label="Quantity Adjusted: "
						rules={[
							{
								required: true,
								type: "number",
								transform: (val) => Number(val),
								message: "Please input a number",
							},
						]}
					>
						<Input type="number" placeholder="0" />
					</Form.Item>
					<Form.Item
						name="reason"
						label="Adjust Reason : "
						rules={[
							{ required: true, message: "Please record the reason for adjustment" },
						]}
					>
						<Input type="text" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const DeleteAdjustmentItem = ({ dataSource, handleDataChange, text }) => {
	const handleDelete = () => {
		Confirm("Are you sure delete the item?", "", () =>
			handleDataChange(dataSource.filter((val) => val.key !== text.key))
		);
	};
	return (
		<Button type="danger" onClick={handleDelete}>
			Delete
		</Button>
	);
};

const ClearAdjustmentItems = ({ dataSource, handleDataChange }) => {
	const handleClick = () => {
		if (dataSource.length > 0)
			Confirm("Are you sure clear all items?", "", () => handleDataChange([]));
	};
	return (
		<Button type="danger" onClick={handleClick}>
			Clear
		</Button>
	);
};
