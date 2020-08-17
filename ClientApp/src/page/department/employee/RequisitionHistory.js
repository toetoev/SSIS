import { Button, Descriptions, Modal, Space, Table } from "antd";
import React, { useState } from "react";

export default function RequisitionHistory() {
	// TODO: call RequisitionController Get Requisition By Role (Employee will return all history)
	const dataSource = [];
	for (let i = 0; i < 100; i++) {
		dataSource.push({
			key: i,
			requestedDate: `Edward King ${i}`,
			reviewedBy: "Colin",
			reviewedDate: "26/02/1998",
			AcknowledgedBy: "",
			AcknowledgedDate: "",
			status: "PENDING_COLLECTION",
		});
	}

	const columns = [
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			key: "requestedDate",
		},
		{
			title: "Reviewed By",
			dataIndex: "reviewedBy",
			key: "reviewedBy",
		},
		{
			title: "Reviewed Date",
			dataIndex: "reviewedDate",
			key: "reviewedDate",
		},
		{
			title: "Acknowledged By",
			dataIndex: "acknowledgedBy",
			key: "acknowledgedBy",
		},
		{
			title: "Acknowledged Date",
			dataIndex: "acknowledgedDate",
			key: "acknowledgedDate",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Action",
			key: "action",
			render: ViewAcknowledgement,
		},
	];

	return (
		<Space direction="vertical">
			<h3>Requisition History</h3>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
			/>
		</Space>
	);
}

// TODO: add props for passing detailed data into component, then set to the field
const ViewAcknowledgement = () => {
	const requisitionData = [];
	for (let i = 0; i < 5; i++) {
		requisitionData.push({
			key: i,
			itemDescription: `Pencil ${i}B`,
			requestedQty: `${i + 10}`,
			receivedQty: `${i + 10}`,
			unfulfilledQty: "0",
		});
	}

	const requisitionColumns = [
		{
			title: "Item Description",
			dataIndex: "itemDescription",
			key: "itemDescription",
		},
		{
			title: "Requested Quantity",
			dataIndex: "requestedQty",
			key: "requestedQty",
		},
		{
			title: "Received Quantity",
			dataIndex: "receivedQty",
			key: "receivedQty",
		},
		{
			title: "Unfulfilled Quantity",
			dataIndex: "unfulfilledQty",
			key: "unfulfilledQty",
		},
	];

	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState("PENDING_COLLECTION");
	const showModal = () => {
		setVisible(true);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal
				title="Requisition Details"
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Descriptions>
					<Descriptions.Item label="Collection Point">Collection Point</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Requested Items"></Descriptions.Item>
				</Descriptions>
				<Table
					dataSource={requisitionData}
					columns={requisitionColumns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
				{status == "DELIVERED" ? (
					<Descriptions>
						<Descriptions.Item label="Delivered by:"></Descriptions.Item>
						<Descriptions.Item label="Delivered date:"></Descriptions.Item>
					</Descriptions>
				) : null}
			</Modal>
		</div>
	);
};
