import { Button, Descriptions, Modal, Space, Table } from "antd";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import toTitleCase from "../../../util/toTitleCase";

// TODO: add search bar
export default function RequisitionHistory() {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(true);
	// TODO: make sorter work
	const columns = [
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			sorter: true,
		},
		{
			title: "Reviewed By",
			dataIndex: "reviewedBy",
			sorter: true,
		},
		{
			title: "Reviewed Date",
			dataIndex: "reviewedDate",
			sorter: true,
		},
		{
			title: "Acknowledged By",
			dataIndex: "acknowledgedBy",
			sorter: true,
		},
		{
			title: "Acknowledged Date",
			dataIndex: "acknowledgedDate",
			sorter: true,
		},
		{
			title: "Status",
			dataIndex: "status",
			sorter: true,
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
	}, [loading]);

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
					receivedQty: requisitionItem.actual,
					unfulfilledQty: requisitionItem.need - requisitionItem.actual,
				},
			];
		}, [])
	);
	const [status] = useState(requisition.status);
	const [visible, setVisible] = useState(false);
	// TODO: conditional render column based on status
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
