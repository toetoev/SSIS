import { Button, Input, Space, Table, Row, Col, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function MaintainSupplier() {
	const dataSource = [
		{
			key: "1",
			supplierName: "ALPHA Office Supplies",
			contactName: "Ms Irene Tanx",
			phone: "461 9928",
			action: "action",
		},
	];
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
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<Details dataSource={dataSource} />
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

	const { Search } = Input;

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

const Details = ({ dataSource, handleDataChange }) => {
	const [visible, setVisible] = useState(false);

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
				<p>Supplier Name : ALPHA Office Supplies</p>
				<p>Contact Name : Ms Irene Tan</p>
				<p>Phone No : 85303054</p>
				<p>Fax No : 85303054</p>
				<p>GST Registration No : MR-8500440-2</p>
				<p>Address : Blk 1128, #02-1108 Ang Mo Kio Street 62Singapore 622262</p>

				<Table
					title={() => 'Items : '}
					columns={columns}
					dataSource={dataSource}
					pagination={false}
				/>
			</Modal>
		</>
	);
};