import { Button, Form, Modal, Space, Table } from "antd";
import React, { useState } from "react";

export default function RequisitionHistory() {
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
			<Modal title="View Requisition" visible={visible} onCancel={handleCancel} footer={null}>
				<Form>
					<Form.Item label="Collection Date:">
						<span className="ant-form-text"></span>
					</Form.Item>
					<Form.Item label="Collection Point:">
						<span className="ant-form-text"></span>
					</Form.Item>
					<Form.Item label="Requested Items:">
						<span className="ant-form-text"></span>
					</Form.Item>
					<Table
						dataSource={requisitionData}
						columns={requisitionColumns}
						scroll={{ y: 100 }}
					/>
					{status == "DELIVERED" ? (
						<>
							<Form.Item label="Delivered by:">
								<span className="ant-form-text"></span>
							</Form.Item>
							<Form.Item label="Delivered date:">
								<span className="ant-form-text"></span>
							</Form.Item>
						</>
					) : null}
				</Form>
			</Modal>
		</div>
	);
};
