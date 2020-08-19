import { Button, Form, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export const Disbursement = () => {
	const [form] = Form.useForm();

	const dataSource = [];

	const columns = [
		{
			title: "Retrieved Item",
			dataIndex: "retrievedItem",
		},
		{
			title: "Amount Retrieved",
			dataIndex: "amountRetrieved",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<DisburseModal />
				</Space>
			),
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item")
			.then((res) => {
				const result = res.data;
				if (result.success) {
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};
const DisburseModal = () => {
	const itemData = [];

	const reqColumns = [
		{
			title: "Department",
			dataIndex: "department",
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
			title: "Needed Amount",
			dataIndex: "neededAmount",
		},
		{
			title: "Actual Amount",
			dataIndex: "actualAmount",
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
				Disburse
			</Button>
			<Modal title="" visible={visible} onCancel={handleCancel} footer={null}>
				<Table
					dataSource={itemData}
					columns={reqColumns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
				<Button type="secondary">Print</Button>
				<Button type="secondary">Save</Button>
				<Button type="primary">Confirm</Button>
			</Modal>
		</div>
	);
};
