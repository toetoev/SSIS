import { Button, Descriptions, Modal, Table, Input } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import Error from "../../../../component/Error";
import Success from "../../../../component/Success";
import Form from "antd/lib/form/Form";

export const LowStock = ({ loading, setLoading }) => {
	const [dataSource, setDataSource] = useState([]);

	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			sorter: (a, b) => a.categoryName - b.categoryName,
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			sorter: (a, b) => a.description - b.description,
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			key: "reorderLevel",
			sorter: true,
		},
		{
			title: "Reorder Quantity",
			dataIndex: "reorderQuantity",
			key: "reorderQuantity",
			sorter: true,
		},
		{
			title: "Stock",
			dataIndex: "stock",
			key: "stock",
			sorter: true,
		},
		{
			title: "Action",
			key: "action",
			render: (text) => <LowStockModal text={text} />,
		},
	];
	useEffect(() => {
		axios
			.get("https://localhost:5001/api/item/low-stock", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, items) => {
							return [
								...rows,
								{
									key: items.id,
									category: items.categoryName,
									bin: items.bin,
									description: items.description,
									uom: items.uoM,
									reorderLevel: items.reorderLevel,
									reorderQuantity: items.reorderQty,
									stock: items.stock,
									action: items,
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
			loading={loading}
			dataSource={dataSource}
			scroll={{ y: 400 }}
			pagination={false}
			size="small"
		/>
	);
};

const LowStockModal = ({ text, setLoading }) => {
	const items = text.action;
	const [quantity, setQuantity] = useState("");
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);

	const columns = [
		{
			title: "Supplier Name",
			dataIndex: "supplierName",
		},
		{
			title: "Order Quantity",
			dataIndex: "orderQuantity",
			render: () => 
				<Input type="number" placeholder="0" onChange={e => setQuantity(e.target.value)}/>,
		},
		{
			title: "View Supplier Details",
			key: "details",
			render: (text) => <Details text={text} />,
		},
	];

	useEffect(() => {
		axios
			.get(`https://localhost:5001/api/supplierTenderItem/${items.id}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				if (result.success) {
					setDataSource(
						result.data.reduce((rows, supplierTender) => {
							return [
								...rows,
								{
									key: supplierTender.supplierId,
									supplierName: supplierTender.supplier.name,
									action: supplierTender,
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

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	const handleDataChange = (data) => {
		setDataSource(data);
	};

	// TODO: call createOrder List<Order>
	// [{
	// 	supplierId: "",
	// 	orderItems: [{
	// 		itemId: "",
	// 		orderedQty:
	// 	}]
	// }];
	const handleSubmit = () => {
		console.log(dataSource);
		if (dataSource.length > 0) {
			const data = dataSource.map((val) => {
				return {
					supplierId: val.key,
					orderItems: [{
						itemId: val.action.itemId,
						orderedQty: quantity,
					}],
				}
			});
			console.log(data);
			axios
				.post("https://localhost:5001/api/order", data, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
					},
				})
				.then((res) => {
					const result = res.data;
					console.log(result)
					if (result.success) {
						Success("Order Applied Successfully");
					} else {
						Error(result.message);
					}
				});
		} else {
			Error("Please choose some items before submit");
		}
		setVisible(true);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Order
			</Button>
			<Modal
				title="Tender Order"
				visible={visible}
				onCancel={hideModal}
				footer={[
					<Button key="cancel" onClick={hideModal}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Table columns={columns} dataSource={dataSource} pagination={false} size="small" />
			</Modal>
		</>
	);
};

const Details = ({ text }) => {
	const supplierDetails = text.action;
	console.log(supplierDetails);
	const [visible, setVisible] = useState(false);
	const [dataSource] = useState(
		/*supplierDetails.reduce((rows, items) => {
			return [
				...rows,
				{
					key: items.itemId,
					//description: items.item.description,
					//price: items.item.uoM,
					//uom: items.need,
				},
			];
		}, [])*/
	);

	// TODO: call GetSupplierTenderItemBySupplierId (Backend not done yet)
	/*useEffect(() => {
		axios
			.get("https://localhost:5001/api/item")
			.then((res) => {
				const result = res.data;
				if (result.success) {
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);*/

	const columns = [
		{
			title: "Item Description",
			dataIndex: "description",
		},
		{
			title: "Price",
			dataIndex: "price",
		},
		{
			title: "Unit Of Measurement",
			dataIndex: "uom",
		},
	];

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = (e) => {
		setVisible(false);
	};

	return (
		<>
			<Button onClick={showModal}>View</Button>
			<Modal
				title="Stationery Details"
				visible={visible}
				onCancel={hideModal}
				footer={[
					<Button key="back" onClick={hideModal}>
						Back
					</Button>,
				]}
			>
				<Descriptions>
					<Descriptions.Item label="Supplier Name">{supplierDetails.supplier.name}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Contact Name">{supplierDetails.supplier.contactName}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Phone No">{supplierDetails.supplier.phone}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Fax No">{supplierDetails.supplier.fax}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="GST Registration No">{supplierDetails.supplier.gst}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="Address">{supplierDetails.supplier.address}</Descriptions.Item>
				</Descriptions>

				<Table
					title={() => "Items : "}
					columns={columns}
					//dataSource={dataSource}
					pagination={false}
					size="small"
				/>
			</Modal>
		</>
	);
};
