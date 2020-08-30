import { default as React, useEffect } from "react";

import { Table } from "antd";
import axios from "axios";
import sorter from "../../../../../util/sorter";
import useSearch from "../../../../../hook/useSearch";

export const Stock = ({ loading, setLoading, keyword }) => {
	const options = {
		keys: ["category", "bin", "description", "uoM"],
	};
	const [dataSource, setDataSource] = useSearch({ keyword, options });
	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			sorter: (a, b) => sorter(a.category, b.category),
		},
		{
			title: "Bin",
			dataIndex: "bin",
			sorter: (a, b) => sorter(a.bin, b.bin),
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => sorter(a.description, b.description),
		},
		{
			title: "UoM",
			dataIndex: "uoM",
			sorter: (a, b) => sorter(a.uoM, b.uoM),
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			sorter: (a, b) => sorter(a.reorderLevel, b.reorderLevel),
		},
		{
			title: "Reorder Quantity",
			dataIndex: "reorderQuantity",
			sorter: (a, b) => sorter(a.reorderQuantity, b.reorderQuantity),
		},
		{
			title: "Stock",
			dataIndex: "stock",
			sorter: (a, b) => sorter(a.stock, b.stock),
		},
	];

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
	}, [loading]);

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
