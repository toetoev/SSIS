import { Button, InputNumber, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import sorter from "../../../../../util/sorter";

// IMPROVE: search bar
export const Disbursement = ({ loading, setLoading }) => {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Retrieved Item",
			dataIndex: "retrievedItem",
			sorter: (a, b) => sorter(a.retrievedItem, b.retrievedItem),
		},
		{
			title: "Amount Retrieved",
			dataIndex: "amountRetrieved",
			sorter: (a, b) => sorter(a.amountRetrieved, b.amountRetrieved),
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <DisburseModal text={text} setLoading={setLoading} />,
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
				console.log("Disbursement -> result", result);
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
const DisburseModal = ({ text, setLoading }) => {
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
	const handleConfirm = (e) => {
		let data = [];
		dataSource.forEach((item) => {
			if (item.actualAmount != -1)
				data = [
					...data,
					{
						requisitionId: item.key.split(" ")[0],
						itemId: item.key.split(" ")[1],
						actual: item.actualAmount,
					},
				];
		});
		if (data.length === dataSource.length) {
			axios
				.put("https://localhost:5001/api/requisitionItem/", data, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
						"Content-type": "application/json",
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) setLoading(true);
					else Error(result.message);
				});
			setVisible(false);
		} else Error("Please enter disbursed quantity for all the items");
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
				console.log("DisburseModal -> result", result);
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, requisition) => {
							return [
								...rows,
								{
									key: `${requisition.id} ${requisition.requisitionItems[0].itemId}`,
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
				footer={[
					<Button key="cancel" type="secondary" onClick={hideModal}>
						Cancel
					</Button>,
					<Button key="confirm" type="primary" onClick={handleConfirm}>
						Confirm
					</Button>,
				]}
				width="700px"
			>
				<Table
					dataSource={dataSource}
					columns={columns}
					pagination={false}
					scroll={{ y: 400 }}
					size="small"
				/>
			</Modal>
		</div>
	);
};
