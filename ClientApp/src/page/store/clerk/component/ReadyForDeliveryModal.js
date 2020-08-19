import { Button, Form, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

export default ReadyForDelivery = () => {
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
	// TODO: call RequisitionController Get Requisition By Status, then set to table
	useEffect(() => {}, []);

	return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

// TODO: Modal display: add props for passing detailed data into component, then set to the field
const ReadyForDeliveryModal = () => {
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
	// TODO: call DisburseRequisition
	const handleDisburse = (e) => {
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
				<Row justify="end">
					<Space>
						<Button type="secondary">Print</Button>
						<Button type="primary" onClick={handleDisburse}>
							Update
						</Button>
					</Space>
				</Row>
			</Modal>
		</div>
	);
};
