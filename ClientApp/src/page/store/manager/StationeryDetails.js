import { Button, Input, Modal, Row, Select, Space, Table, Col, Card } from "antd";
import React, { useState } from "react";

export default function StationeryDetails() {
	const dataSource = [
		{
			key: "1",
			supplierName: "ALPHA Office Supplies",
			price: "$50"
		},
		{
			key: "2",
			supplierName: "Cheap Stationery",
			price: "$60"
		},
		{
			key: "3",
			supplierName: "BANES Shop",
			price: "$60"
		},
	];
	const columns = [
		{
			title: "Supplier Name",
			dataIndex: "supplierName",
			key: "supplierName",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		}
	];

	const gridStyle = {
		width: '50%',
		textAlign: 'center',
	};

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
			<h3>Stationery Details</h3>

			<Row gutter={24}>
				<Col span={12}>
					<Card
						style={{ width: 500 }}
					>
						<Card.Grid style={gridStyle}>Description</Card.Grid>
						<Card.Grid hoverable={false} style={gridStyle}>
							File-Brown w/o Logo
    			</Card.Grid>
						<Card.Grid style={gridStyle}>Bin</Card.Grid>
						<Card.Grid hoverable={false} style={gridStyle}>
							A7
    			</Card.Grid>
						<Card.Grid style={gridStyle}>Category</Card.Grid>
						<Card.Grid hoverable={false} style={gridStyle}>
							File
    			</Card.Grid>
						<Card.Grid style={gridStyle}>Unit Of Measure</Card.Grid>
						<Card.Grid hoverable={false} style={gridStyle}>
							Each
    			</Card.Grid>
						<Card.Grid style={gridStyle}>Reorder Level</Card.Grid>
						<Card.Grid hoverable={false} style={gridStyle}>
							200
    			</Card.Grid>
						<Card.Grid style={gridStyle}>Reover Quantity</Card.Grid>
						<Card.Grid hoverable={false} style={gridStyle}>
							150
    			</Card.Grid>
					</Card>

				</Col>
				<Col span={12}>
					<Table
						columns={columns}
						dataSource={dataSource}
						style={{ width: 500 }}
					/>

				</Col>
			</Row>
		</>
	);
};
