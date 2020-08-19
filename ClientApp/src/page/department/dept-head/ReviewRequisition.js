import { Button, Descriptions, Modal, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import toTitleCase from "../../../util/toTitleCase";

export default function ReviewRequisition() {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Requested By",
			dataIndex: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
		},
		{
			title: "Status",
			dataIndex: "status",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <ReviewRequisitionModal text={text}></ReviewRequisitionModal>,
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
									requestedBy:
										requisition.requestedBy === null
											? ""
											: requisition.requestedBy.name,
									requestedDate: requisition.requestedOn,
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
			<h3>Review Requisitions</h3>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={{ pageSize: 50 }}
				scroll={{ y: 500 }}
			/>
		</Space>
	);
}

const ReviewRequisitionModal = ({ text }) => {
	const [dataSource, setDataSource] = useState([]);
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
	const hideModal = () => {
		setVisible(false);
	};
	const handleReview = (e) => {
		// TODO: call review requisition get status from button key (ToUppercase)
		setVisible(false);
	};
	useEffect(() => {
		console.log(text);
		setDataSource(
			text.action.reduce((rows, requisitionItem) => {
				return [
					...rows,
					{
						key: requisitionItem.itemId,
						itemDescription: requisitionItem.item.description,
						qty: requisitionItem.need,
					},
				];
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
					status === "Applied"
						? [
								<Button key="reject" type="danger" onClick={handleReview}>
									Reject
								</Button>,
								<Button key="approve" type="primary" onClick={handleReview}>
									Approve
								</Button>,
						  ]
						: null
				}
			>
				<Descriptions>
					<Descriptions.Item label="Requested By"></Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Requested Date"></Descriptions.Item>
				</Descriptions>
				{status === "Approved" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Approved By"></Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Approved Date"></Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				{status === "Rejected" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Rejected By"></Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Rejected Date"></Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Rejected Reason"></Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				<Table
					dataSource={dataSource}
					columns={columns}
					scroll={{ y: 100 }}
					pagination={false}
				/>
			</Modal>
		</div>
	);
};
