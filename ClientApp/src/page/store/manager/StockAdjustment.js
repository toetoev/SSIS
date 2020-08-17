import { Button, Input, Space, Table } from "antd";

import React from "react";

export default function StockAdjustment() {
	const dataSource = [
		{
			key: "1",
			submittedOn: "17 August",
			submittedBy: "20 August",
			authorizedBy: "Meka",
			status: "Applied",
			action: "action",
		},
	];
	const columns = [
		{
			title: "Submitted On",
			dataIndex: "submittedOn",
			key: "submittedOn",
		},
		{
			title: "Submitted By",
			dataIndex: "submittedBy",
			key: "submittedBy",
		},
		{
			title: "Authorized By",
			dataIndex: "authorizedBy",
			key: "authorizedBy",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<Button type="primary">
						<a>View</a>
					</Button>
				</Space>
			),
		},
	];

	const { Search } = Input;
	return (
		<>
			<h3>Stock Adjustment</h3>

			<Search
				placeholder="input search text"
				onSearch={(value) => console.log(value)}
				style={{ width: 200, float: "right", marginBottom: 16 }}
			/>

			<Table columns={columns} dataSource={dataSource} />
		</>
	);
}
