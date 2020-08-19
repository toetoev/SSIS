import { Button, Descriptions, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import Error from "../../component/Error";
import axios from "axios";
import toTitleCase from "../../../util/toTitleCase";

export default function ReviewRequisition() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(false);
	const columns = [
		{
			title: "Requested By",
			dataIndex: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
		},
		{
			title: "Status",
			dataIndex: "status",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <ReviewRequisitionModal text={text} />,
		},
	];

	useEffect(() => {
		setLoading(true);
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
					setLoading(false);
				}
			})
			.catch(function (error) {
				setLoading(false);
				console.log(error);
			});
	}, []);

	return (
		<Space direction="vertical">
			<h3>Review Requisitions</h3>
			<Table
				loading={loading}
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
			/>
		</Space>
	);
}

const ReviewRequisitionModal = ({ text }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					itemDescription: requisitionItem.item.description,
					qty: requisitionItem.need,
				},
			];
		}, [])
	);
	const [visible, setVisible] = useState(false);
	const [status] = useState(requisition.status);
	const columns = [
		{
			title: "Item Description",
			dataIndex: "itemDescription",
		},
		{
			title: "Quantity",
			dataIndex: "qty",
		},
	];

	const showModal = () => {
		setVisible(true);
	};
	const hideModal = () => {
		setVisible(false);
	};

	const handleReview = (reviewResult) => {
		axios
			.put("https://localhost:5001/api/requisition/" + text.key, `"${reviewResult}"`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) window.location.reload(false);
				else Error(result.message);
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
				<Table
					dataSource={dataSource}
					columns={columns}
					scroll={{ y: 100 }}
					pagination={false}
				/>
			</Modal>
		</div>
	);
};
