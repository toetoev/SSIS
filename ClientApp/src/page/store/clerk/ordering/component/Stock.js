import React, { useEffect, useState } from "react";

import { Table } from "antd";

export const Stock = () => {
	const [dataSource, setDataSource] = useState([
		{
			key: "1",
			category: "Clip",
			description: "Clip...",
			reorderQuantity: "2",
			reorderLevel: "1",
			stock: "1",
			supplier1: "ALPHA",
			supplier2: "BETA",
			supplier3: "GAMA",
			action: "action",
			bin: "P39",
			uom: "Box",
		},
	]);
	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Bin",
			dataIndex: "bin",
			key: "bin",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "UoM",
			dataIndex: "uom",
			key: "uom",
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			key: "reorderLevel",
		},
		{
			title: "Reorder Quantity",
			dataIndex: "reorderQuantity",
			key: "reorderQuantity",
		},
		{
			title: "Stock",
			dataIndex: "stock",
			key: "stock",
		},
	];
	const handleDataChange = (data) => {
		setDataSource(data);
	};
	// TODO: call get all items
	useEffect(() => {}, []);
	return <Table columns={columns} dataSource={dataSource} />;
};
