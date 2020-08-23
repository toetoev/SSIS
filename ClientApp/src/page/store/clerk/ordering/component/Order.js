import { Button, Input, InputNumber, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import Confirm from "../../../../component/Confirm";
import Error from "../../../../component/Error";
import axios from "axios";
import toTitleCase from "../../../../../util/toTitleCase";
import useSearch from "../../../../../hook/useSearch";

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
					<OrderModal text={text} setLoading={setLoading} />
					{text.status == "Ordered" ? (
						<Remove text={text} setLoading={setLoading} />
					) : (
						<></>
					)}
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
	}, [loading]);
	return <Table columns={columns} dataSource={dataSource} size="middle" />;
};

const OrderModal = ({ text, setLoading }) => {
	const order = text.action;
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState(
		order.orderItems.reduce((rows, orderItem) => {
			return [
				...rows,
				{
					key: orderItem.itemId,
					description: orderItem.item.description,
					orderedQty: orderItem.orderedQty,
					deliveredQty: orderItem.deliveredQty,
					remarks: "",
				},
			];
		}, [])
	);
	const onChange = (val, row) => {
		const newData = [...dataSource];
		const index = dataSource.findIndex((item) => row.key === item.key);
		newData[index].deliveredQty = val;
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		setDataSource(newData);
	};
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
				text.status === "Ordered"
					? (text, record) => (
							<InputNumber
								min={0}
								max={record.orderedQty}
								onChange={(val) => onChange(val, record)}
							/>
					  )
					: undefined,
		},
		{
			title: "Remarks (Optional)",
			dataIndex: "remarks",
			render:
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

	const handleSubmit = () => {
		let data = [];
		dataSource.forEach((item) => {
			if (item.deliveredQty !== null && item.deliveredQty != -1)
				data = [
					...data,
					{ itemId: item.key, deliveredQty: item.deliveredQty, remarks: item.remarks },
				];
		});
		if (data.length === dataSource.length) {
			axios
				.put("https://localhost:5001/api/order/" + order.id, data, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
						"Content-type": "application/json",
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						setLoading(true);
						setVisible(false);
					} else Error(result.message);
				});
		}
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal
				title="Purchase Orders"
				visible={visible}
				onCancel={hideModal}
				width="700px"
				footer={
					text.status === "Ordered"
						? [
								<Button key="cancel" onClick={hideModal}>
									Cancel
								</Button>,
								<Button key="submit" type="primary" onClick={handleSubmit}>
									Submit
								</Button>,
						  ]
						: null
				}
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

const Remove = ({ text, setLoading }) => {
	const handleDelete = () => {
		Confirm("Are you sure about deleting the order?", "", () => {
			axios
				.delete("https://localhost:5001/api/order/" + text.action.id, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						setLoading(true);
					} else Error(result.message);
				});
		});
	};
	return (
		<Button type="danger" onClick={handleDelete}>
			Remove
		</Button>
	);
};
