import { Button, InputNumber, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../../../component/Confirm";
import Error from "../../../../component/Error";
import Success from "../../../../component/Success";
import axios from "axios";
import sorter from "../../../../../util/sorter";
import useSearch from "../../../../../hook/useSearch";

export const Retrieval = ({ loading, setLoading, keyword }) => {
	const options = {
		keys: ["createdBy", "createdOn"],
	};
	const [dataSource, setDataSource] = useSearch({ keyword, options });

	const columns = [
		{
			title: "Created By",
			dataIndex: "createdBy",
			sorter: (a, b) => sorter(a.createdBy, b.createdBy),
		},
		{
			title: "Created On",
			dataIndex: "createdOn",
			sorter: (a, b) => sorter(a.createdOn, b.createdOn),
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <RetrievalModal text={text} setLoading={setLoading} />,
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/retrieval", {
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
									key: retrieval.id,
									createdBy: retrieval.createdBy.name,
									createdOn: retrieval.createdOn,
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

	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			pagination={false}
			loading={loading}
			size="middle"
		/>
	);
};

const RetrievalModal = ({ text, setLoading }) => {
	const retrieval = text.action;
	const [visible, setVisible] = useState(false);
	const onChange = (val, row) => {
		const newData = [...dataSource];
		const index = dataSource.findIndex((item) => row.key === item.key);
		newData[index].retrieved = val;
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		setDataSource(newData);
	};
	const [dataSource, setDataSource] = useState(
		retrieval.retrievalItems.reduce((rows, retrievalItem) => {
			return [
				...rows,
				{
					key: retrievalItem.itemId,
					bin: retrievalItem.item.bin,
					itemDescription: retrievalItem.item.description,
					stock: retrievalItem.item.stock,
					needed: retrievalItem.totalQtyNeeded,
					retrieved: retrievalItem.totalQtyRetrieved,
				},
			];
		}, [])
	);

	const columns = [
		{
			title: "Bin",
			dataIndex: "bin",
		},
		{
			title: "Item Description",
			dataIndex: "itemDescription",
		},
		{
			title: "Item Stock",
			dataIndex: "stock",
		},
		{
			title: "Amount Needed",
			dataIndex: "needed",
		},
		{
			title: "Retrieved Amount",
			dataIndex: "retrieved",
			render: (text, record) => (
				<InputNumber
					min={1}
					max={record.needed}
					defaultValue={record.retrieved === -1 ? null : record.retrieved}
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
	const handleDelete = (e) => {
		Confirm("Are you sure about deleting the retrieval list?", "", () => {
			axios
				.delete("https://localhost:5001/api/retrieval/" + retrieval.id, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						Success("Retrieval list deleted");
						setLoading(true);
					} else Error(result.message);
				});
		});
	};

	const handleConfirm = (e) => {
		let data = [];
		dataSource.forEach((item) => {
			if (item.retrieved !== -1)
				data = [...data, { itemId: item.key, totalQtyRetrieved: item.retrieved }];
		});
		if (data.length === dataSource.length) {
			axios
				.put("https://localhost:5001/api/retrieval/" + retrieval.id, data, {
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
		} else Error("Please enter retrieved quantity for all the items");
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
			<Modal
				title="Requisition Details"
				visible={visible}
				onCancel={hideModal}
				footer={null}
				width="600px"
			>
				<Space direction="vertical">
					<Row>
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={false}
							scroll={{ y: 400 }}
							size="small"
						/>
					</Row>
					<Row justify="end">
						<Button type="primary" onClick={handleConfirm}>
							Confirm
						</Button>
					</Row>
				</Space>
			</Modal>
		</div>
	);
};
