import { Button, Descriptions, InputNumber, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export const LowStock = ({ loading, setLoading }) => {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			sorter: (a, b) => a.categoryName - b.categoryName,
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			sorter: (a, b) => a.description - b.description,
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			key: "reorderLevel",
			sorter: true,
		},
		{
			title: "Reorder Quantity",
			dataIndex: "reorderQuantity",
			key: "reorderQuantity",
			sorter: true,
		},
		{
			title: "Stock",
			dataIndex: "stock",
			key: "stock",
			sorter: true,
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <LowStockModal text={text} />,
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
				console.log(result);
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
									uom: items.uoM,
									reorderLevel: items.reorderLevel,
									reorderQuantity: items.reorderQty,
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
			pagination={false}
			size="small"
		/>
	);
};

// TODO: from action pass into modal
const LowStockModal = ({ text, setLoading }) => {
	const items = text.action;
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	// TODO: I think LowStock component call should have the data now, you test first, so no call here
	useEffect(() => {
		axios
			.get(`https://localhost:5001/api/supplierTenderItem/${items.id}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					/*setDataSource(
						result.data.reduce((rows, items) => {
							return [
								...rows,
								{
									key: items.id,
									category: items.categoryName,
									bin: items.bin,
									description: items.description,
									uom: items.uoM,
									reorderLevel: items.reorderLevel,
									reorderQuantity: items.reorderQty,
									stock: items.stock,
								},
							];
						}, [])
					);*/
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const columns = [
		{
			title: "Supplier Name",
			dataIndex: "supplierName",
			key: "supplierName",
		},
		{
			title: "Order Quantity",
			dataIndex: "orderQuantity",
			key: "orderQuantity",
			render: () => <InputNumber placeholder="20" />,
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

	// TODO: call createOrder List<Order>
	// [{
	// 	supplierId: "",
	// 	orderItems: [{
	// 		itemId: "",
	// 		orderedQty:
	// 	}]
	// }];
	// check api.http
	const handleSubmit = () => {
		setVisible(true);
		setLoading(true);
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
				<Table columns={columns} pagination={false} size="small" />
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
