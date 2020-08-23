import { Button, Col, Descriptions, Input, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Error from "../../component/Error";
import axios from "axios";

export default function StockAdjustment() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
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
			dataIndex: "issuedBy",
		},
		{
			title: "Issued On",
			dataIndex: "issuedOn",
		},
		{
			title: "Status",
			dataIndex: "status",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <StockAdjustmentModal text={text} setLoading={setLoading} />,
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
									issuedBy: stocks.issuedBy === null ? "" : stocks.issuedBy.name,
									issuedOn: stocks.issuedOn,
									status: stocks.status,
									action: stocks,
								},
							];
						}, [])
					);
				}
				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				console.log(error);
			});
	}, [loading]);

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
			<Table columns={columns} dataSource={dataSource} size="middle" loading={loading} />
		</Space>
	);
}

const StockAdjustmentModal = ({ text, setLoading }) => {
	const stocks = text.action;
	console.log(stocks);
	console.log(stocks);
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
	const [status, setStatus] = useState(stocks.status);
	const [visible, setVisible] = useState(false);

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

	const showModal = () => {
		setVisible(true);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};
	const handleReview = (reviewResult) => {
		axios
			.put(`https://localhost:5001/api/adjustment/${stocks.id}`, `"${reviewResult}"`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				console.log(result);
				if (result.success) {
					setLoading(true);
					setStatus(reviewResult);
				} else Error(result.message);
			});
		setVisible(false);
	};
	return (
		<div>
			<Space>
				<Button type="primary" onClick={showModal}>
					Review
				</Button>
			</Space>
			<Modal
				title="Adjustment Voucher"
				visible={visible}
				onCancel={handleCancel}
				footer={
					stocks.status === "APPLIED" ? (
						<Space>
							<Button type="danger" onClick={() => handleReview("REJECTED")}>
								<a>Reject</a>
							</Button>
							<Button type="primary" onClick={() => handleReview("ISSUED")}>
								<a>Issue</a>
							</Button>
						</Space>
					) : null
				}
			>
				<Descriptions>
					<Descriptions.Item label="Submitted By ">
						{stocks.submittedBy.name}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Submitted On">{stocks.submittedOn}</Descriptions.Item>
				</Descriptions>
				{stocks.status === "ISSUED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Issued By">
								{stocks.issuedBy === null ? "" : stocks.issuedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Issued On">
								{stocks.issuedOn}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				<Descriptions>
					<Descriptions.Item label="Adjustment Items"></Descriptions.Item>
				</Descriptions>
				<Table columns={columns} dataSource={dataSource} size="small" pagination={false} />
			</Modal>
		</div>
	);
};
