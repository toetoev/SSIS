import { Button, Input, Space, Table, Row, Col } from "antd";
import React, { useState } from "react";

export default function StationeryCatalogue() {
	const dataSource = [
		{
			key: "1",
			category: "File",
			description: "File-Brown w/o Logo",
			uom: "Each",
			reorderQuantity: "150",
			reorderLevel: "200",
			action: "action"
		},
	];
	const columns = [
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "UOM",
			dataIndex: "uom",
			key: "uom",
		},
		{
			title: "Reorder Quantity",
			dataIndex: "reorderQuantity",
			key: "reorderQuantity",
		},
		{
			title: "Reorder Level",
			dataIndex: "reorderLevel",
			key: "reorderLevel",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<Button type="primary">
						<a>Edit</a>
					</Button>
					<Button type="danger">
						<a>Delete</a>
					</Button>
				</Space>
			),
		},
	];

	const { Search } = Input;

	return (
		<>
			<h3>Stationery Catalogue</h3>

			<div
				style={{ float: "right", marginBottom: 16 }}
			>
				<Space>
					<Search
						placeholder="input search text"
						onSearch={value => console.log(value)}
						style={{ width: 200 }}
					/>

					<Button
						type="primary"
					>
						Add Stationery
        		</Button>
				</Space>
			</div>


			<Table columns={columns} dataSource={dataSource} />
		</>
	);
}