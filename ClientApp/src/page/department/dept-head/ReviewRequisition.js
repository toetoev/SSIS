import { Button, Modal, Table } from "antd";

import React from "react";

export default function ReviewRequisition() {
	const dataSource = [];
	for (let i = 0; i < 100; i++) {
		dataSource.push({
			key: i,
			requestedBy: `Edward King ${i}`,
			requestedDate: "25 August 1998",
			status: "Applied",
		});
	}

	const columns = [
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
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Action",
			key: "action",
			render: () => <ViewRequisition />,
		},
	];

	return (
		<>
			<h3>Review Requisitions</h3>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
			/>
		</>
	);
}
const itemData = [];
for (let i = 0; i < 5; i++) {
	itemData.push({
		key: i,
		itemDescription: `Pencil ${i}B`,
		qty: `${i}`,
	});
}

const reqColumns = [
	{
		title: "Item Description",
		dataIndex: "itemDescription",
		key: "itemDescription",
	},
	{
		title: "Quantity",
		dataIndex: "qty",
		key: "qty",
	},
];
class ViewRequisition extends React.Component {
	state = { visible: false };
	showModal = () => {
		this.setState({
			visible: true,
		});
	};
	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};
	render() {
		return (
			<div>
				<Button type="primary" onClick={this.showModal}>
					View
				</Button>
				<Modal
					title="View Requisition"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<p>Requested by: </p>
					<p>Requested on: </p>
					<Table dataSource={itemData} columns={reqColumns} />
					<Button type="primary">Approve</Button>
					<Button type="danger">Reject</Button>
				</Modal>
			</div>
		);
	}
}
