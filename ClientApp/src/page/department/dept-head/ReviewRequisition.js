import { Button, Descriptions, Divider, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import sorter from "../../../util/sorter";
import toTitleCase from "../../../util/toTitleCase";
import Error from "../../component/Error";

// IMPROVE: add search bar
export default function ReviewRequisition() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	const columns = [
		{
			title: "Requested By",
			dataIndex: "requestedBy",
			sorter: (a, b) => sorter(a.requestedBy, b.requestedBy),
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			sorter: (a, b) => sorter(a.requestedDate, b.requestedDate),
		},
		{
			title: "Status",
			dataIndex: "status",
			sorter: (a, b) => sorter(a.status, b.status),
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <ReviewRequisitionModal text={text} setLoading={setLoading} />,
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
						result.data.reduce((rows, requisition) => {
							return [
								...rows,
								{
									key: requisition.id,
									requestedBy:
										requisition.requestedBy === null
											? ""
											: requisition.requestedBy.name,
									requestedDate: requisition.requestedOn,
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
			<h3>Review Requisitions</h3>
			<Table
				loading={loading}
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
				size="middle"
			/>
		</Space>
	);
}

const ReviewRequisitionModal = ({ text, setLoading }) => {
	const requisition = text.action;
	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState(requisition.status);
	const [rejectReason, setRejectReason] = useState("");
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					itemDescription: requisitionItem.item.description,
					requestedQty: requisitionItem.need,
					receivedQty:
						status === "PENDING_COLLECTION" || status === "DELIVERED"
							? requisitionItem.actual
							: null,
					unfulfilledQty:
						status === "PENDING_COLLECTION" || status === "DELIVERED"
							? requisitionItem.need - requisitionItem.actual
							: null,
				},
			];
		}, [])
	);

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
	const hideModal = () => {
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
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal
				title="View Requisition"
				visible={visible}
				onCancel={hideModal}
				footer={
					status === "APPLIED"
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
							<Descriptions.Item label="Delivered by:">
								{requisition.acknowledgedBy === null
									? ""
									: requisition.acknowledgedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Delivered date:">
								{requisition.acknowledgedOn}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				<Table
					dataSource={dataSource}
					columns={columns}
					scroll={{ y: 400 }}
					pagination={false}
					size="small"
				/>
				{status === "APPLIED" ? (
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
