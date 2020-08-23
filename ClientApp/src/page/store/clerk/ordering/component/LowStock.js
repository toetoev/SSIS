import { Button, Descriptions, InputNumber, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";

import Error from "../../../../component/Error";
import Success from "../../../../component/Success";
import axios from "axios";
import useSearch from "../../../../../hook/useSearch";

export const LowStock = ({ loading, setLoading, keyword }) => {
	const [dataSource, setDataSource] = useState([]);
	const [backupData, setBackupData] = useState([]);
	const options = {
		keys: ["category", "description", "uoM"],
	};
	useSearch({ keyword, options, dataSource, setDataSource, backupData, setBackupData });
	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			sorter: (a, b) => a.categoryName - b.categoryName,
		},
		{
			title: "Bin",
			dataIndex: "bin",
			sorter: (a, b) => a.categoryName - b.categoryName,
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description - b.description,
		},
		{
			title: "UoM",
			dataIndex: "uoM",
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			sorter: true,
		},
		{
			title: "Reorder Quantity",
			dataIndex: "reorderQty",
			sorter: true,
		},
		{
			title: "Stock",
			dataIndex: "stock",
			sorter: true,
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <LowStockModal text={text} setLoading={setLoading} />,
		},
	];
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item/low-stock", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, items) => {
							return [
								...rows,
								{
									key: items.id,
									category: items.categoryName,
									bin: items.bin,
									description: items.description,
									uoM: items.uoM,
									reorderLevel: items.reorderLevel,
									reorderQty: items.reorderQty,
									stock: items.stock,
									action: items,
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
			loading={loading}
			dataSource={dataSource}
			scroll={{ y: 400 }}
			size="small"
		/>
	);
};

const LowStockModal = ({ text, setLoading }) => {
	const items = text.action;
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const onChange = (val, row) => {
		const newData = [...dataSource];
		const index = dataSource.findIndex((item) => row.key === item.key);
		newData[index].orderedQty = val;
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		setDataSource(newData);
	};
	useEffect(() => {
		setDataSource(
			items.supplierTenderItems.reduce(
				(items, item) => [
					...items,
					{
						key: item.supplierId,
						supplierName: item.supplier === null ? "" : item.supplier.name,
						orderedQty: 0,
						priority: item.priority,
					},
				],
				[]
			)
		);
	}, []);

	const columns = [
		{
			title: "Supplier Name",
			dataIndex: "supplierName",
		},
		{
			title: "Order Priority",
			dataIndex: "priority",
		},
		{
			title: "Order Quantity",
			dataIndex: "orderedQty",
			render: (text, record) => (
				<InputNumber
					min={0}
					max={record.reorderQty}
					defaultValue={0}
					onChange={(val) => onChange(val, record)}
				/>
			),
		},
		{
			title: "View Supplier Details",
			dataIndex: "details",
			key: "details",
			render: () => <Details />,
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	const handleSubmit = () => {
		if (dataSource.reduce((acc, item) => acc + item.orderedQty, 0) !== text.reorderQty)
			Error("Order quantities added up together should be reorder quantity");
		else {
			let data = [];
			dataSource.forEach((el) => {
				if (el.orderedQty !== Number(0)) {
					data.push({
						supplierId: el.key,
						orderItems: [
							{
								itemId: text.key,
								orderedQty: el.orderedQty,
							},
						],
					});
				}
			});
			console.log(dataSource);
			console.log(data);
			axios
				.post("https://localhost:5001/api/order", data, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
						"Content-type": "application/json",
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						Success("Order placed successfully");
					} else {
						Error(result.message);
					}
					setLoading(true);
				});
			setVisible(false);
		}
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Order
			</Button>
			<Modal
				title="Tender Order"
				visible={visible}
				onCancel={hideModal}
				footer={[
					<Button key="cancel" onClick={hideModal}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Descriptions>
					<Descriptions.Item label="Reorder Quantity">
						{text.reorderQty}
					</Descriptions.Item>
				</Descriptions>
				<Table columns={columns} dataSource={dataSource} pagination={false} size="small" />
			</Modal>
		</>
	);
};

// TODO: pass supplier info from LowStockModal into details, then set to Descriptions
const Details = () => {
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);

	const columns = [
		{
			title: "Item Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Unit Of Measurement",
			dataIndex: "uom",
			key: "uom",
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	// TODO: call GetSupplierTenderItemBySupplierId (Backend not done yet)
	useEffect(() => {
		// axios
		// 	.get("https://localhost:5001/api/item")
		// 	.then((res) => {
		// 		const result = res.data;
		// 		if (result.success) {
		// 		}
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
	}, []);

	return (
		<>
			<Button onClick={showModal}>View</Button>
			<Modal
				title="Stationery Details"
				visible={visible}
				onCancel={hideModal}
				footer={[
					<Button key="back" onClick={hideModal}>
						Back
					</Button>,
				]}
			>
				<Descriptions>
					<Descriptions.Item label="Supplier Name"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Contact Name"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Phone No"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Fax No"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="GST Registration No"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Address"></Descriptions.Item>
				</Descriptions>

				<Table
					title={() => "Items : "}
					columns={columns}
					dataSource={dataSource}
					pagination={false}
					size="small"
				/>
			</Modal>
		</>
	);
};
