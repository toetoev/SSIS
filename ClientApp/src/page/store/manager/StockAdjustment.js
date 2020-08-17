import { Button, Input, Space, Table } from "antd";

import React from "react";

export default function StockAdjustment() {
	//const [dataSource, setDataSource] = useState([]);
	const dataSource = [
		{
			key: "1",
			submittedOn: "09-09-2020",
			submittedBy: "09-09-2020",
			authorizedBy: "Meka",
			status: "Applied",
			action: "action",
		},
	];

	const columns = [
		{
			title: "Submitted On",
			dataIndex: "submittedOn",
			key: "submittedOn",
		},
		{
			title: "Submitted By",
			dataIndex: "submittedBy",
			key: "submittedBy",
		},
		{
			title: "Authorized By",
			dataIndex: "authorizedBy",
			key: "authorizedBy",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: AdjustmentVoucher,
		},
	];

	const { Search } = Input;
	return (
		<>
			<h3>Stock Adjustment</h3>

			<Search
				placeholder="input search text"
				onSearch={(value) => console.log(value)}
				style={{ width: 200, float: "right", marginBottom: 16 }}
			/>

			<Table columns={columns} dataSource={dataSource} />
		</>
	);
}

const AdjustmentVoucher = () => {
	const dataSource = [
		{
			key: "1",
			category: "File",
			description: "File-Brown w/o Logo",
			quantityAdjusted: "-6",
			reason: "Broken Item",
		},
	];
	const columns = [
		{
			title: "Item Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Item Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Quantity Adjusted",
			dataIndex: "quantityAdjusted",
			key: "quantityAdjusted",
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason",
		},
	];

	const [visible, setVisible] = useState(false);
	//const [status, setStatus] = useState("PENDING_COLLECTION");

	const showModal = () => {
		setVisible(true);
	};
	const handleCancel = (e) => {
		setVisible(false);
	};

	return (
		<div>
			<Space>
				<Button>
					<a onClick={showModal}>View</a>
				</Button>
				<Button type="primary">
					<a>Edit</a>
				</Button>
				<Button type="danger">
					<a>Delete</a>
				</Button>
			</Space>
			<Modal
				title="Adjustment Voucher"
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<p>Submitted By : </p>
				<p>Date Submitted : </p>
				<p>Issued On : </p>

				<Table columns={columns} dataSource={dataSource} />

				<Row>
					<Col
						span={24}
						style={{
							textAlign: 'right',
						}}
					>
						<Space>
							<Button type="danger">
								<a>Reject</a>
							</Button>
							<Button type="primary">
								<a>Issue</a>
							</Button>
						</Space>
					</Col>
				</Row>
			</Modal>
		</div>
	);
};

