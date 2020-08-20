import { Button, Descriptions, Form, InputNumber, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const LowStock = () => {
	const [dataSource, setDataSource] = useState([]);
	const handleDataChange = (data) => {
		setDataSource(data);
	};
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
			title: "Supplier 1",
			dataIndex: "supplier1",
			key: "supplier1",
			sorter: true,
		},
		{
			title: "Supplier 2",
			dataIndex: "supplier2",
			key: "supplier2",
			sorter: true,
		},
		{
			title: "Supplier 3",
			dataIndex: "supplier3",
			key: "supplier3",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => <LowStockModal />,
		},
	];
	// TODO: ItemController GetLowStockItems //no supplier info
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
					console.log(result);
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
		<Table
			columns={columns}
			dataSource={dataSource}
			scroll={{ y: 400 }}
			pagination={false}
			size="small"
		/>
	);
};

// TODO: Modal display: add props for passing detailed data into component, then set to the field
const LowStockModal = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const orderData = [
		{
			key: "1",
			supplierName: "ALPHA",
			orderQuantity: "20",
		},
	];

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
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => <Details />,
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	// TODO: call createOrder
	const handleSubmit = () => {};

	const hideModal = (e) => {
		setVisible(false);
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
				<Form form={form} layout="vertical">
					<p>Date : </p>
					<Table
						columns={columns}
						dataSource={orderData}
						pagination={false}
						size="small"
					/>
				</Form>
			</Modal>
		</>
	);
};

const Details = ({ dataSource, handleDataChange }) => {
	const [visible, setVisible] = useState(false);

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

	// TODO: call get supplier by id
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
