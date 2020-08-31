import { Button, Col, Descriptions, Input, Modal, Row, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import Error from "../../component/Error";
import axios from "axios";
import sorter from "../../../util/sorter";
import toTitleCase from "../../../util/toTitleCase";
import useSearch from "../../../hook/useSearch";

export default function AcknowledgeRequisition() {
	const { Search } = Input;
	const [loading, setLoading] = useState(true);
	const [keyword, setKeyword] = useState("");
	const options = {
		keys: ["requestedDate", "reviewedBy", "reviewedDate", "acknowledgedBy"],
	};
	const [dataSource, setDataSource] = useSearch({ keyword, options });
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
			render: (text) => <AcknowledgementModal text={text} setLoading={setLoading} />,
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
			<Row justify="space-between">
				<Col>
					<h3>Requisition History</h3>
				</Col>
				<Col>
					<Space>
						<Search
							placeholder="input search text"
							onSearch={setKeyword}
							style={{ width: 200 }}
						/>
					</Space>
				</Col>
			</Row>
			<Table
				loading={loading}
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
				size="middle"
			/>
		</Space>
	);
}

const AcknowledgementModal = ({ text, setLoading }) => {
	const requisition = text.action;
	const [status, setStatus] = useState(requisition.status);
	const [visible, setVisible] = useState(false);
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, acknowledge) => {
			return [
				...rows,
				{
					key: acknowledge.itemId,
					itemDescription: acknowledge.item.description,
					requestedQty: acknowledge.need,
					receivedQty:
						status === "PENDING_COLLECTION" || status === "DELIVERED"
							? acknowledge.actual
							: null,
					unfulfilledQty:
						status === "PENDING_COLLECTION" || status === "DELIVERED"
							? acknowledge.need - acknowledge.actual
							: null,
				},
			];
		}, [])
	);
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
			.put(
				`https://localhost:5001/api/requisition/${requisition.id}`,
				{ status: "DELIVERED" },
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
						"Content-type": "application/json",
					},
				}
			)
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setLoading(true);
					setStatus("DELIVERED");
				} else Error(result.message);
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
					scroll={{ y: 400 }}
					pagination={false}
					size="small"
				/>
			</Modal>
		</div>
	);
};
