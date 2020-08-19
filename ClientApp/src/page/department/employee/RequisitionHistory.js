import { Button, Descriptions, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import toTitleCase from "../../../util/toTitleCase";

export default function RequisitionHistory() {
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
			render: (text) => <RequisitionModal text={text} />,
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
									action: requisition,
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
	}, []);

	return (
		<Space direction="vertical">
			<h3>Requisition History</h3>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
				loading={loading}
			/>
		</Space>
	);
}

const RequisitionModal = ({ text }) => {
	const requisition = text.action;
	console.log("RequisitionModal -> requisition", requisition);
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					itemDescription: requisitionItem.item.description,
					requestedQty: requisitionItem.need,
					receivedQty: requisitionItem.actual,
					unfulfilledQty: requisitionItem.need - requisitionItem.actual,
				},
			];
		}, [])
	);
	const [status] = useState(requisition.status[0]);
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

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal title="Requisition Details" visible={visible} onCancel={hideModal} footer={null}>
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
					pagination={false}
					scroll={{ y: 100 }}
				/>
				{status === "Delivered" ? (
					<Descriptions>
						<Descriptions.Item label="Delivered by:">
							{requisition.acknowledgedBy === null
								? ""
								: requisition.acknowledgedBy.name}
						</Descriptions.Item>
						<Descriptions.Item label="Delivered date:">
							{requisition.acknowledgedOn}
						</Descriptions.Item>
					</Descriptions>
				) : null}
			</Modal>
		</div>
	);
};
