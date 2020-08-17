import { Button, Input, Space, Table, Row, Col } from "antd";
import React, { useState } from "react";

export default function SupplierList() {
	const dataSource = [
		{
			key: "1",
			supplierName: "ALPHA Office Supplies",
			contactName: "Ms Irene Tanx",
			phone: "461 9928",
			action: "action"
		},
	];
	const columns = [
		{
			title: "Supplier Name",
			dataIndex: "supplierName",
			key: "supplierName",
		},
		{
			title: "Contact Name",
			dataIndex: "contactName",
			key: "contactName",
		},
		{
			title: "Phone No",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: () => (
				<Space>
					<Button>
						<a>View</a>
					</Button>
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
			<h3>Supplier List</h3>

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
						Add Supplier
        		</Button>
				</Space>
			</div>


			<Table columns={columns} dataSource={dataSource} />
		</>
	);
}