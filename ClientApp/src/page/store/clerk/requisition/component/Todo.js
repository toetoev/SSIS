import { Button, Checkbox, Descriptions, Modal, Row, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";

import Success from "../../../../component/Success";
import axios from "axios";

export const Todo = () => {
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const columns = [
		{
			title: "Department Name",
			key: "departmentName",
			sorter: true,
		},
		{
			title: "Requested By",
			key: "requestedBy",
			sorter: true,
		},
		{
			title: "Requested Date",
			key: "requestedDate",
			sorter: true,
		},
		{
			title: "Collection Point",
			key: "collectionPoint",
			sorter: true,
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <TodoModal text={text} />,
		},
		{
			title: "Select",
			dataIndex: "select",
			key: "select",
			render: (text) => <Checkbox text={text} />,
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/requisition/APPLIED", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				console.log(result);
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
					setLoading(false);
				}
			})
			.catch(function (error) {
				setLoading(false);
				console.log(error);
			});
	}, []);
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
					}}
				/>
				<Row justify="end">
					<CreateRetrieval selectedRowKeys={selectedRowKeys}></CreateRetrieval>
				</Row>
			</Space>
		</Row>
	);
};

const CreateRetrieval = ({ selectedRowKeys }) => {
	const handleCreateRetrieval = () => {
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
					Success("Done creating retrieval list", () => window.location.reload(false));
				} else {
					Error(result.message);
				}
			});
	};
	return (
		<Button type="primary" onClick={handleCreateRetrieval}>
			Create Retrieval
		</Button>
	);
};

const TodoModal = ({ text }) => {
	const requisition = text;
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
			</Modal>
		</div>
	);
};
