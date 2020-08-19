import { Button, Checkbox, Descriptions, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

export const Todo = () => {
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
	// TODO: call RequisitionController Get Requisition By Status, then set to table
	useEffect(() => {}, []);
	return (
		<Row>
			<Space direction="vertical" style={{ width: "100%" }}>
				<Table columns={columns} dataSource={dataSource} />
				<Row justify="end">
					<CreateRetrieval></CreateRetrieval>
				</Row>
			</Space>
		</Row>
	);
};

const CreateRetrieval = () => {
	return <Button type="primary">Create Retrieval</Button>;
};

// TODO: Modal display: add props for passing detailed data into component, then set to the field
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
	const hideModal = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal title="Requisition Details" visible={visible} onCancel={hideModal} footer={null}>
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
