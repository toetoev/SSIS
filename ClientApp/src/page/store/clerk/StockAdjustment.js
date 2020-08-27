import { Button, Col, Descriptions, Form, Input, Modal, Row, Select, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSearch from "../../../hook/useSearch";
import sorter from "../../../util/sorter";
import Confirm from "../../component/Confirm";
import Success from "../../component/Success";

export default function StockAdjustment() {
	const { Search } = Input;
	const [loading, setLoading] = useState(true);
	const [keyword, setKeyword] = useState("");
	const options = {
		keys: ["submittedOn", "submittedBy", "issuedBy", "issuedOn"],
	};
	const [dataSource, setDataSource] = useSearch({ keyword, options });

	const columns = [
		{
			title: "Submitted On",
			dataIndex: "submittedOn",
			sorter: (a, b) => sorter(a.submittedOn, b.submittedOn),
		},
		{
			title: "Submitted By",
			dataIndex: "submittedBy",
			sorter: (a, b) => sorter(a.submittedBy, b.submittedBy),
		},
		{
			title: "Issued By",
			dataIndex: "issuedBy",
			sorter: (a, b) => sorter(a.issuedBy, b.issuedBy),
		},
		{
			title: "Issued On",
			dataIndex: "issuedOn",
			sorter: (a, b) => sorter(a.issuedOn, b.issuedOn),
		},
		{
			title: "Status",
			dataIndex: "status",
			sorter: (a, b) => sorter(a.status, b.status),
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <AdjustmentDetailsModal text={text} setLoading={setLoading} />,
		},
	];

	useEffect(() => {
		axios
			.get("https://localhost:5001/api/adjustment", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					console.log(result);
					setDataSource(
						result.data.reduce((rows, stocks) => {
							return [
								...rows,
								{
									key: stocks.id,
									submittedOn: stocks.submittedOn,
									submittedBy: stocks.submittedBy.name,
									issuedBy: stocks.issuedBy === null ? "" : stocks.issuedBy.name,
									issuedOn: stocks.issuedOn,
									status: stocks.status,
									action: stocks,
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
		<Space direction="vertical" style={{ width: "100%" }}>
			<Row justify="space-between">
				<Col>
					<h3>Stock Adjustment</h3>
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
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				size="middle"
				loading={loading}
			/>
			<Row justify="end">
				<CreateAdjustmentVoucher dataSource={dataSource} setLoading={setLoading} />
			</Row>
		</Space>
	);
}

const AdjustmentDetailsModal = ({ text, setLoading }) => {
	const stocks = text.action;
	const [dataSource] = useState(
		stocks.adjustmentItems.reduce((rows, adjustmentItems) => {
			return [
				...rows,
				{
					key: adjustmentItems.item.id,
					category: adjustmentItems.item.categoryName,
					description: adjustmentItems.item.description,
					quantityAdjusted: adjustmentItems.adjustedQty,
					reason: adjustmentItems.reason,
				},
			];
		}, [])
	);
	const columns = [
		{
			title: "Item Category",
			dataIndex: "category",
		},
		{
			title: "Item Description",
			dataIndex: "description",
		},
		{
			title: "Quantity Adjusted",
			dataIndex: "quantityAdjusted",
		},
		{
			title: "Reason",
			dataIndex: "reason",
		},
	];
	const [visible, setVisible] = useState(false);
	const showModal = () => {
		setVisible(true);
	};
	const hideModal = (e) => {
		setVisible(false);
	};
	const handleDelete = () => {
		Confirm("Are you sure about deleting the adjustment voucher?", "", () => {
			axios
				.delete("https://localhost:5001/api/adjustment/" + stocks.id, {
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
	return (
		<div>
			<Space>
				<Button type="primary" onClick={showModal}>
					View
				</Button>
				{stocks.status === "APPLIED" ? (
					<Button type="danger" onClick={handleDelete}>
						Delete
					</Button>
				) : null}
			</Space>
			<Modal title="Adjustment Voucher" visible={visible} onCancel={hideModal} footer={null}>
				<Descriptions>
					<Descriptions.Item label="Submitted By ">
						{stocks.submittedBy.name}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Submitted On">{stocks.submittedOn}</Descriptions.Item>
				</Descriptions>
				{stocks.status === "ISSUED" ? (
					<>
						<Descriptions>
							<Descriptions.Item label="Issued By">
								{stocks.issuedBy === null ? "" : stocks.issuedBy.name}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label="Issued On">
								{stocks.issuedOn}
							</Descriptions.Item>
						</Descriptions>
					</>
				) : null}
				<Descriptions>
					<Descriptions.Item label="Adjustment Items"></Descriptions.Item>
				</Descriptions>
				<Table columns={columns} dataSource={dataSource} pagination={false} size="small" />
			</Modal>
		</div>
	);
};

const CreateAdjustmentVoucher = ({ setLoading }) => {
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Item Description",
			dataIndex: "description",
		},
		{
			title: "Quantity Adjusted",
			dataIndex: "adjustedQty",
		},
		{
			title: "Adjust Reason",
			dataIndex: "reason",
		},
		{
			title: "Action",
			key: "action",
			render: (text) => (
				<Space>
					<DeleteAdjustmentItem
						dataSource={dataSource}
						handleDataChange={(data) => setDataSource(data)}
						text={text}
					></DeleteAdjustmentItem>
				</Space>
			),
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	const handleSubmit = () => {
		let data = [];
		dataSource.forEach((el) =>
			data.push({
				itemId: el.key,
				adjustedQty: el.adjustedQty,
				reason: el.reason,
			})
		);
		axios
			.post("https://localhost:5001/api/adjustment", data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					"Content-type": "application/json",
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setLoading(true);
					Success("Adjustment Submitted Successfully");
					setVisible(false);
				} else Error(result.message);
			});
	};

	const handleCancel = (e) => {
		setVisible(false);
	};

	const handleDataChange = (data) => {
		setDataSource(data);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Create Adjustment Voucher
			</Button>
			<Modal
				title="Create Adjustment Voucher"
				visible={visible}
				onOk={handleSubmit}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Space direction="vertical" style={{ width: "100%" }}>
					<Row justify="end">
						<Space>
							<ClearAdjustmentItems
								dataSource={dataSource}
								handleDataChange={handleDataChange}
							></ClearAdjustmentItems>
							<AddAdjustmentItem
								dataSource={dataSource}
								handleDataChange={handleDataChange}
							/>
						</Space>
					</Row>
					<Table
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						size="middle"
					/>
				</Space>
			</Modal>
		</>
	);
};

const AddAdjustmentItem = ({ dataSource, handleDataChange }) => {
	const [form] = Form.useForm();
	const [item, setItem] = useState("");
	const [adjustedQty, setAdjustedQty] = useState(0);
	const [reason, setReason] = useState("");
	const [visible, setVisible] = useState(false);
	const [itemOptions, setItemOptions] = useState([]);
	const showModal = () => {
		setVisible(true);
	};
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setItemOptions(
						result.data.reduce((options, item) => {
							return [...options, { label: item.description, value: item.id }];
						}, [])
					);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const handleSubmit = () => {
		form.validateFields()
			.then((val) => {
				if (dataSource.find((val) => val.key === item)) {
					handleDataChange(
						dataSource.map((val) => {
							if (val.key === item) {
								val.adjustedQty = val.adjustedQty + adjustedQty;
							}
							return val;
						})
					);
				} else {
					handleDataChange([
						...dataSource,
						{
							key: item,
							description: itemOptions.find((val) => val.value === item).label,
							adjustedQty: adjustedQty,
							reason: reason,
						},
					]);
				}
				setVisible(false);
			})
			.catch((err) => { });
	};

	const handleCancel = (e) => {
		setVisible(false);
	};

	const onValuesChange = (val) => {
		if (val.adjustedQty) setAdjustedQty(Number(val.adjustedQty));
		if (val.item) setItem(val.item);
		if (val.reason) setReason(val.reason);
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Add
			</Button>
			<Modal
				title="Add Adjustment Item"
				visible={visible}
				onOk={handleSubmit}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Form form={form} layout="vertical" onValuesChange={onValuesChange}>
					<Form.Item
						name="item"
						label="Item Description : "
						rules={[{ required: true, message: "Please choose one item" }]}
					>
						<Select options={itemOptions} style={{ width: "100%" }}></Select>
					</Form.Item>
					<Form.Item
						name="adjustedQty"
						label="Quantity Adjusted: "
						rules={[
							{
								required: true,
								type: "number",
								transform: (val) => Number(val),
								message: "Please input a number",
							},
						]}
					>
						<Input type="number" placeholder="0" />
					</Form.Item>
					<Form.Item
						name="reason"
						label="Adjust Reason : "
						rules={[
							{ required: true, message: "Please record the reason for adjustment" },
						]}
					>
						<Input type="text" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

const DeleteAdjustmentItem = ({ dataSource, handleDataChange, text }) => {
	const handleDelete = () => {
		Confirm("Are you sure delete the item?", "", () =>
			handleDataChange(dataSource.filter((val) => val.key !== text.key))
		);
	};
	return (
		<Button type="danger" onClick={handleDelete}>
			Delete
		</Button>
	);
};

const ClearAdjustmentItems = ({ dataSource, handleDataChange }) => {
	const handleClick = () => {
		if (dataSource.length > 0)
			Confirm("Are you sure you want to clear all the items?", "", () => handleDataChange([]));
	};
	return (
		<Button type="danger" onClick={handleClick}>
			Clear
		</Button>
	);
};
