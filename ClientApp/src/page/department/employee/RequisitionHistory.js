import { Button, Descriptions, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import toTitleCase from "../../../util/toTitleCase";

export default function RequisitionHistory() {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
		},
		{
			title: "Reviewed By",
			dataIndex: "reviewedBy",
		},
		{
			title: "Reviewed Date",
			dataIndex: "reviewedDate",
		},
		{
			title: "Acknowledged By",
			dataIndex: "acknowledgedBy",
		},
		{
			title: "Acknowledged Date",
			dataIndex: "acknowledgedDate",
		},
		{
			title: "Status",
			dataIndex: "status",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<ViewAcknowledgement text={text} record={record}></ViewAcknowledgement>
			),
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					console.log(result.data);
					setDataSource(
						result.data.reduce((dataSource, requisition) => {
							return [
								...dataSource,
								{
									key: requisition.id,
									requestedDate: requisition.requestedOn,
									reviewedBy:
										requisition.reviewedBy === null
											? ""
											: requisition.reviewedBy.name,
									reviewedDate: requisition.reviewedOn,
									acknowledgedBy:
										requisition.acknowledgedBy === null
											? ""
											: requisition.acknowledgedBy.name,
									acknowledgedDate: requisition.acknowledgedOn,
									status: toTitleCase(requisition.status),
									action: requisition.requisitionItems,
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
		<Space direction="vertical">
			<h3>Requisition History</h3>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
			/>
		</Space>
	);
}

// TODO: Modal display: add props for passing detailed data into component, then set to the field

const ViewAcknowledgement = ({ text, record }) => {
	console.log(text.action);
	console.log(record);
	const requisitionData = [];

	const requisitionColumns = [
		{
			title: "Item Description",
			dataIndex: "itemDescription",
		},
		{
			title: "Requested Quantity",
			dataIndex: "requestedQty",
		},
		{
			title: "Received Quantity",
			dataIndex: "receivedQty",
		},
		{
			title: "Unfulfilled Quantity",
			dataIndex: "unfulfilledQty",
		},
	];

	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState("");
	const showModal = () => {
		setVisible(true);
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
					<Descriptions.Item label="Collection Point"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Requested Items"></Descriptions.Item>
				</Descriptions>
				<Table
					dataSource={requisitionData}
					columns={requisitionColumns}
					pagination={false}
					scroll={{ y: 100 }}
				/>
				{status == "DELIVERED" ? (
					<Descriptions>
						<Descriptions.Item label="Delivered by:"></Descriptions.Item>
						<Descriptions.Item label="Delivered date:"></Descriptions.Item>
					</Descriptions>
				) : null}
			</Modal>
		</div>
	);
};
