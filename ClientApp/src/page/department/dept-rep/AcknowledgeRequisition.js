import { Button, Checkbox, Descriptions, Form, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import toTitleCase from "../../../util/toTitleCase";

export default function AcknowledgeRequisition() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(false);
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
		setLoading(true);
		axios
			.get("https://localhost:5001/api/requisition", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
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
									action: requisition,
								},
							];
						}, [])
					);
					setLoading(false);
				}
			})

			.catch(function (error) {
				setLoading(false);
				console.log(error);
			});
	}, []);

	return (
		<Space direction="vertical">
			<h3>Requisition History</h3>
			<Table
				loading={loading}
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
			/>
		</Space>
	);
}

const AcknowledgementModal = ({ text }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, acknowledge) => {
			return [
				...rows,
				{
					key: acknowledge.itemId,
					itemDescription: acknowledge.item.description,
					requestedQty: acknowledge.need,
					receivedQty: acknowledge.actual,
					unfulfilledQty: acknowledge.need - acknowledge.actual,
				},
			];
		}, [])
	);
	const [status] = useState(text.status[0]);
	const [visible, setVisible] = useState(false);
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
	const showModal = () => {
		setVisible(true);
	};
	const hideModal = (e) => {
		setVisible(false);
	};
	const handleAcknowledge = (e) => {
		axios
			.put(`https://localhost:5001/api/requisition/${requisition.id}`, `"DELIVERED"`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) window.location.reload(false);
				else Error(result.message);
			});
		setVisible(false);
	};

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
					<Descriptions.Item label="Collection Point">
						{requisition.department.collectionPointId}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Requested Items"></Descriptions.Item>
				</Descriptions>
				<Table
					dataSource={dataSource}
					columns={columns}
					scroll={{ y: 100 }}
					pagination={false}
				/>
				{/* // TODO: test conditional rendering */}
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
							<Descriptions.Item label="Delivered by">
								{requisition.acknowledgedBy === null
									? ""
									: requisition.acknowledgedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Delivered date">
								{requisition.acknowledgedOn}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
			</Modal>
		</div>
	);
};
