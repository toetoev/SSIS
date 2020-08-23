import { Button, Input, InputNumber, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import toTitleCase from "../../../../../util/toTitleCase";
import useSearch from "../../../../component/useSearch";

export const Order = ({ loading, setLoading, keyword }) => {
	const [dataSource, setDataSource] = useState([]);
	const [backupData, setBackupData] = useState([]);
	const options = {
		keys: ["supplier", "orderedBy", "orderedOn", "receivedBy", "receivedOn"],
	};
	useSearch({ keyword, options, dataSource, setDataSource, backupData, setBackupData });
	const handleDataChange = (data) => {
		setDataSource(data);
	};
	const columns = [
		{
			title: "Supplier",
			dataIndex: "supplier",
		},
		{
			title: "Ordered By",
			dataIndex: "orderedBy",
		},
		{
			title: "Ordered Date",
			dataIndex: "orderedOn",
		},
		{
			title: "Received By",
			dataIndex: "receivedBy",
		},
		{
			title: "Received Date",
			dataIndex: "receivedOn",
		},
		{
			title: "Status",
			dataIndex: "status",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => (
				<Space>
					<OrderModal text={text} setLoading={setLoading}></OrderModal>
					<Remove text={text}></Remove>
				</Space>
			),
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/order", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, order) => {
							return [
								...rows,
								{
									key: order.id,
									supplier: order.supplier.name,
									orderedBy: order.orderedBy.name,
									orderedOn: order.orderedOn,
									receivedBy:
										order.receivedBy === null ? "" : order.receivedBy.name,
									receivedOn: order.receivedOn,
									status: toTitleCase(order.status),
									action: order,
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
	return <Table columns={columns} dataSource={dataSource} size="middle" />;
};

const OrderModal = ({ text, setLoading }) => {
	const order = text.action;
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
	const [dataSource, setDataSource] = useState(
		order.orderItems.reduce((rows, orderItem) => {
			return [
				...rows,
				{
					key: orderItem.itemId,
					description: orderItem.item.description,
					orderedQty: orderItem.orderedQty,
				},
			];
		}, [])
	);
	const columns = [
		{
			title: "Description",
			dataIndex: "description",
		},
		{
			title: "Ordered Qty",
			dataIndex: "orderedQty",
		},
		{
			title: "Delivered Qty",
			dataIndex: "deliveredQty",
			render:
				// TODO: test received status conditional rendering
				text.status === "Ordered"
					? (text, record) => (
							<InputNumber
								min={0}
								max={record.orderedQty}
								onChange={(val) => onChange(val, record)}
							/>
					  )
					: null,
		},
		{
			title: "Remarks",
			dataIndex: "remarks",
			render:
				// TODO: test received status conditional rendering
				text.status === "Ordered"
					? (text, record) => (
							<Input type="text" onChange={(val) => onChange(val, record)} />
					  )
					: null,
		},
	];
	const showModal = () => {
		setVisible(true);
	};

	// TODO: call receive order
	const handleSubmit = () => {};

	const hideModal = (e) => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Receive
			</Button>
			<Modal
				title="Purchase Orders"
				visible={visible}
				onCancel={hideModal}
				footer={[
					<Button onClick={hideModal}>Cancel</Button>,
					<Button type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Table
					dataSource={dataSource}
					columns={columns}
					pagination={false}
					scroll={{ y: 400 }}
					size="small"
				/>
			</Modal>
		</>
	);
};

const Remove = ({ text }) => {
	// TODO: call delete order
	const handleDelete = () => {};
	return (
		<Button type="danger" onClick={handleDelete}>
			Remove
		</Button>
	);
};
