import { Button, Form, Input, InputNumber, Modal, Select, Space, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../component/Confirm";
import axios from "axios";

export default function StockList() {
	const [dataSource, setDataSource] = useState([
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
			bin: "P39",
			uom: "Box",
		},
	]);
	const { Search } = Input;
	const { TabPane } = Tabs;
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

	const columns1 = [
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
			title: "Reorder Quantity",
			dataIndex: "reorderQuantity",
			key: "reorderQuantity",
		},
		{
			title: "Supplier",
			dataIndex: "supplier1" || "supplier2" || "supplier3",
			key: "supplier",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text) => (
				<Space>
					<Received text={text}></Received>
					<Delete
						dataSource={dataSource}
						handleDataChange={handleDataChange}
						text={text}
					></Delete>
				</Space>
			),
		},
	];

	const columns2 = [
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Bin",
			dataIndex: "bin",
			key: "bin",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "UoM",
			dataIndex: "uom",
			key: "uom",
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
	];

	const handleDataChange = (data) => {
		setDataSource(data);
	};

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Purchase Orders</h3>

			<Tabs defaultActiveKey="Low-Stock" type="card" tabBarExtraContent={<Operations />}>
				<TabPane tab="Low-Stock" key="Low-Stock">
					<Table columns={columns} dataSource={dataSource} />
				</TabPane>
				<TabPane tab="Order" key="Order">
					<Table columns={columns1} dataSource={dataSource} />
				</TabPane>
				<TabPane tab="Stocked" key="Stocked">
					<Table columns={columns2} dataSource={dataSource} />
				</TabPane>
			</Tabs>
		</Space>
	);
}

const Operations = () => {
	const { Search } = Input;
	return (
		<Space>
			<Search
				placeholder="input search text"
				onSearch={(value) => console.log(value)}
				style={{ width: 200 }}
			/>
		</Space>
	);
};

const Delete = ({ dataSource, handleDataChange, text }) => {
	const handleDelete = () => {
		Confirm("Are you sure delete the item?", "", () =>
			handleDataChange(dataSource.filter((val) => val.key !== text.key))
		);
	};
	return (
		<Button type="danger" onClick={handleDelete}>
			Delete
		</Button>
	);
};

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

const Received = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [item, setItem] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [visible, setVisible] = useState(false);
	const [itemOptions, setItemOptions] = useState([]);

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = () => {
		form.validateFields()
			.then((val) => {
				if (dataSource.find((val) => val.key === item)) {
					handleDataChange(
						dataSource.map((val) => {
							if (val.key === item) {
								val.quantity = val.quantity + quantity;
							}
							return val;
						})
					);
				} else {
					handleDataChange([
						...dataSource,
						{
							key: item,
							description: itemOptions.find((val) => val.value === item).label,
							quantity: quantity,
						},
					]);
				}
				setVisible(false);
			})
			.catch((err) => {});
	};

	const handleCancel = (e) => {
		setVisible(false);
	};

	const onValuesChange = (val) => {
		if (val.quantity) setQuantity(Number(val.quantity));
		if (val.item) setItem(val.item);
	};

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item")
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setItemOptions(
						result.data.reduce((options, item) => {
							return [...options, { label: item.description, value: item.id }];
						}, [])
					);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Received
			</Button>
			<Modal
				title="Purchase Orders"
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
				<Form form={form} layout="vertical" onValuesChange={onValuesChange}>
					<Form.Item name="item" label="Item Description : ">
						<Select options={itemOptions} style={{ width: "100%" }}></Select>
					</Form.Item>
					<Form.Item name="quantity" label="Quantity : ">
						<Input type="number" placeholder="0" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
