import { Button, Descriptions, InputNumber, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSearch from "../../../../../hook/useSearch";
import sorter from "../../../../../util/sorter";
import Error from "../../../../component/Error";
import Success from "../../../../component/Success";

export const LowStock = ({ loading, setLoading, keyword }) => {
	const options = {
		keys: ["category", "description", "uoM"],
	};
	const [dataSource, setDataSource] = useSearch({ keyword, options });

	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			sorter: (a, b) => sorter(a.category, b.category),
		},
		{
			title: "Bin",
			dataIndex: "bin",
			sorter: (a, b) => sorter(a.bin, b.bin),
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => sorter(a.description, b.description),
		},
		{
			title: "UoM",
			dataIndex: "uoM",
			sorter: (a, b) => sorter(a.uoM, b.uoM),
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			sorter: (a, b) => sorter(a.reorderLevel, b.reorderLevel),
		},
		{
			title: "Reorder Quantity",
			dataIndex: "reorderQty",
			sorter: (a, b) => sorter(a.reorderQty, b.reorderQty),
		},
		{
			title: "Stock",
			dataIndex: "stock",
			sorter: (a, b) => sorter(a.stock, b.stock),
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
						action: item,
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
			key: "action",
			render: (text) => <SupplierDetails text={text} />,
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

const SupplierDetails = ({ text }) => {
	const supplier = text.action;
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Item Description",
			dataIndex: "description",
		},
		{
			title: "Price",
			dataIndex: "price",
		},
		{
			title: "Unit Of Measurement",
			dataIndex: "uoM",
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal title="Stationery Details" visible={visible} onCancel={hideModal} footer={null}>
				<Descriptions>
					<Descriptions.Item label="Supplier Name">
						{supplier.supplier.name}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Contact Name">
						{supplier.supplier.contactName}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Phone No">
						{supplier.supplier.phone}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Fax No">{supplier.supplier.fax}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="GST Registration No">
						{supplier.supplier.gst}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Address">
						{supplier.supplier.address}
					</Descriptions.Item>
				</Descriptions>
			</Modal>
		</>
	);
};
