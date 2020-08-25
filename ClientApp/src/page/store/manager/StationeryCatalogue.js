import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import sorter from "../../../util/sorter";

export default function StationeryCatalogue() {
	const [dataSource, setDataSource] = useState([]);
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

	/*const onClickRow = (data) => {
		return {
			onClick: () => {
				showModal();
			},
		};
	}*/
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
						<Add dataSource={dataSource} />
					</Space>
				</Col>
			</Row>
			<Table columns={columns} dataSource={dataSource} size="middle" />
		</Space>
	);
}

const Add = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	// TODO: call create item
	const handleSubmit = () => { };

	const handleCancel = (e) => {
		setVisible(false);
	};

	// TODO: call get all categories and get all supplier set to categoryOptions and supplierOptions
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
				<Form form={form} layout="vertical" size="small">
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Category">
								<Select placeholder="Select Category">
									<Select.Option value="demo">Demo</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Bin">
								<Input placeholder="Enter Bin" />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Unit of Measure">
								<Input placeholder="Enter Unit of Measure" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Description">
								<Input placeholder="Enter description..." />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Supplier 1">
								<Select placeholder="Select Supplier 1">
									<Select.Option value="demo">Demo</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Tender Price">
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Supplier 2">
								<Select placeholder="Select Supplier 2">
									<Select.Option value="demo">Demo</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Tender Price">
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Supplier 3">
								<Select placeholder="Select Supplier 3">
									<Select.Option value="demo">Demo</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Tender Price">
								<InputNumber placeholder="0" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Reorder Level">
								<Input placeholder="Enter Reorder Level" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Reorder Quantity">
								<Input placeholder="Enter Reorder Quantity" />
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
