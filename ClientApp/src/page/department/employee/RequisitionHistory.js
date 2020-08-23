import { Button, Descriptions, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import sorter from "../../../util/sorter";
import toTitleCase from "../../../util/toTitleCase";

// IMPROVE: add search bar
export default function RequisitionHistory() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	const columns = [
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			sorter: (a, b) => sorter(a.requestedDate, b.requestedDate),
		},
		{
			title: "Reviewed By",
			dataIndex: "reviewedBy",
			sorter: (a, b) => sorter(a.reviewedBy, b.reviewedBy),
		},
		{
			title: "Reviewed Date",
			dataIndex: "reviewedDate",
			sorter: (a, b) => sorter(a.reviewedDate, b.reviewedDate),
		},
		{
			title: "Acknowledged By",
			dataIndex: "acknowledgedBy",
			sorter: (a, b) => sorter(a.acknowledgedBy, b.acknowledgedBy),
		},
		{
			title: "Acknowledged Date",
			dataIndex: "acknowledgedDate",
			sorter: (a, b) => sorter(a.acknowledgedDate, b.acknowledgedDate),
		},
		{
			title: "Status",
			dataIndex: "status",
			sorter: (a, b) => sorter(a.status, b.status),
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <RequisitionModal text={text} />,
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
				pagination={false}
				scroll={{ y: 500 }}
				loading={loading}
				size="middle"
			/>
		</Space>
	);
}

const RequisitionModal = ({ text }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					itemDescription: requisitionItem.item.description,
					requestedQty: requisitionItem.need,
					// IMPROVE: conditional render if its -1, render nothing
					receivedQty: requisitionItem.actual,
					unfulfilledQty: requisitionItem.need - requisitionItem.actual,
				},
			];
		}, [])
	);
	const [status] = useState(requisition.status);
	const [visible, setVisible] = useState(false);
	// IMPROVE: conditional render column based on status
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

	// TODO: authorized people can review requisition
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
				{status === "APPROVED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Approved By">
								{requisition.reviewedBy === null ? "" : requisition.reviewedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Approved Date">
								{requisition.reviewedOn}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				{status === "REJECTED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Rejected By">
								{requisition.reviewedBy === null ? "" : requisition.reviewedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Rejected Date">
								{requisition.reviewedOn}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Rejected Reason">
								{requisition.comment}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				{status === "DELIVERED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Received by">
								{requisition.acknowledgedBy === null
									? ""
									: requisition.acknowledgedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Received date">
								{requisition.acknowledgedOn}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				<Descriptions>
					<Descriptions.Item label="Requested Items"></Descriptions.Item>
				</Descriptions>
				<Table
					dataSource={dataSource}
					columns={columns}
					pagination={false}
					scroll={{ y: 400 }}
					size="small"
				/>
			</Modal>
		</div>
	);
};
