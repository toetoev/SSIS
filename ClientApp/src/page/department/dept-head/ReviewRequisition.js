import { Button, Form, Modal, Space, Table } from "antd";
import React, { useState } from "react";

export default function ReviewRequisition() {
	const dataSource = [];
	for (let i = 0; i < 100; i++) {
		dataSource.push({
			key: i,
			requestedBy: `Edward King ${i}`,
			requestedDate: "25 August 1998",
			status: "Applied",
		});
	}

	const columns = [
		{
			title: "Requested By",
			dataIndex: "requestedBy",
			key: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			key: "requestedDate",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Action",
			key: "action",
			render: ViewRequisition,
		},
	];

	return (
		<Space direction="vertical">
			<h3>Review Requisitions</h3>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
			/>
		</Space>
	);
}
const ViewRequisition = () => {
	const itemData = [];
	for (let i = 0; i < 5; i++) {
		itemData.push({
			key: i,
			itemDescription: `Pencil ${i}B`,
			qty: `${i}`,
		});
	}

	const reqColumns = [
		{
			title: "Item Description",
			dataIndex: "itemDescription",
			key: "itemDescription",
		},
		{
			title: "Quantity",
			dataIndex: "qty",
			key: "qty",
		},
	];
	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState("REJECTED");
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = (e) => {
		setVisible(false);
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
				title="View Requisition"
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={
					status === "APPLIED"
						? [
								<Button key="reject" type="danger" onClick={handleCancel}>
									Reject
								</Button>,
								<Button key="approve" type="primary" onClick={handleOk}>
									Approve
								</Button>,
						  ]
						: null
				}
			>
				<Form>
					<Form.Item label="Requested by:">
						<span className="ant-form-text"></span>
					</Form.Item>
					<Form.Item label="Requested date:">
						<span className="ant-form-text"></span>
					</Form.Item>
					<Table dataSource={itemData} columns={reqColumns} scroll={{ y: 100 }} />
					{status === "APPROVED" ? (
						<>
							<Form.Item label="Approved by:">
								<span className="ant-form-text"></span>
							</Form.Item>
							<Form.Item label="Approved date:">
								<span className="ant-form-text"></span>
							</Form.Item>
						</>
					) : null}
					{status === "REJECTED" ? (
						<>
							<Form.Item label="Rejected by:">
								<span className="ant-form-text"></span>
							</Form.Item>
							<Form.Item label="Rejected date:">
								<span className="ant-form-text"></span>
							</Form.Item>
							<Form.Item label="Rejected reason:">
								<span className="ant-form-text"></span>
							</Form.Item>
						</>
					) : null}
				</Form>
			</Modal>
		</div>
	);
};
