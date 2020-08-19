import { Button, Checkbox, Descriptions, Modal, Table } from "antd";
import React, { useState } from "react";

export const Todo = (dataSource) => {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
			key: "departmentName",
		},
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
			title: "Collection Point",
			dataIndex: "collectionPoint",
			key: "collectionPoint",
		},
		{
			title: "Details",
			dataIndex: "action",
			key: "action",
			render: () => <TodoModal />,
		},
		{
			title: "Select",
			dataIndex: "select",
			key: "select",
			render: () => <Checkbox />,
		},
	];

	return <Table columns={columns} dataSource={dataSource} />;
};

const TodoModal = () => {
	const itemData = [];

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
					dataSource={itemData}
					columns={columns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
			</Modal>
		</div>
	);
};
