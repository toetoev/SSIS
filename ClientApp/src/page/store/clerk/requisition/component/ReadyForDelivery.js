import { Button, Modal, Row, Space, Table } from "antd";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import useSearch from "../../../../../hook/useSearch";
import sorter from "../../../../../util/sorter";

export const ReadyForDelivery = ({ keyword }) => {
	const options = {
		keys: ["departmentName", "requestedBy", "requestedDate", "collectionPoint"],
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
			dataIndex: "requestedDate",
			sorter: (a, b) => sorter(a.requestedDate, b.requestedDate),
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
			sorter: (a, b) => sorter(a.collectionPoint, b.collectionPoint),
		},
		{
			title: "Disbursement List",
			key: "action",
			render: (text) => <ReadyForDeliveryModal text={text} />,
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
				console.log("ReadyForDelivery -> result", result);
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
									requestedDate: requisition.requestedOn,
									collectionPoint: requisition.department.collectionPointId,
									action: requisition,
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

	return <Table columns={columns} dataSource={dataSource} pagination={false} size="middle" />;
};

const ReadyForDeliveryModal = ({ text }) => {
	const requisition = text.action;
	console.log(requisition);
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					itemDescription: requisitionItem.item.description,
					uom: requisitionItem.item.uoM,
					need: requisitionItem.need,
					actual: requisitionItem.actual,
				},
			];
		}, [])
	);
	const reqColumns = [
		{
			title: "Stationary Description",
			dataIndex: "itemDescription",
		},
		{
			title: "UoM",
			dataIndex: "uom",
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

	const [visible, setVisible] = useState(false);
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
			<Modal title="Disbursement List" visible={visible} onCancel={hideModal} footer={null}>
				<Space direction="vertical">
					<Row>
						<Table
							dataSource={dataSource}
							columns={reqColumns}
							pagination={false}
							scroll={{ y: 300 }}
							size="small"
						/>
					</Row>
					<Row justify="end">
						<Space>
							<Button type="primary">Print</Button>
						</Space>
					</Row>
				</Space>
			</Modal>
		</div>
	);
};
