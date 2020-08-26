import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import sorter from "../../../util/sorter";

export default function StationeryCatalogue() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	const { Search } = Input;

	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			sorter: (a, b) => sorter(a.category, b.category),
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
			title: "Reorder Quantity",
			dataIndex: "reorderQuantity",
			sorter: (a, b) => sorter(a.reorderQuantity, b.reorderQuantity),
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			sorter: (a, b) => sorter(a.reorderLevel, b.reorderLevel),
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<Space>
					<Details dataSource={dataSource} />
					{/* // TODO: make edit separate component and call update item when submit */}
					<Button type="primary">
						<a>Edit</a>
					</Button>
					{/* // TODO: make delete separate component and call delete item after confirm */}
					<Button type="danger">
						<a>Delete</a>
					</Button>
				</Space>
			),
		},
	];

	// TODO: call get all items set to table
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				console.log(result);
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, requisition) => {
							return [
								...rows,
								{
									key: requisition.id,
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
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Stationery Catalogue</h3>
			<Row justify="space-between" style={{ float: "right" }}>
				<Col>
					<Space>
						<Search
							placeholder="input search text"
							onSearch={(value) => console.log(value)}
							style={{ width: 200 }}
						/>
						<Add setLoading={setLoading} />
					</Space>
				</Col>
			</Row>
			<Table columns={columns} dataSource={dataSource} size="middle" />
		</Space>
	);
}

const Add = ({ setLoading }) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const [itemOptions, setItemOptions] = useState([]);
	const [supplierOptions, setSupplierOptions] = useState([]);
	const [item, setItem] = useState("");
	const [description, setDescription] = useState("");
	const [bin, setBin] = useState("");
	const [uoM, setUoM] = useState("");
	const [supplier1, setSupplier1] = useState("");
	const [supplier2, setSupplier2] = useState("");
	const [supplier3, setSupplier3] = useState("");
	const [price1, setPrice1] = useState("");
	const [price2, setPrice2] = useState("");
	const [price3, setPrice3] = useState("");
	const [reorderLevel, setReorderLevel] = useState("");
	const [reorderQuantity, setReorderQuantity] = useState("");

	const showModal = () => {
		setVisible(true);
	};

	const onValuesChange = (val) => {
		if (val.item) setItem(val.item);
		if (val.description) setDescription(val.description);
		if (val.bin) setBin(val.bin);
		if (val.uoM) setUoM(val.uoM);
		if (val.supplier1) setSupplier1(val.supplier1);
		if (val.supplier2) setSupplier2(val.supplier2);
		if (val.supplier3) setSupplier3(val.supplier3);
		if (val.price1) setPrice1(val.price1);
		if (val.price2) setPrice2(val.price2);
		if (val.price3) setPrice3(val.price3);
		if (val.reorderLevel) setReorderLevel(val.reorderLevel);
		if (val.reorderQuantity) setReorderQuantity(val.reorderQuantity);
	};

	const handleCancel = (e) => {
		setVisible(false);
	};


	const handleSubmit = () => {
		form.validateFields()
			.then((val) => {
				let data = {
					item: item,
					description: description,
					bin: bin,
					supplier1: supplier1,
					supplier2: supplier2,
					supplier3: supplier3,
					price1: price1,
					price2: price2,
					price3: price3,
					reorderLevel: reorderLevel,
					reorderQuantity: reorderQuantity,
				};
				console.log(data);

				axios
					.post("https://localhost:5001/api/item", data, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
							"Content-type": "application/json",
						},
					})
					.then((res) => {
						const result = res.data;
						console.log(result);
						if (result.success) {
							Success("Supplier created successfully");
							setLoading(true);
						} else {
							Error(result.message);
						}
					});
				setVisible(false);
			})
			.catch((err) => { });
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

		axios
			.get("https://localhost:5001/api/supplier", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setSupplierOptions(
						result.data.reduce((options, supplier) => {
							return [...options, { label: supplier.name, value: supplier.id }];
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
				title="Add Stationery"
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
				<Form form={form} layout="vertical" size="medium" onValuesChange={onValuesChange}>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								name="item"
								label="Select Item Category"
								rules={[{ required: true, message: "Please choose one item" }]}>
								<Select options={itemOptions} style={{ width: "100%" }} placeholder="Select a category"></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Bin" name="bin"
								rules={[{ required: true, message: "Please fill bin value" }]}>
								<Input placeholder="Enter Bin" />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Unit of Measure" name="uoM"
								rules={[{ required: true, message: "Please fill unit of measure" }]}>
								<Input placeholder="Enter Unit of Measure" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Description" name="description"
								rules={[{ required: true, message: "Please fill description" }]}>
								<Input placeholder="Enter description..." />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Supplier 1" name="supplier1"
								rules={[{ required: true, message: "Please choose one supplier" }]}>
								<Select options={supplierOptions} style={{ width: "100%" }} placeholder="Select a supplier"></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Tender Price" name="price1"
								rules={[{ required: true, message: "Please fill tender price" }]}>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Supplier 2" name="supplier2"
								rules={[{ required: true, message: "Please choose one supplier" }]}>
								<Select options={supplierOptions} style={{ width: "100%" }} placeholder="Select a supplier"></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Tender Price" name="price2"
								rules={[{ required: true, message: "Please fill tender price" }]}>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Supplier 3" name="supplier3"
								rules={[{ required: true, message: "Please choose one supplier" }]}>
								<Select options={supplierOptions} style={{ width: "100%" }} placeholder="Select a supplier"></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Tender Price" name="price3"
								rules={[{ required: true, message: "Please fill tender price" }]}>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Reorder Level" name="reorderLevel"
								rules={[{ required: true, message: "Please fill number of reorder amount" }]}>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Reorder Quantity" name="reorderQuantity"
								rules={[{ required: true, message: "Please fill number of reorder quantity" }]}>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

const Details = ({ dataSource, handleDataChange }) => {
	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	const columns = [
		{
			title: "Supplier Name",
			dataIndex: "supplierName",
			key: "supplierName",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
	];

	// TODO: get data from text, set to modal and table dataSource
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

			<Modal title="Stationery Details" visible={visible} onCancel={hideModal} footer={null}>
				{/* // TODO: migrate to description */}
				<p>Description : File-Brown w/o Logo</p>
				<p>Bin : A7</p>
				<p>Category : File</p>
				<p>Unit Of Measure : Each</p>
				<p>Reorder Level : 200</p>
				<p>Reorder Quantity : 150</p>

				<Table columns={columns} dataSource={dataSource} pagination={false} size="small" />
			</Modal>
		</>
	);
};
