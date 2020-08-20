import { Button, Form, InputNumber, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export const Disbursement = ({ loading, setLoading }) => {
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
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/retrievalItem", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, retrieval) => {
							return [
								...rows,
								{
									key: retrieval.itemId,
									retrievedItem: retrieval.item.description,
									amountRetrieved: retrieval.totalQtyRetrieved,
									action: retrieval,
								},
							];
						}, [])
					);
				}
				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				console.log(error);
			});
	}, [loading]);

	return <Table columns={columns} dataSource={dataSource} pagination={false} size="middle" />;
};
const DisburseModal = ({ text }) => {
	const retrieval = text.action;
	const [visible, setVisible] = useState(false);
	const onChange = (val, row) => {
		const newData = [...dataSource];
		const index = dataSource.findIndex((item) => row.key === item.key);
		newData[index].actualAmount = val;
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		setDataSource(newData);
	};
	const [dataSource, setDataSource] = useState([]);
	const columns = [
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
			render: (text, record) => (
				<InputNumber
					min={1}
					max={record.neededAmount}
					defaultValue={record.actualAmount === -1 ? null : record.actualAmount}
					onChange={(val) => onChange(val, record)}
				/>
			),
		},
	];

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
	useEffect(() => {
		axios
			.get(
				`https://localhost:5001/api/requisition/${retrieval.retrievalId}/requisition-item/${retrieval.itemId}`,
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				}
			)
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, requisition) => {
							return [
								...rows,
								{
									key: requisition.id,
									department: requisition.department.name,
									requestedBy: requisition.requestedBy.name,
									requestedDate: requisition.requestedOn,
									neededAmount: requisition.requisitionItems[0].need,
									actualAmount: requisition.requisitionItems[0].actual,
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
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				Disburse
			</Button>
			<Modal
				title="Disburse among departments"
				visible={visible}
				onCancel={hideModal}
				footer={null}
				width="700px"
			>
				<Space direction="vertical">
					<Row>
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={false}
							scroll={{ y: 100 }}
							size="small"
						/>
					</Row>
					<Row justify="end">
						<Space>
							<Button type="secondary">Print</Button>
							<Button type="primary" onClick={handleConfirm}>
								Confirm
							</Button>
						</Space>
					</Row>
				</Space>
			</Modal>
		</div>
	);
};
