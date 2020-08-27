import { Button, Col, Descriptions, Input, Modal, Row, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import sorter from "../../../util/sorter";

// IMPROVE: search bar
export default function StockAdjustment() {
	const { Search } = Input;
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	const columns = [
		{
			title: "Submitted On",
			dataIndex: "submittedOn",
			sorter: (a, b) => sorter(a.submittedOn, b.submittedOn),
		},
		{
			title: "Submitted By",
			dataIndex: "submittedBy",
			sorter: (a, b) => sorter(a.submittedBy, b.submittedBy),
		},
		{
			title: "Issued By",
			dataIndex: "issuedBy",
			sorter: (a, b) => sorter(a.issuedBy, b.issuedBy),
		},
		{
			title: "Issued On",
			dataIndex: "issuedOn",
			sorter: (a, b) => sorter(a.issuedOn, b.issuedOn),
		},
		{
			title: "Status",
			dataIndex: "status",
			sorter: (a, b) => sorter(a.status, b.status),
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

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<Row justify="space-between">
				<Col>
					<h3>Stock Adjustment</h3>
				</Col>
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
					status === "APPLIED" ? (
						<Space>
							<Button type="danger" onClick={() => handleReview("REJECTED")}>
								Reject
							</Button>
							<Button type="primary" onClick={() => handleReview("ISSUED")}>
								Issue
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
				{status === "ISSUED" ? (
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
				<Table columns={columns} dataSource={dataSource} size="small" pagination={false} />
			</Modal>
		</div>
	);
};
