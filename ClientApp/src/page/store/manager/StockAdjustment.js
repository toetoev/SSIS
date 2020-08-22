import { Button, Col, Input, Modal, Row, Space, Table, Descriptions } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function StockAdjustment() {
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
			title: "Authorized By",
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

	const { Search } = Input;
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
		</Space>
	);
}

const StockAdjustmentModal = ({text}) => {
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

				<Table columns={columns} dataSource={dataSource} size="small" pagination={false}/>

				<Row>
					<Col
						span={24}
						style={{
							textAlign: "right",
						}}
					>
						<Space>
							<Button type="danger">
								<a>Reject</a>
							</Button>
							<Button type="primary">
								<a>Issue</a>
							</Button>
						</Space>
					</Col>
				</Row>
			</Modal>
		</div>
	);
};
