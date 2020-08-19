import { Button, Form, Modal, Table } from "antd";
import React, { useState } from "react";
export const ReadyForDeliveryModal = () => {
	const itemData = [];
	const reqColumns = [
		{
			title: "Stationary Description",
			dataIndex: "bin",
		},
		{
			title: "UoM",
			dataIndex: "itemDescription",
		},
		{
			title: "Amount Needed",
			dataIndex: "needed",
		},
		{
			title: "Actual Amount",
			dataIndex: "actual",
		},
	];

	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState("");
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
			<Button type="danger">Delete</Button>
			<Modal
				title="Disbursement List"
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Table
					dataSource={itemData}
					columns={reqColumns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
				<Button type="secondary">Print</Button>
				<Button type="primary">Update</Button>
			</Modal>
		</div>
	);
};

export const ReadyForDelivery = () => {
	const [form] = Form.useForm();

	const dataSource = [];

	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
		},
		{
			title: "Collection Date",
			dataIndex: "collectionDate",
		},
		{
			title: "Disbursement List",
			dataIndex: "action",
			key: "action",
			render: () => <ReadyForDeliveryModal />,
		},
	];

	return (
		<>
			<Table columns={columns} dataSource={dataSource} pagination={false} />
		</>
	);
};
