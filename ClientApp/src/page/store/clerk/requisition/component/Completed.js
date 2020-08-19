import { Button, Form, Modal, Table } from "antd";
import React, { useState } from "react";

export const Completed = () => {
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
			render: () => <CompletedModal />,
		},
	];

	return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

const CompletedModal = () => {
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
	const showModal = () => {
		setVisible(true);
	};
	const hideModal = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Button type="danger">Delete</Button>
			<Modal title="Disbursement List" visible={visible} onCancel={hideModal} footer={null}>
				<Table
					dataSource={itemData}
					columns={reqColumns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
			</Modal>
		</div>
	);
};
