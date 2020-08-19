import { Button, Form, Modal, Row, Space, Table } from "antd";
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
			render: () => <DisburseModal />,
		},
	];
	// TODO: call RequisitionController Get Requisition By Status, then set to table
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
// TODO: Modal display: add props for passing detailed data into component, then set to the field
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
	const showModal = () => {
		setVisible(true);
	};
	const hideModal = (e) => {
		setVisible(false);
	};
	// TODO: call DisburseRequisition
	const handleConfirm = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				Disburse
			</Button>
			<Modal title="" visible={visible} onCancel={hideModal} footer={null}>
				<Table
					dataSource={itemData}
					columns={reqColumns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
				<Row justify="end">
					<Space>
						<Button type="secondary">Print</Button>
						<Button type="primary" onClick={handleConfirm}>
							Confirm
						</Button>
					</Space>
				</Row>
			</Modal>
		</div>
	);
};
