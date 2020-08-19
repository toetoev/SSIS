import { Button, Form, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export const Disbursement = () => {
	const [form] = Form.useForm();
	const [dataSource, setDataSource] = useState([]);

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
			key: "action",
			render: (text) => <DisburseModal text={text} />,
		},
	];
	// TODO: call RequisitionController Get Requisition By Status, then set to table
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition/PROCESSING_RETRIEVAL", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				console.log(result);	
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, requisition) => {
							return [
								...rows,
								{
									key: requisition.id,
									//retrievedItem: requisitionItem.item.actual,
									//amountRetrieved:requisitionItem.actual,
									action: requisition,
								},
							];
						}, [])
					);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};
// TODO: Modal display: add props for passing detailed data into component, then set to the field
const DisburseModal = ({text}) => {
	const requisition = text.action;
	console.log(requisition);
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					//department: requisitionItem.name,
					//requestedBy: requisitionItem.requestedBy.name,
					//requestedDate: requisitionItem.requestedOn,
					neededAmount:requisitionItem.need,
					actualAmount: requisitionItem.actual,
				},
			];
		}, [])
	);

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
					dataSource ={dataSource}
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
