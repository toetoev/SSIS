import { default as React, useEffect, useState } from "react";

import { Table } from "antd";
import axios from "axios";
import useSearch from "../../../../../hook/useSearch";

export const Stock = ({ keyword }) => {
	const [dataSource, setDataSource] = useState([]);
	const [backupData, setBackupData] = useState([]);
	const options = {
		keys: ["category", "bin", "description", "uoM"],
	};
	useSearch({ keyword, options, dataSource, setDataSource, backupData, setBackupData });
	const [loading, setLoading] = useState(false);
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
			dataIndex: "uoM",
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

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://localhost:5001/api/item", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
				},
			})
			.then((res) => {
				const result = res.data;
				console.log(result);
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
									uoM: items.uoM,
									reorderLevel: items.reorderLevel,
									reorderQuantity: items.reorderQty,
									stock: items.stock,
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
	}, []);

	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			loading={loading}
			scroll={{ y: 400 }}
			size="small"
		/>
	);
};
