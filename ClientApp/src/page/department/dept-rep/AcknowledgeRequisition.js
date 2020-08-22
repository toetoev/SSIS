import { Button, Descriptions, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import toTitleCase from "../../../util/toTitleCase";

// TODO: add search bar
export default function AcknowledgeRequisition() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	// TODO: make sorter work
	const columns = [
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			sorter: true,
		},
		{
			title: "Reviewed By",
			dataIndex: "reviewedBy",
			sorter: true,
		},
		{
			title: "Reviewed Date",
			dataIndex: "reviewedDate",
			sorter: true,
		},
		{
			title: "Acknowledged By",
			dataIndex: "acknowledgedBy",
			sorter: true,
		},
		{
			title: "Acknowledged Date",
			dataIndex: "acknowledgedDate",
			sorter: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			sorter: true,
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <AcknowledgementModal text={text} setLoading={setLoading} />,
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

const AcknowledgementModal = ({ text, setLoading }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, acknowledge) => {
			return [
				...rows,
				{
					key: acknowledge.itemId,
					itemDescription: acknowledge.item.description,
					requestedQty: acknowledge.need,
					receivedQty: acknowledge.actual,
					unfulfilledQty: acknowledge.need - acknowledge.actual,
				},
			];
		}, [])
	);
	const [status] = useState(requisition.status);
	const [visible, setVisible] = useState(false);
	// TODO: conditional render column based on status
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
	const handleAcknowledge = (e) => {
		axios
			.put(`https://localhost:5001/api/requisition/${requisition.id}`, `"DELIVERED"`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) setLoading(true);
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
					status === "PENDING_COLLECTION"
						? [
								<Button key="cancel" type="danger" onClick={hideModal}>
									Cancel
								</Button>,
								<Button
									key="acknowledge"
									type="primary"
									onClick={handleAcknowledge}
								>
									Acknowledge
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
					scroll={{ y: 400 }}
					pagination={false}
					size="small"
				/>
			</Modal>
		</div>
	);
};
