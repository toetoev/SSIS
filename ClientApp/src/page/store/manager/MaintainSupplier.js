import { Button, Col, Descriptions, Form, Input, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import sorter from "../../../util/sorter";

export default function MaintainSupplier() {
	const { Search } = Input;
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Supplier Name",
			dataIndex: "supplierName",
			sorter: (a, b) => sorter(a.supplierName, b.supplierName),
		},
		{
			title: "Contact Name",
			dataIndex: "contactName",
			sorter: (a, b) => sorter(a.contactName, b.contactName),
		},
		{
			title: "Phone No",
			dataIndex: "phone",
			sorter: (a, b) => sorter(a.phone, b.phone),
		},
		{
			title: "Action",
			key: "action",
			render: (text) => (
				<Space>
					<Details text={text} />
					{/* // TODO: make edit separate component */}
					<Button type="primary">
						<a>Edit</a>
					</Button>
					{/* // TODO: make delete separate component and write onClick={handleDelete} call delete supplier */}
					<Button type="danger">
						<a>Delete</a>
					</Button>
				</Space>
			),
		},
	];

	// TODO: loading effect
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/supplier", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, supplier) => {
							return [
								...rows,
								{
									key: supplier.id,
									supplierName: supplier.name,
									contactName: supplier.contactName,
									phone: supplier.phone,
									action: supplier,
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
			<h3>Supplier List</h3>
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

	// TODO: call create supplier
	const handleSubmit = () => { };

	const handleCancel = (e) => {
		setVisible(false);
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add
			</Button>
			<Modal
				title="Create Supplier"
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
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Supplier Name">
								<Input placeholder="Enter Supplier Name" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Phone Number">
								<Input placeholder="Enter Phone Number" />
							</Form.Item>
						</Col>
					</Row>

					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Contact Name">
								<Input placeholder="Enter Contact Name" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="GST Registration No">
								<Input placeholder="Enter GST No" />
							</Form.Item>
						</Col>
					</Row>

					<Row justify="space-between">
						<Col span={11}>
							<Form.Item label="Address">
								<Input placeholder="Enter address..." />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Fax No :">
								<Input placeholder="Enter Fax No" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

// TODO: add one more component for edit

const Details = ({ text }) => {
	const [visible, setVisible] = useState(false);
	const supplierDetails = text.action;

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

	const hideModal = (e) => {
		setVisible(false);
	};

	// TODO: call GetSupplierTenderBySupplierId and set to table dataSource
	useEffect(() => {
		axios
			//supplier tender
			.get("https://localhost:5001/api/supplier/" + text.key, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					console.log(result);
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
				<Descriptions>
					<Descriptions.Item label="Supplier Name">
						{supplierDetails.name}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Contact Name">
						{supplierDetails.contactName}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Phone No">{supplierDetails.phone}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Fax No">{supplierDetails.fax}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="GST Registration No">
						{supplierDetails.gst}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Address">{supplierDetails.address}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Items"></Descriptions.Item>
				</Descriptions>
				<Table columns={columns} pagination={false} scroll={{ y: 400 }} size="small" />
			</Modal>
		</>
	);
};
