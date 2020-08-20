import { Button, Input, Space, Table, Row, Col, Form, Modal, Descriptions } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function MaintainSupplier() {
	const { Search } = Input;
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Supplier Name",
			dataIndex: "supplierName",
			key: "supplierName",
		},
		{
			title: "Contact Name",
			dataIndex: "contactName",
			key: "contactName",
		},
		{
			title: "Phone No",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => (
				<Space>
					<Details text={text} />
					<Button type="primary">
						<a>Edit</a>
					</Button>
					<Button type="danger">
						<a>Delete</a>
					</Button>
				</Space>
			),
		},
	];

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

			<Row
				justify="space-between"
				style={{ float: "right" }}
			>
				<Col>
					<Space>
						<Search
							placeholder="input search text"
							onSearch={value => console.log(value)}
							style={{ width: 200 }}
						/>
						<Add dataSource={dataSource} />
					</Space>
				</Col>
			</Row>

			<Table columns={columns} dataSource={dataSource} />
		</Space>
	);
}

const Add = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = () => {

	};

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
				<Form
					form={form}
					layout="vertical"
				>
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
								<TextArea rows={4} placeholder="Enter address..." />
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
		}
	];

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = () => {

	};

	const handleCancel = (e) => {
		setVisible(false);
	};

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
			<Button onClick={showModal}>
				View
			</Button>

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
				<Descriptions>
					<Descriptions.Item label="Supplier Name">{supplierDetails.name}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Contact Name">{supplierDetails.contactName}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Phone No">{supplierDetails.phone}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Fax No">{supplierDetails.fax}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="GST Registration No">{supplierDetails.gst}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Address">{supplierDetails.address}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Items"></Descriptions.Item>
				</Descriptions>

				<Table
					columns={columns}
					pagination={false}
					scroll={{ y: 100 }}
					size="small"
				/>
			</Modal>
		</>
	);
};