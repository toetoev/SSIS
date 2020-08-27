import {
	Button,
	Col,
	Descriptions,
	Form,
	Input,
	InputNumber,
	Modal,
	Row,
	Select,
	Space,
	Table,
} from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../component/Confirm";
import Error from "../../component/Error";
import Success from "../../component/Success";
import axios from "axios";
import sorter from "../../../util/sorter";
import useSearch from "../../../hook/useSearch";

export default function StationeryCatalogue() {
	const { Search } = Input;
	const [loading, setLoading] = useState(true);
	const [keyword, setKeyword] = useState("");
	const options = {
		keys: ["category", "description", "uoM", "reorderQuantity", "reorderLevel"],
	};
	const [dataSource, setDataSource] = useSearch({ keyword, options });

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
			render: (text) => (
				<Space>
					<Details text={text} />
					<Edit text={text} setLoading={setLoading} />
					<Delete text={text} setLoading={setLoading} />
				</Space>
			),
		},
	];

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
					setDataSource(
						result.data.reduce((rows, item) => {
							return [
								...rows,
								{
									key: item.id,
									category: item.categoryName,
									description: item.description,
									uoM: item.uoM,
									reorderQuantity: item.reorderQty,
									reorderLevel: item.reorderLevel,
									action: item,
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
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Stationery Catalogue</h3>
			<Row justify="space-between" style={{ float: "right" }}>
				<Col>
					<Space>
						<Search
							placeholder="input search text"
							onSearch={setKeyword}
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
	const [category, setCategory] = useState("");
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
	const [stock, setStock] = useState("");

	const showModal = () => {
		setVisible(true);
	};

	const onValuesChange = (val) => {
		if (val.category) setCategory(val.category);
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
		if (val.stock) setStock(val.stock);
	};

	const handleCancel = (e) => {
		setVisible(false);
	};

	const handleSubmit = () => {
		form.validateFields()
			.then((val) => {
				let data = {
					categoryName: category,
					description: description,
					UoM: uoM,
					bin: bin,
					supplierTenderItems: [
						{
							priority: 1,
							supplierId: supplier1,
							price: price1,
						},
						{
							priority: 2,
							supplierId: supplier2,
							price: price2,
						},
						{
							priority: 3,
							supplierId: supplier3,
							price: price3,
						},
					],
					reorderLevel: reorderLevel,
					reorderQty: reorderQuantity,
					stock: stock,
				};

				axios
					.post("https://localhost:5001/api/item", data, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
							"Content-type": "application/json",
						},
					})
					.then((res) => {
						const result = res.data;
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
			.get("https://localhost:5001/api/category", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setItemOptions(
						result.data.reduce((options, category) => {
							return [...options, { label: category.name, value: category.name }];
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
								name="category"
								label="Select Item Category"
								rules={[{ required: true, message: "Please choose one item" }]}
							>
								<Select
									options={itemOptions}
									style={{ width: "100%" }}
									placeholder="Select a category"
								></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Bin"
								name="bin"
								rules={[{ required: true, message: "Please fill bin value" }]}
							>
								<Input placeholder="Enter Bin" />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Unit of Measure"
								name="uoM"
								rules={[{ required: true, message: "Please fill unit of measure" }]}
							>
								<Input placeholder="Enter Unit of Measure" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Description"
								name="description"
								rules={[{ required: true, message: "Please fill description" }]}
							>
								<Input placeholder="Enter description..." />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Supplier 1"
								name="supplier1"
								rules={[{ required: true, message: "Please choose one supplier" }]}
							>
								<Select
									options={supplierOptions}
									style={{ width: "100%" }}
									placeholder="Select a supplier"
								></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Tender Price"
								name="price1"
								rules={[{ required: true, message: "Please fill tender price" }]}
							>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Supplier 2"
								name="supplier2"
								rules={[{ required: true, message: "Please choose one supplier" }]}
							>
								<Select
									options={supplierOptions}
									style={{ width: "100%" }}
									placeholder="Select a supplier"
								></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Tender Price"
								name="price2"
								rules={[{ required: true, message: "Please fill tender price" }]}
							>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Supplier 3"
								name="supplier3"
								rules={[{ required: true, message: "Please choose one supplier" }]}
							>
								<Select
									options={supplierOptions}
									style={{ width: "100%" }}
									placeholder="Select a supplier"
								></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Tender Price"
								name="price3"
								rules={[{ required: true, message: "Please fill tender price" }]}
							>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Reorder Level"
								name="reorderLevel"
								rules={[
									{
										required: true,
										message: "Please fill number of reorder amount",
									},
								]}
							>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								label="Reorder Quantity"
								name="reorderQuantity"
								rules={[
									{
										required: true,
										message: "Please fill number of reorder quantity",
									},
								]}
							>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								label="Stock Level"
								name="stock"
								rules={[{ required: true, message: "Please fill current stock" }]}
							>
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

const Details = ({ text }) => {
	const item = text.action;
	const [visible, setVisible] = useState(false);

	const [dataSource] = useState(
		item.supplierTenderItems.reduce((rows, supplierItem) => {
			return [
				...rows,
				{
					key: supplierItem.supplierId,
					supplierName: supplierItem.supplier.name,
					price: supplierItem.price,
				},
			];
		}, [])
	);

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
		},
		{
			title: "Price",
			dataIndex: "price",
		},
	];

	return (
		<>
			<Button onClick={showModal}>View</Button>

			<Modal title="Stationery Details" visible={visible} onCancel={hideModal} footer={null}>
				<Descriptions>
					<Descriptions.Item label="Description">{item.description}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Bin">{item.bin}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Category">{item.categoryName}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Unit Of Measure">{item.uoM}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Reorder Level">{item.reorderLevel}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Reorder Quantity">
						{item.reorderQty}
					</Descriptions.Item>
				</Descriptions>
				<Table columns={columns} pagination={false} size="small" dataSource={dataSource} />
			</Modal>
		</>
	);
};

const Edit = ({ text, setLoading }) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [itemOptions, setItemOptions] = useState([]);
	const [supplierOptions, setSupplierOptions] = useState([]);

	const item = text.action;
	const [dataSource] = useState(
		item.supplierTenderItems.reduce((rows, supplierItem) => {
			return [
				...rows,
				{
					key: supplierItem.supplierId,
					supplierName: supplierItem.supplier.name,
					price: supplierItem.price,
				},
			];
		}, [])
	);
	const [category, setCategory] = useState(item.categoryName);
	const [description, setDescription] = useState(item.description);
	const [bin, setBin] = useState(item.bin);
	const [uoM, setUoM] = useState(item.uoM);
	const [supplier1, setSupplier1] = useState(
		dataSource
			.slice(0, 1)
			.map((data) => data.key)
			.toString()
	);
	const [supplier2, setSupplier2] = useState(
		dataSource
			.slice(1, 2)
			.map((data) => data.key)
			.toString()
	);
	const [supplier3, setSupplier3] = useState(
		dataSource
			.slice(2, 3)
			.map((data) => data.key)
			.toString()
	);
	const [price1, setPrice1] = useState(Number(dataSource.slice(0, 1).map((data) => data.price)));
	const [price2, setPrice2] = useState(Number(dataSource.slice(1, 2).map((data) => data.price)));
	const [price3, setPrice3] = useState(Number(dataSource.slice(2, 3).map((data) => data.price)));
	const [reorderLevel, setReorderLevel] = useState(item.reorderLevel);
	const [reorderQuantity, setReorderQuantity] = useState(item.reorderQty);

	const showModal = () => {
		setVisible(true);
	};

	const onValuesChange = (val) => {
		if (val.category) setCategory(val.category);
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
					categoryName: category,
					description: description,
					UoM: uoM,
					bin: bin,
					supplierTenderItems: [
						{
							priority: 1,
							supplierId: supplier1,
							price: price1,
						},
						{
							priority: 2,
							supplierId: supplier2,
							price: price2,
						},
						{
							priority: 3,
							supplierId: supplier3,
							price: price3,
						},
					],
					reorderLevel: reorderLevel,
					reorderQty: reorderQuantity,
				};
				axios
					.put("https://localhost:5001/api/item/" + item.id, data, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
							"Content-type": "application/json",
						},
					})
					.then((res) => {
						const result = res.data;
						if (result.success) {
							Success("Catalogue updated successfully");
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
			.get("https://localhost:5001/api/category", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setItemOptions(
						result.data.reduce((options, category) => {
							return [...options, { label: category.name, value: category.name }];
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

		form.setFieldsValue({
			category: item.categoryName,
			bin: item.bin,
			uoM: item.uoM,
			description: item.description,
			reorderLevel: item.reorderLevel,
			reorderQuantity: item.reorderQty,
			supplier1: dataSource
				.slice(0, 1)
				.map((data) => data.key)
				.toString(),
			supplier2: dataSource
				.slice(1, 2)
				.map((data) => data.key)
				.toString(),
			supplier3: dataSource
				.slice(2, 3)
				.map((data) => data.key)
				.toString(),
			price1: Number(dataSource.slice(0, 1).map((data) => data.price)),
			price2: Number(dataSource.slice(1, 2).map((data) => data.price)),
			price3: Number(dataSource.slice(2, 3).map((data) => data.price)),
		});
	}, []);

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Edit
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
							<Form.Item name="category" label="Select Item Category">
								<Select options={itemOptions} style={{ width: "100%" }}></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Bin" name="bin">
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Unit of Measure" name="uoM">
								<Input />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Description" name="description">
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item name="supplier1" label="Supplier 1">
								<Select
									options={supplierOptions}
									style={{ width: "100%" }}
								></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Tender Price" name="price1">
								<InputNumber style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Supplier 2" name="supplier2">
								<Select
									options={supplierOptions}
									style={{ width: "100%" }}
								></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Tender Price" name="price2">
								<InputNumber style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Supplier 3" name="supplier3">
								<Select
									options={supplierOptions}
									style={{ width: "100%" }}
								></Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Tender Price" name="price3">
								<InputNumber style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Reorder Level" name="reorderLevel">
								<InputNumber style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Reorder Quantity" name="reorderQuantity">
								<InputNumber style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

const Delete = ({ text, setLoading }) => {
	const item = text.action;
	const handleDelete = () => {
		Confirm("Are you sure about deleting this item?", "", () => {
			axios
				.delete("https://localhost:5001/api/item/" + item.id, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						setLoading(true);
					} else Error(result.message);
				});
		});
	};

	return (
		<Button type="danger" onClick={handleDelete}>
			Delete{" "}
		</Button>
	);
};
