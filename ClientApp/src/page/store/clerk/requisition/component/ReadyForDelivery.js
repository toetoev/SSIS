import { Button, Modal, Row, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import { CSVLink } from "react-csv";
import Confirm from "../../../../component/Confirm";
import axios from "axios";
import email from "../../../../../util/email";
import sorter from "../../../../../util/sorter";
import useSearch from "../../../../../hook/useSearch";

export const ReadyForDelivery = ({ loading, setLoading, keyword }) => {
	const options = {
		keys: ["departmentName", "requestedBy", "requestedOn", "collectionPoint"],
	};
	const [dataSource, setDataSource] = useSearch({ keyword, options });

	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
			sorter: (a, b) => sorter(a.departmentName, b.departmentName),
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
			sorter: (a, b) => sorter(a.requestedBy, b.requestedBy),
		},
		{
			title: "Requested Date",
			dataIndex: "requestedOn",
			sorter: (a, b) => sorter(a.requestedOn, b.requestedOn),
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
			sorter: (a, b) => sorter(a.collectionPoint, b.collectionPoint),
		},
		{
			title: "Disbursement List",
			key: "action",
			render: (text) => (
				<Space>
					<ReadyForDeliveryModal text={text} />
					<SendEmail text={text} />
				</Space>
			),
		},
	];
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition/PENDING_COLLECTION", {
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
									departmentName: requisition.department.name,
									requestedBy:
										requisition.requestedBy === null
											? ""
											: requisition.requestedBy.name,
									requestedOn: requisition.requestedOn,
									collectionPoint: requisition.department.collectionPointId,
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

	return <Table columns={columns} dataSource={dataSource} pagination={false} size="middle" />;
};

const ReadyForDeliveryModal = ({ text }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					itemDescription: requisitionItem.item.description,
					uoM: requisitionItem.item.uoM,
					need: requisitionItem.need,
					actual: requisitionItem.actual,
				},
			];
		}, [])
	);
	const columns = [
		{
			title: "Stationary Description",
			dataIndex: "itemDescription",
		},
		{
			title: "UoM",
			dataIndex: "uoM",
		},
		{
			title: "Need",
			dataIndex: "need",
		},
		{
			title: "Actual",
			dataIndex: "actual",
		},
	];
	const headers = [
		{ label: "Item Description", key: "itemDescription" },
		{ label: "UoM", key: "uoM" },
		{ label: "Need", key: "need" },
		{ label: "Actual", key: "actual" },
	];
	const [visible, setVisible] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const hideModal = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Button type="secondary" onClick={showModal}>
				View
			</Button>
			<Modal title="Disbursement List" visible={visible} onCancel={hideModal} footer={null}>
				<Space direction="vertical">
					<Row>
						<Table
							id="disbursement-list"
							dataSource={dataSource}
							columns={columns}
							pagination={false}
							scroll={{ y: 300 }}
							size="small"
						/>
					</Row>
					<Row justify="end">
						<Button type="primary">
							<CSVLink
								data={dataSource}
								headers={headers}
								filename={`Disbursement List-${text.departmentName}-${text.requestedOn}-${text.collectionPoint}.csv`}
							>
								Print
							</CSVLink>
						</Button>
					</Row>
				</Space>
			</Modal>
		</div>
	);
};

const SendEmail = ({ text }) => {
	const sendEmail = () => {
		Confirm("Notify department requested items are ready for collection?", "", () => {
			email(
				text.action.requestedByEmail,
				text.action.requestedBy.name,
				`The requisition requested on ${text.action.requestedOn} is ready for collection, department rep can collect items within working hours.`
			);
		});
	};
	return (
		<Button type="primary" onClick={sendEmail}>
			Notify
		</Button>
	);
};
