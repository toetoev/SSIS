import { Button, Checkbox, Descriptions, Form, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import toTitleCase from "../../../util/toTitleCase";

export default function AcknowledgeRequisition() {
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
			render: (text) => <AcknowledgementModal text={text} />,
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
						result.data.reduce((rows, requisition) => {
							return [
								...rows,
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

const AcknowledgementModal = ({ text }) => {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
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
	const hideModal = (e) => {
		setVisible(false);
	};
	const handleAcknowledge = (e) => {
		// TODO: call UpdateRequisitionStatus
		setVisible(false);
	};

	useEffect(() => {
		setDataSource(
			text.action.reduce((rows, acknowledge) => {
				return [
					...rows,
					{
						key : acknowledge.itemId,
						itemDescription : acknowledge.item.description,
						requestedQty : acknowledge.need,
						receivedQty : acknowledge.actual,
						unfulfilledQty : (acknowledge.need - acknowledge.actual),
					},
				]
			}, [])
		);
		setStatus(text.status[0]);
	}, []);

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal
				title="View Requisition"
				visible={visible}
				onCancel={hideModal}
				footer={
					status === "PENDING_COLLECTION"
						? [
								<Button key="cancel" type="danger" onClick={hideModal}>
									Cancel
								</Button>,
								<Button
									key="acknowledge"
									type="primary"
									onClick={handleAcknowledge}
								>
									Acknowledge
								</Button>,
						  ]
						: null
				}
			>
				<Descriptions>
					<Descriptions.Item label="Collection Date"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Collection Point"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Requested Items"></Descriptions.Item>
				</Descriptions>
				<Table dataSource={dataSource} columns={columns} scroll={{ y: 100 }} />
				{status === "PENDING_COLLECTION" ? (
					<>
						<Form.Item
							label="Do you want to re-order the unfulfilled items?"
							name="checkbox-group"
						>
							<Checkbox value="A" style={{ lineHeight: "32px" }}>
								Yes
							</Checkbox>
						</Form.Item>
					</>
				) : null}
				{status === "DELIVERED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Delivered by"></Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Delivered date"></Descriptions.Item>
						</Descriptions>
					</>
				) : null}
			</Modal>
		</div>
	);
};
