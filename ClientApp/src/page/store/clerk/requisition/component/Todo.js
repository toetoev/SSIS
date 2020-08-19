import { Button, Checkbox, Descriptions, Modal, Row, Space, Table } from "antd";
import { default as React, useEffect, useState } from "react";

import axios from "axios";

export const Todo = () => {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
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
									departmentName: requisition.departmentName,
									requestedBy: requisition.requestedBy.name,
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

	return (
		<Row>
			<Space direction="vertical" style={{ width: "100%" }}>
				<Table columns={columns} dataSource={dataSource} />
				<Row justify="end">
					<CreateRetrieval></CreateRetrieval>
				</Row>
			</Space>
		</Row>
	);
};

const CreateRetrieval = () => {
	return <Button type="primary">Create Retrieval</Button>;
};

const TodoModal = ({ text }) => {
	const requisition = text.action;
	const [dataSource] = useState(
		requisition.requisitionItems.reduce((rows, todos) => {
			return [
				...rows,
				{
					key: todos.itemId,
					itemDescription: todos.item.description,
					qty: todos.need,
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
	const [status, setStatus] = useState("");
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
