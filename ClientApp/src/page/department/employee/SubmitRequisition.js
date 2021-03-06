import { Button, Col, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../component/Confirm";
import Error from "../../component/Error";
import { PlusOutlined } from "@ant-design/icons";
import Success from "../../component/Success";
import axios from "axios";
import email from "../../../util/email";
import sorter from "../../../util/sorter";

export default function SubmitRequisition() {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Product Description",
			dataIndex: "description",
			sorter: (a, b) => sorter(a.description, b.description),
		},
		{
			title: "Quantity",
			dataIndex: "quantity",
			sorter: (a, b) => sorter(a.quantity, b.quantity),
		},
		{
			title: "Action",
			key: "action",
			render: (text) => (
				<Space>
					<Delete
						dataSource={dataSource}
						handleDataChange={(data) => setDataSource(data)}
						text={text}
					></Delete>
				</Space>
			),
		},
	];
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Submit Requisition</h3>
			<Row justify="space-between">
				<Add dataSource={dataSource} handleDataChange={(data) => setDataSource(data)} />
			</Row>
			<Table columns={columns} dataSource={dataSource} pagination={false} size="middle" />
			<Row justify="end">
				<Space>
					<Clear
						dataSource={dataSource}
						handleDataChange={(data) => setDataSource(data)}
					></Clear>
					<Submit
						dataSource={dataSource}
						handleDataChange={(data) => setDataSource(data)}
					/>
				</Space>
			</Row>
		</Space>
	);
}

const Add = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [item, setItem] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [visible, setVisible] = useState(false);
	const [itemOptions, setItemOptions] = useState([]);
	const [popularItems, setPopularItems] = useState([]);

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
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
		axios
			.get("https://localhost:5001/api/requisition/popular", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setPopularItems(
						result.data.reduce((items, item) => {
							return [...items, { id: item.id, description: item.description }];
						}, [])
					);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

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
				form.resetFields();
				setVisible(false);
			})
			.catch((err) => {});
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = (e) => {
		setVisible(false);
	};

	const showPopularItem = (id) => {
		form.setFieldsValue({
			item: id,
		});
		setItem(id);
		setVisible(true);
	};

	const onValuesChange = (val) => {
		if (val.quantity) setQuantity(Number(val.quantity));
		if (val.item) setItem(val.item);
	};

	return (
		<>
			<Col>
				<Space>
					{popularItems.map((item) => (
						<Button
							type="primary"
							key={item.id}
							onClick={() => showPopularItem(item.id)}
							icon={<PlusOutlined />}
						>
							{item.description}
						</Button>
					))}
				</Space>
			</Col>
			<Col>
				<Button type="primary" onClick={showModal}>
					Add
				</Button>
			</Col>
			<Modal
				title="Stationery Catalogue"
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
					<Form.Item
						name="item"
						label="Item Description : "
						rules={[{ required: true, message: "Please choose one item" }]}
					>
						<Select
							options={itemOptions}
							style={{ width: "100%" }}
							placeholder="Select one item"
						></Select>
					</Form.Item>
					<Form.Item
						name="quantity"
						label="Quantity : "
						rules={[
							{
								required: true,
								type: "number",
								transform: (val) => Number(val),
							},
						]}
					>
						<Input type="number" placeholder="0" min={1} />
					</Form.Item>
				</Form>
			</Modal>
		</>
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
						axios
							.get("https://localhost:5001/api/deptStaff?roles=DEPTHEAD", {
								headers: {
									Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
								},
							})
							.then((res) => {
								const result = res.data;
								if (result.success && result.data.length > 0) {
									email(
										result.data[0].email,
										result.data[0].name,
										"I've submitted a new requisition request, please review it."
									);
								}
							})
							.catch(function (error) {
								console.log(error);
							});
					} else {
						Error(result.message);
					}
				});
		} else {
			Error("Please choose some items before submit");
		}
	};
	return (
		<Button type="primary" onClick={handleSubmit}>
			Submit
		</Button>
	);
};

const Clear = ({ dataSource, handleDataChange }) => {
	const handleClick = () => {
		if (dataSource.length > 0)
			Confirm("Are you sure clear all items?", "", () => handleDataChange([]));
	};
	return (
		<Button type="danger" onClick={handleClick}>
			Clear
		</Button>
	);
};
