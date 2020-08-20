import { Button, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

import Confirm from "../../../../component/Confirm";
import Error from "../../../../component/Error";
import axios from "axios";

export const Retrieval = ({ loading, setLoading }) => {
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Created By",
			dataIndex: "createdBy",
		},
		{
			title: "Created On",
			dataIndex: "createdOn",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <RetrievalModal text={text} setLoading={setLoading} />,
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/retrieval", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				console.log("Retrieval -> result", result);
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, retrieval) => {
							return [
								...rows,
								{
									key: retrieval.id,
									createdBy: retrieval.createdBy.name,
									createdOn: retrieval.createdOn,
									action: retrieval,
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
		<Table
			columns={columns}
			dataSource={dataSource}
			pagination={false}
			loading={loading}
			size="middle"
		/>
	);
};

const RetrievalModal = ({ text, setLoading }) => {
	const retrieval = text.action;
	const [dataSource] = useState(
		retrieval.retrievalItems.reduce((rows, retrievalItem) => {
			return [
				...rows,
				{
					key: retrievalItem.itemId,
					bin: retrievalItem.item.bin,
					itemDescription: retrievalItem.item.description,
					needed: retrievalItem.totalQtyNeeded,
					// TODO: this one should be update
					retrieved: retrievalItem.totalQtyRetrieved,
				},
			];
		}, [])
	);

	const reqColumns = [
		{
			title: "Bin",
			dataIndex: "bin",
		},
		{
			title: "Item Description",
			dataIndex: "itemDescription",
		},
		{
			title: "Amount Needed",
			dataIndex: "needed",
		},
		{
			title: "Retrieved Amount",
			dataIndex: "retrieved",
		},
	];

	const [visible, setVisible] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const hideModal = (e) => {
		setVisible(false);
	};
	// TODO: call deleteRetrieval
	const handleDelete = (e) => {
		Confirm("Are you sure about deleting the retrieval list?", "", () => {
			axios
				.delete("https://localhost:5001/api/retrieval/" + retrieval.id, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				})
				.then((res) => {
					const result = res.data;
					if (result.success) {
						setLoading(true);
					} else Error(result.message);
				});
		});
	};

	// TODO: call UpdateRetrievalActualQuantity
	const handleConfirm = (e) => {
		setVisible(false);
	};
	return (
		<div>
			<Space>
				<Button type="primary" onClick={showModal}>
					View
				</Button>
				<Button type="danger" onClick={handleDelete}>
					Delete
				</Button>
			</Space>
			<Modal title="Requisition Details" visible={visible} onCancel={hideModal} footer={null}>
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
							<Button type="secondary">Print</Button>
							<Button type="primary" onClick={handleConfirm}>
								Confirm
							</Button>
						</Space>
					</Row>
				</Space>
			</Modal>
		</div>
	);
};
