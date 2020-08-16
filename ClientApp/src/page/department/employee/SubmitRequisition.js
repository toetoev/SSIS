import { Button, Col, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function SubmitRequisition() {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Product Description",
			dataIndex: "description",
		},
		{
			title: "Unit of Measure",
			dataIndex: "uoM",
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
						<Add handleSubmit={setDataSource} />
						<Submit />
					</Space>
				</Row>
			</Row>
			<Table columns={columns} dataSource={dataSource} />
		</Space>
	);
}

const Add = ({ handleSubmit }) => {
	const [itemSelected, setItemSelected] = useState({});
	const [quantity, setQuantity] = useState();
	const [visible, setVisible] = useState(false);
	const [itemOptions, setItemOptions] = useState([]);
	const [itemDetails, setItemDetails] = useState([]);

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = (e) => {
		console.log(itemSelected);
		handleSubmit([
			{
				key: itemSelected.id,
				description: itemSelected.description,
				uoM: itemSelected.uoM,
				quantity: quantity,
			},
		]);
		setVisible(false);
	};

	const handleCancel = (e) => {
		setVisible(false);
	};

	const onValuesChange = (val) => {
		console.log(val);
		console.log(itemDetails);
		console.log(itemDetails.find((val) => val.id === val.itemId));
		// if (val.quantity) setQuantity(val.quantity);
		// if (val.itemId) setItemSelected(itemDetails.filter((val) => val.id === val.itemId)[0]);
	};
	const onFinish = () => {
		// axios.post("https://localhost:5001/api/requisition");
	};

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item")
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setItemDetails(result.data);
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
				<Form layout="vertical" onFinish={onFinish} onValuesChange={onValuesChange}>
					<Form.Item name="itemId" label="Item Description : ">
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

const Submit = () => {
	const { Option } = Select;
	const [visible, setVisible] = useState(false);

	const handleChange = () => {
		console.log("handle change");
	};
	const handleSubmit = () => {};
	return (
		<>
			<Button type="primary">
				{/* Add onClick() */}
				Submit
			</Button>
		</>
	);
};
