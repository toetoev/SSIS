import { Button, Form, Modal, Row, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";

export const Retrieval = () => {
	const [form] = Form.useForm();
	const [dataSource, setDataSource] = useState([]);

	const columns = [
		{
			title: "Processed By",
			dataIndex: "processedBy",
		},
		{
			title: "Created On",
			dataIndex: "createdOn",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <RetrievalModal text={text}/>,
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition/PROCESSING_RETRIEVAL", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, requisition) => {
							return [
								...rows,
								{
									key: requisition.id,
									//not sure what to put in this
									processedBy: requisition.requestedBy.name,
									createdOn: requisition.requestedOn,
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
const RetrievalModal = ({text}) => {
	const requisition = text.action;
	console.log(requisition);
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					bin: requisitionItem.item.bin,
					itemDescription: requisitionItem.item.description,
					needed: requisitionItem.need,
					//this one should be update
					retrieved : requisitionItem.actual,
				},
			];
		}, [])
	);

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
	const hideModal = (e) => {
		setVisible(false);
	};
	// TODO: call deleteRetrieval
	const handleDelete = (e) => {};

	// TODO: call UpdateRetrievalActualQuantity
	const handleConfirm = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Space>
				<Button type="primary" onClick={showModal}>
					View
				</Button>
				<Button type="danger" onClick={handleDelete}>
					Delete
				</Button>
			</Space>

			<Modal title="Requisition Details" visible={visible} onCancel={hideModal} footer={null}>
				<Table
					dataSource={dataSource}
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
