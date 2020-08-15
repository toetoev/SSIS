import { Button, Input, Space, Table, Row, Col } from "antd";
import React, { useState } from "react";

export default function ViewStockAdjustment() {
	const dataSource = [
		{
			key: "1",
			category: "File",
			description: "File-Brown w/o Logo",
			quantityAdjusted: "-6",
			reason: "Broken Item",
		},
	];
	const columns = [
		{
			title: "Item Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Item Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Quantity Adjusted",
			dataIndex: "quantityAdjusted",
			key: "quantityAdjusted",
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason",
		},
	];

	return (
		<>
			<Row>
				<Col
					span={24}
					style={{
						textAlign: 'right',
					}}
				>
					<Button>
						<a>Back</a>
					</Button>
				</Col>
			</Row>
			<h3>Adjustment Voucher</h3>

			<p>Submitted By : </p>
			<p>Date Submitted : </p>
			<p>Issued On : </p>

			<Table columns={columns} dataSource={dataSource} />

			<Row>
				<Col
					span={24}
					style={{
						textAlign: 'right',
					}}
				>
					<Space>
						<Button type="danger">
							<a>Reject Voucher</a>
						</Button>
						<Button type="primary">
							<a>Issue Voucher</a>
						</Button>
					</Space>
				</Col>
			</Row>

		</>
	);
}