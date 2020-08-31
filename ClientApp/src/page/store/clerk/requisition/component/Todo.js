import { Button, Modal, Row, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import Error from "../../../../component/Error";
import Success from "../../../../component/Success";
import axios from "axios";
import sorter from "../../../../../util/sorter";
import useSearch from "../../../../../hook/useSearch";

export const Todo = ({ loading, setLoading, keyword }) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
			title: "Action",
			key: "action",
			render: (text) => <TodoModal text={text} />,
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition/APPROVED", {
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
									requestedDate: requisition.requestedOn,
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
	const handleRowSelection = (selectedRowKeys, selectedRows) => {
		setSelectedRowKeys(selectedRowKeys);
	};
	return (
		<Row>
			<Space direction="vertical" style={{ width: "100%" }}>
				<Table
					columns={columns}
					dataSource={dataSource}
					pagination={false}
					loading={loading}
					rowSelection={{
						onChange: handleRowSelection,
						selectedRowKeys: selectedRowKeys,
					}}
					size="middle"
				/>
				<Row justify="end">
					<CreateRetrieval
						selectedRowKeys={selectedRowKeys}
						setLoading={setLoading}
						setSelectedRowKeys={setSelectedRowKeys}
					></CreateRetrieval>
				</Row>
			</Space>
		</Row>
	);
};

const CreateRetrieval = ({ selectedRowKeys, setLoading, setSelectedRowKeys }) => {
	const handleCreateRetrieval = () => {
		if (selectedRowKeys.length > 0) {
			axios
				.post("https://localhost:5001/api/retrieval", selectedRowKeys, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
						"Content-type": "application/json",
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						Success("Done creating Retrieval List");
						setSelectedRowKeys([]);
						setLoading(true);
					} else {
						Error(result.message);
					}
				});
		} else Error("Please select some requisition you want to handle");
	};
	return (
		<Button type="primary" onClick={handleCreateRetrieval}>
			Create Retrieval
		</Button>
	);
};

const TodoModal = ({ text }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, requisitionItem) => {
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
	const [visible, setVisible] = useState(false);
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
