import { Button, Checkbox, Descriptions, Form, Input, Modal, Space, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function Requisition() {
	const [dataSource, setDataSource] = useState([]);
	const { TabPane } = Tabs;

	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
			key: "departmentName",
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
			key: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			key: "requestedDate",
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
			key: "collectionPoint",
		},
		{
			title: "Details",
			dataIndex: "action",
			key: "action",
			render: () => <ViewRequisition />,
		},
		{
			title: "Select",
			dataIndex: "select",
			key: "select",
			render: () => <Checkbox />,
		},
	];

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Requisitions</h3>
			<Tabs defaultActiveKey="To-Do" type="card" tabBarExtraContent={<Operations />}>
				<TabPane tab="To-Do" key="To-Do">
					<Table columns={columns} dataSource={dataSource} />
				</TabPane>
				<TabPane tab="Retrieval" key="Retrieval">
					<Retrieval />
				</TabPane>
				<TabPane tab="Disbursement" key="Disbursement">
					<Disbursement />
				</TabPane>
				<TabPane tab="Ready for Delivery" key="RFD">
					<ReadyForDelivery />
				</TabPane>
				<TabPane tab="Completed" key="Completed">
					<Completed />
				</TabPane>
			</Tabs>
		</Space>
	);
}

const Operations = () => {
	const { Search } = Input;
	return (
		<Space>
			<Search
				placeholder="input search text"
				onSearch={(value) => console.log(value)}
				style={{ width: 200 }}
			/>
			<Button type="primary">Create Retrieval</Button>
		</Space>
	);
};
const ViewRequisition = () => {
	const itemData = [];

	const columns = [
		{
			title: "Item Description",
			dataIndex: "itemDescription",
		},
		{
			title: "Quantity",
			dataIndex: "qty",
		},
	];

	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState("");
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = (e) => {
		setVisible(false);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal
				title="Requisition Details"
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Descriptions>
					<Descriptions.Item label="Collection Point">Collection Point</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Requested Items"></Descriptions.Item>
				</Descriptions>
				<Table
					dataSource={itemData}
					columns={columns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
			</Modal>
		</div>
	);
};

const Retrieval = () => {
	const [form] = Form.useForm();

	const dataSource = [
		{
			key: "1",
			processedBy: "Meka",
			createdOn: "18-8-2020",
		},
	];

	const columns = [
		{
			title: "Processed By",
			dataIndex: "processedBy",
			key: "processedBy",
		},
		{
			title: "Created On",
			dataIndex: "createdOn",
			key: "createdOn",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<MaintainRetrieval />
				</Space>
			),
		},
	];

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
			<Table columns={columns} dataSource={dataSource} pagination={false} />
		</>
	);
};

const MaintainRetrieval = () => {
	const itemData = [];

	const reqColumns = [
		{
			title: "Bin",
			dataIndex: "bin",
		},
		{
			title: "Item Description",
			dataIndex: "itemDescription",
		},
		{
			title: "Amount Needed",
			dataIndex: "needed",
		},
		{
			title: "Retrieved Amount",
			dataIndex: "retrieved",
		},
	];

	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState("");
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = (e) => {
		setVisible(false);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Button type="danger">Delete</Button>
			<Modal
				title="Requisition Details"
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Table
					dataSource={itemData}
					columns={reqColumns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
				<Button type="secondary">Print</Button>
				<Button type="secondary">Save</Button>
				<Button type="primary">Confirm</Button>
			</Modal>
		</div>
	);
};

const Disbursement = () => {
	const [form] = Form.useForm();

	const dataSource = [];

	const columns = [
		{
			title: "Retrieved Item",
			dataIndex: "retrievedItem",
		},
		{
			title: "Amount Retrieved",
			dataIndex: "amountRetrieved",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<Disburse />
				</Space>
			),
		},
	];

	const Disburse = () => {
		const itemData = [];

		const reqColumns = [
			{
				title: "Department",
				dataIndex: "department",
			},
			{
				title: "Requested By",
				dataIndex: "requestedBy",
			},
			{
				title: "Requested Date",
				dataIndex: "requestedDate",
			},
			{
				title: "Needed Amount",
				dataIndex: "neededAmount",
			},
			{
				title: "Actual Amount",
				dataIndex: "actualAmount",
			},
		];

		const [visible, setVisible] = useState(false);
		const [status, setStatus] = useState("");
		const showModal = () => {
			setVisible(true);
		};
		const handleOk = (e) => {
			setVisible(false);
		};
		const handleCancel = (e) => {
			setVisible(false);
		};
		return (
			<div>
				<Button type="primary" onClick={showModal}>
					Disburse
				</Button>
				<Modal title="" visible={visible} onCancel={handleCancel} footer={null}>
					<Table
						dataSource={itemData}
						columns={reqColumns}
						pagination={false}
						scroll={{ y: 100 }}
					/>
					<Button type="secondary">Print</Button>
					<Button type="secondary">Save</Button>
					<Button type="primary">Confirm</Button>
				</Modal>
			</div>
		);
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
			<Table columns={columns} dataSource={dataSource} pagination={false} />
		</>
	);
};

const DisbursementList = () => {
	const itemData = [];

	const reqColumns = [
		{
			title: "Stationary Description",
			dataIndex: "bin",
		},
		{
			title: "UoM",
			dataIndex: "itemDescription",
		},
		{
			title: "Amount Needed",
			dataIndex: "needed",
		},
		{
			title: "Actual Amount",
			dataIndex: "actual",
		},
	];

	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState("");
	const showModal = () => {
		setVisible(true);
	};
	const handleOk = (e) => {
		setVisible(false);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Button type="danger">Delete</Button>
			<Modal
				title="Disbursement List"
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Table
					dataSource={itemData}
					columns={reqColumns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
				<Button type="secondary">Print</Button>
				<Button type="primary">Update</Button>
			</Modal>
		</div>
	);
};

const ReadyForDelivery = () => {
	const [form] = Form.useForm();

	const dataSource = [];

	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
		},
		{
			title: "Collection Date",
			dataIndex: "collectionDate",
		},
		{
			title: "Disbursement List",
			dataIndex: "action",
			key: "action",
			render: () => <DisbursementList />,
		},
	];

	return (
		<>
			<Table columns={columns} dataSource={dataSource} pagination={false} />
		</>
	);
};

const Completed = () => {
	const [form] = Form.useForm();

	const dataSource = [];

	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
		},
		{
			title: "Collection Date",
			dataIndex: "collectionDate",
		},
		{
			title: "Disbursement List",
			dataIndex: "action",
			key: "action",
			render: () => <DisbursementList />,
		},
	];

	return (
		<>
			<Table columns={columns} dataSource={dataSource} pagination={false} />
		</>
	);
};
