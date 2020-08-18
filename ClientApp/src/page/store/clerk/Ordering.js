import { Button, Form, Input, InputNumber, Modal, Space, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function Ordering() {
	//const [dataSource, setDataSource] = useState([]);
	const { Search } = Input;
	const { TabPane } = Tabs;

	const dataSource = [
		{
			key: "1",
			category: "Clip",
			description: "Clip...",
			reorderQuantity: "2",
			reorderLevel: "1",
			stock: "1",
			supplier1: "ALPHA",
			supplier2: "BETA",
			supplier3: "GAMA",
			action: "action",
		},
	];

	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			key: "reorderLevel",
		},
		{
			title: "Reorder Quantity",
			dataIndex: "reorderQuantity",
			key: "reorderQuantity",
		},
		{
			title: "Stock",
			dataIndex: "stock",
			key: "stock",
		},
		{
			title: "Supplier 1",
			dataIndex: "supplier1",
			key: "supplier1",
		},
		{
			title: "Supplier 2",
			dataIndex: "supplier2",
			key: "supplier2",
		},
		{
			title: "Supplier 3",
			dataIndex: "supplier3",
			key: "supplier3",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => <Order />,
		},
	];

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Purchase Orders</h3>

			<Search
				placeholder="input search text"
				onSearch={(value) => console.log(value)}
				style={{ width: 200, float: "right" }}
			/>

			<Tabs defaultActiveKey="Low-Stock" type="card">
				<TabPane tab="Low-Stock" key="Low-Stock">
					<Table columns={columns} dataSource={dataSource} />
				</TabPane>
				<TabPane tab="Order" key="Order"></TabPane>
				<TabPane tab="Stocked" key="Stocked"></TabPane>
			</Tabs>
		</Space>
	);
}

const Order = ({ dataSource, handleDataChange }) => {
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

	const handleSubmit = () => {};

	const handleCancel = (e) => {
		setVisible(false);
	};

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

	const { TextArea } = Input;

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Order
			</Button>

			<Modal
				title="Tender Order"
				visible={visible}
				onOk={handleSubmit}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Form form={form} layout="vertical">
					<p>Date : </p>

					<Table columns={columns} dataSource={orderData} pagination={false} />
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

	const handleSubmit = () => {};

	const handleCancel = (e) => {
		setVisible(false);
	};

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
				onOk={handleSubmit}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<p>Supplier Name : ALPHA Office Supplies</p>
				<p>Contact Name : Ms Irene Tan</p>
				<p>Phone No : 85303054</p>
				<p>Fax No : 85303054</p>
				<p>GST Registration No : MR-8500440-2</p>
				<p>Address : Blk 1128, #02-1108 Ang Mo Kio Street 62Singapore 622262</p>

				<Table
					title={() => "Items : "}
					columns={columns}
					dataSource={dataSource}
					pagination={false}
				/>
			</Modal>
		</>
	);
};
