import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../../../component/Confirm";
import axios from "axios";

export const Order = () => {
	const [dataSource, setDataSource] = useState([]);
	const handleDataChange = (data) => {
		setDataSource(data);
	};
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

	return <Table columns={columns} dataSource={dataSource} />;
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
