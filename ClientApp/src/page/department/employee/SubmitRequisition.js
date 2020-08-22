import { Button, Col, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../component/Confirm";
import Error from "../../component/Error";
import Success from "../../component/Success";
import axios from "axios";

export default function SubmitRequisition() {
	const [dataSource, setDataSource] = useState([]);
	// TODO: add sorter to all field
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
			render: (text) => (
				<Space>
					<Delete
						dataSource={dataSource}
						handleDataChange={handleDataChange}
						text={text}
					></Delete>
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
			{/* // TODO: recommendation */}
			<Row justify="space-between">
				<Col>
					<Space>
						<Button type="primary">Stapler</Button>
						<Button type="primary">Tray</Button>
						<Button type="primary">Clip</Button>
					</Space>
				</Col>
				<Col>
					<Add dataSource={dataSource} handleDataChange={handleDataChange} />
				</Col>
			</Row>
			<Table columns={columns} dataSource={dataSource} pagination={false} size="middle" />
			<Row justify="end">
				<Space>
					<Clear dataSource={dataSource} handleDataChange={handleDataChange}></Clear>
					<Submit dataSource={dataSource} handleDataChange={handleDataChange} />
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

	const showModal = () => {
		setVisible(true);
	};

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

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add
			</Button>
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
