import { Button, Col, Descriptions, Form, Input, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../component/Confirm";
import Error from "../../component/Error";
import Success from "../../component/Success";
import axios from "axios";
import sorter from "../../../util/sorter";

export default function MaintainSupplier() {
	const { Search } = Input;
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
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
					<Edit text={text} setLoading={setLoading} />
					<Delete text={text} setLoading={setLoading} />
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
				setLoading(false);
			})
			.catch(function (error) {
				setLoading(false);
				console.log(error);
			});
	}, [loading]);

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
						<Add setLoading={setLoading} />
					</Space>
				</Col>
			</Row>
			<Table columns={columns} dataSource={dataSource} size="middle" loading={loading} />
		</Space>
	);
}

const Add = ({ setLoading }) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [contactName, setContactName] = useState("");
	const [GST, setGST] = useState("");
	const [address, setAddress] = useState("");
	const [fax, setFax] = useState("");

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = () => {
		form.validateFields()
			.then((val) => {
				let data = {
					name: name,
					phone: phone,
					contactName: contactName,
					gst: GST,
					address: address,
					fax: fax,
				};
				axios
					.post("https://localhost:5001/api/supplier", data, {
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

	const handleCancel = (e) => {
		setVisible(false);
	};

	const onValuesChange = (val) => {
		if (val.name) setName(val.name);
		if (val.phone) setPhone(val.phone);
		if (val.contactName) setContactName(val.contactName);
		if (val.GST) setGST(val.GST);
		if (val.address) setAddress(val.address);
		if (val.fax) setFax(val.fax);
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
				<Form form={form} layout="vertical" onValuesChange={onValuesChange}>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								name="name"
								label="Supplier Name"
								rules={[{ required: true, message: "Please fill supplier name" }]}
							>
								<Input placeholder="Enter Supplier Name" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								name="phone"
								label="Phone Number"
								rules={[{ required: true, message: "Please fill phone number" }]}
							>
								<Input placeholder="Enter Phone Number" />
							</Form.Item>
						</Col>
					</Row>

					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								name="contactName"
								label="Contact Name"
								rules={[{ required: true, message: "Please fill contact name" }]}
							>
								<Input placeholder="Enter Contact Name" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								name="GST"
								label="GST Registration No"
								rules={[{ required: true, message: "Please fill GST number" }]}
							>
								<Input placeholder="Enter GST No" />
							</Form.Item>
						</Col>
					</Row>

					<Row justify="space-between">
						<Col span={11}>
							<Form.Item
								name="address"
								label="Address"
								rules={[{ required: true, message: "Please fill address" }]}
							>
								<Input placeholder="Enter address..." />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item
								name="fax"
								label="Fax No :"
								rules={[{ required: true, message: "Please fill fax number" }]}
							>
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
	const [dataSource, setDataSource] = useState([]);
	const supplierDetails = text.action;

	const columns = [
		{
			title: "Item Description",
			dataIndex: "description",
		},
		{
			title: "Price",
			dataIndex: "price",
		},
		{
			title: "Unit Of Measurement",
			dataIndex: "uoM",
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/supplierTenderItem/" + supplierDetails.id, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				console.log("Details -> result", result);
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, supplierTender) => {
							return [
								...rows,
								{
									key: supplierTender.supplier.id,
									description: supplierTender.description,
									price: supplierTender.price,
									uoM: supplierTender.uoM,
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
				<Table
					columns={columns}
					pagination={false}
					scroll={{ y: 400 }}
					size="small"
					dataSource={dataSource}
				/>
			</Modal>
		</>
	);
};

const Edit = ({ setLoading, text }) => {
	const supplier = text.action;
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [name, setName] = useState(supplier.name);
	const [phone, setPhone] = useState(supplier.phone);
	const [contactName, setContactName] = useState(supplier.contactName);
	const [GST, setGST] = useState(supplier.gst);
	const [address, setAddress] = useState(supplier.address);
	const [fax, setFax] = useState(supplier.fax);

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = () => {
		let data = {
			name: name,
			phone: phone,
			contactName: contactName,
			gst: GST,
			address: address,
			fax: fax,
		};
		axios
			.put("https://localhost:5001/api/supplier/" + supplier.id, data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				console.log(result);
				if (result.success) {
					Success("Supplier updated successfully");
					setLoading(true);
				} else {
					Error(result.message);
				}
			});
		setVisible(false);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	const onValuesChange = (val) => {
		if (val.name) setName(val.name);
		if (val.phone) setPhone(val.phone);
		if (val.contactName) setContactName(val.contactName);
		if (val.gst) setGST(val.gst);
		if (val.address) setAddress(val.address);
		if (val.fax) setFax(val.fax);
	};
	console.log(supplier);
	useEffect(() => {
		form.setFieldsValue({
			name: supplier.name,
			phone: supplier.phone,
			contactName: supplier.contactName,
			gst: supplier.gst,
			address: supplier.address,
			fax: supplier.fax,
		});
	}, []);

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Edit
			</Button>
			<Modal
				title="Create Supplier"
				visible={visible}
				onCancel={hideModal}
				footer={[
					<Button key="cancel" onClick={hideModal}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Form form={form} layout="vertical" onValuesChange={onValuesChange}>
					<Row justify="space-between">
						<Col span={11}>
							<Form.Item name="name" label="Supplier Name">
								<Input />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item name="phone" label="Phone Number">
								<Input placeholder="Enter Phone Number" />
							</Form.Item>
						</Col>
					</Row>

					<Row justify="space-between">
						<Col span={11}>
							<Form.Item name="contactName" label="Contact Name">
								<Input placeholder="Enter Contact Name" />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item name="gst" label="GST Registration No">
								<Input placeholder="Enter GST No" />
							</Form.Item>
						</Col>
					</Row>

					<Row justify="space-between">
						<Col span={11}>
							<Form.Item name="address" label="Address">
								<Input placeholder="Enter address..." />
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item name="fax" label="Fax No :">
								<Input placeholder="Enter Fax No" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

const Delete = ({ text, setLoading }) => {
	const supplier = text.action;
	const handleDelete = () => {
		Confirm("Are you sure about deleting this supplier?", "", () => {
			axios
				.delete("https://localhost:5001/api/supplier/" + supplier.id, {
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
