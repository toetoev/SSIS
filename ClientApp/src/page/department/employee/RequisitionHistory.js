import { Button, Descriptions, Divider, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import sorter from "../../../util/sorter";
import toTitleCase from "../../../util/toTitleCase";

// IMPROVE: add search bar
export default function RequisitionHistory() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	const columns = [
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			sorter: (a, b) => sorter(a.requestedDate, b.requestedDate),
		},
		{
			title: "Reviewed By",
			dataIndex: "reviewedBy",
			sorter: (a, b) => sorter(a.reviewedBy, b.reviewedBy),
		},
		{
			title: "Reviewed Date",
			dataIndex: "reviewedDate",
			sorter: (a, b) => sorter(a.reviewedDate, b.reviewedDate),
		},
		{
			title: "Acknowledged By",
			dataIndex: "acknowledgedBy",
			sorter: (a, b) => sorter(a.acknowledgedBy, b.acknowledgedBy),
		},
		{
			title: "Acknowledged Date",
			dataIndex: "acknowledgedDate",
			sorter: (a, b) => sorter(a.acknowledgedDate, b.acknowledgedDate),
		},
		{
			title: "Status",
			dataIndex: "status",
			sorter: (a, b) => sorter(a.status, b.status),
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <RequisitionModal text={text} setLoading={setLoading} />,
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((dataSource, requisition) => {
							return [
								...dataSource,
								{
									key: requisition.id,
									requestedDate: requisition.requestedOn,
									reviewedBy:
										requisition.reviewedBy === null
											? ""
											: requisition.reviewedBy.name,
									reviewedDate: requisition.reviewedOn,
									acknowledgedBy:
										requisition.acknowledgedBy === null
											? ""
											: requisition.acknowledgedBy.name,
									acknowledgedDate: requisition.acknowledgedOn,
									status: toTitleCase(requisition.status),
									action: requisition,
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
		<Space direction="vertical">
			<h3>Requisition History</h3>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={false}
				scroll={{ y: 500 }}
				loading={loading}
				size="middle"
			/>
		</Space>
	);
}

const RequisitionModal = ({ text, setLoading }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					itemDescription: requisitionItem.item.description,
					requestedQty: requisitionItem.need,
					receivedQty: requisitionItem.actual === -1 ? null : requisitionItem.actual,
					unfulfilledQty:
						requisitionItem.actual === -1
							? null
							: requisitionItem.need - requisitionItem.actual,
				},
			];
		}, [])
	);
	const [status, setStatus] = useState(requisition.status);
	const [isDelegated, setIsDelegated] = useState(false);
	const [visible, setVisible] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const columns = [
		{
			title: "Item Description",
			dataIndex: "itemDescription",
		},
		{
			title: "Requested Quantity",
			dataIndex: "requestedQty",
		},
		{
			title: "Received Quantity",
			dataIndex: "receivedQty",
		},
		{
			title: "Unfulfilled Quantity",
			dataIndex: "unfulfilledQty",
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	const handleReview = (reviewResult) => {
		var data;
		if (reviewResult === "REJECTED")
			data = {
				status: reviewResult,
				comment: rejectReason,
			};
		else data = { status: reviewResult };
		axios
			.put("https://localhost:5001/api/requisition/" + text.key, data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setLoading(true);
					setStatus(reviewResult);
				} else Error(result.message);
			});
		setVisible(false);
	};
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/delegation", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) setIsDelegated(result.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal
				title="Requisition Details"
				visible={visible}
				onCancel={hideModal}
				footer={
					isDelegated && status === "APPLIED"
						? [
								<Button
									key="reject"
									type="danger"
									onClick={() => handleReview("REJECTED")}
								>
									Reject
								</Button>,
								<Button
									key="approve"
									type="primary"
									onClick={() => handleReview("APPROVED")}
								>
									Approve
								</Button>,
						  ]
						: null
				}
			>
				<Descriptions>
					<Descriptions.Item label="Collection Point">
						{requisition.department.collectionPointId}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Requested By">
						{requisition.requestedBy === null ? "" : requisition.requestedBy.name}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Requested Date">
						{requisition.requestedOn}
					</Descriptions.Item>
				</Descriptions>
				{status === "APPROVED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Approved By">
								{requisition.reviewedBy === null ? "" : requisition.reviewedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Approved Date">
								{requisition.reviewedOn}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				{status === "REJECTED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Rejected By">
								{requisition.reviewedBy === null ? "" : requisition.reviewedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Rejected Date">
								{requisition.reviewedOn}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Rejected Reason">
								{requisition.comment}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				{status === "DELIVERED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Received by">
								{requisition.acknowledgedBy === null
									? ""
									: requisition.acknowledgedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Received date">
								{requisition.acknowledgedOn}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				<Descriptions>
					<Descriptions.Item label="Requested Items"></Descriptions.Item>
				</Descriptions>
				<Table
					dataSource={dataSource}
					columns={columns}
					pagination={false}
					scroll={{ y: 400 }}
					size="small"
				/>
				{isDelegated && status === "APPLIED" ? (
					<>
						<Divider dashed />
						<Input
							placeholder="Reject Reason (Optional)"
							value={rejectReason}
							onChange={(e) => setRejectReason(e.target.value)}
						/>
					</>
				) : null}
			</Modal>
		</div>
	);
};
