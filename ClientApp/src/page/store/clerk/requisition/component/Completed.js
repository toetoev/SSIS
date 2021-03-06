import { Button, Modal, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";
import sorter from "../../../../../util/sorter";
import useSearch from "../../../../../hook/useSearch";

export const Completed = ({ keyword }) => {
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
			render: (text) => <CompletedModal text={text} />,
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition/DELIVERED", {
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
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return <Table columns={columns} dataSource={dataSource} pagination={false} size="middle" />;
};

const CompletedModal = ({ text }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
			return [
				...rows,
				{
					key: requisitionItem.itemId,
					itemDescription: requisitionItem.item.description,
					uom: requisitionItem.item.uoM,
					needed: requisitionItem.need,
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
			title: "Amount Needed",
			dataIndex: "needed",
		},
		{
			title: "Actual Amount",
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
		<>
			<Button type="primary" onClick={showModal}>
				View
			</Button>
			<Modal title="Disbursement List" visible={visible} onCancel={hideModal} footer={null}>
				<Table
					dataSource={dataSource}
					columns={reqColumns}
					pagination={false}
					scroll={{ y: 400 }}
					size="small"
				/>
			</Modal>
		</>
	);
};
