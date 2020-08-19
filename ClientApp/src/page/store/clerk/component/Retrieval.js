import { Button, Descriptions, Modal, Space, Table, Form } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";


export const Retrieval = () => {
	const [form] = Form.useForm();

	const dataSource = [
		{
			key: "1",
			processedBy: "Meka",
			createdOn: "18-8-2020",
		},
	];

	const columns = [
		{
			title: "Processed By",
			dataIndex: "processedBy",
			key: "processedBy",
		},
		{
			title: "Created On",
			dataIndex: "createdOn",
			key: "createdOn",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<MaintainRetrieval />
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

const MaintainRetrieval = () => {
	const itemData = [];

	const reqColumns = [
		{
			title: "Bin",
			dataIndex: "bin",
		},
		{
			title: "Item Description",
			dataIndex: "itemDescription",
		},
		{
			title: "Amount Needed",
			dataIndex: "needed",
		},
		{
			title: "Retrieved Amount",
			dataIndex: "retrieved",
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
				title="Requisition Details"
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
				<Button type="secondary">Save</Button>
				<Button type="primary">Confirm</Button>
			</Modal>
		</div>
	);
};
