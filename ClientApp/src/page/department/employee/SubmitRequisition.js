import { Button, Col, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Error from "../../component/Error";
import Success from "../../component/Success";
import axios from "axios";

export default function SubmitRequisition() {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Product Description",
			dataIndex: "description",
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<Space>
					<Button type="danger">Delete</Button>
				</Space>
			),
		},
	];
	const handleDataChange = (data) => {
		setDataSource(data);
	};
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Submit Requisition</h3>
			<Row justify="space-between">
				<Col>
					<Space>
						<Button type="primary">Stapler</Button>
						<Button type="primary">Tray</Button>
						<Button type="primary">Clip</Button>
					</Space>
				</Col>
				<Row>
					<Space>
						<Add dataSource={dataSource} handleDataChange={handleDataChange} />
						<Submit dataSource={dataSource} handleDataChange={handleDataChange} />
					</Space>
				</Row>
			</Row>
			<Table columns={columns} dataSource={dataSource} />
		</Space>
	);
}

const Add = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [item, setItem] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [visible, setVisible] = useState(false);
	const [itemOptions, setItemOptions] = useState([]);

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		form.validateFields()
			.then((val) => {
				console.log(val);
				console.log("Valid");
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
				Add
			</Button>
			<Modal
				title="Stationery Catalogue"
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						Submit
					</Button>,
				]}
			>
				<Form form={form} layout="vertical" onValuesChange={onValuesChange}>
					<Form.Item
						name="item"
						label="Item Description : "
						rules={[{ required: true, message: "Please choose one item" }]}
					>
						<Select options={itemOptions} style={{ width: "100%" }}></Select>
					</Form.Item>
					<Form.Item
						name="quantity"
						label="Quantity : "
						rules={[
							{
								required: true,
								type: "number",
								transform: (val) => Number(val),
								min: 1,
								message: "Please choose at least one item",
							},
						]}
					>
						<Input type="number" placeholder="0" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const Submit = ({ dataSource, handleDataChange }) => {
	const handleSubmit = () => {
		if (dataSource.length > 0) {
			const data = dataSource.map((val) => {
				return { itemId: val.key, need: val.quantity };
			});
			axios
				.post("https://localhost:5001/api/requisition", data, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						handleDataChange([]);
						Success("Requisition Applied Successfully");
					} else {
						alert(result.message);
					}
				});
		} else {
			Error("", "Please choose some items before submit");
		}
	};
	return (
		<>
			<Button type="primary" onClick={handleSubmit}>
				Submit
			</Button>
		</>
	);
};
