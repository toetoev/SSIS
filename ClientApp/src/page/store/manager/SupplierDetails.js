import { Button, Input, Modal, Row, Select, Space, Table, Col, Card } from "antd";
import React, { useState } from "react";

export default function SupplierDetails() {
	const dataSource = [
		{
			key: "1",
			description: "Pencil 6B",
			price: "$50",
			uom: "Box"
		},
	];
	const columns = [
		{
			title: "Item Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Unit Of Measurement",
			dataIndex: "uom",
			key: "uom",
		}
	];

	const gridStyle = {
		width: '50%',
		textAlign: 'center',
	};

	const { Search } = Input;

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
			<h3>Supplier Details</h3>

			<Card
				style={{ width: 850}}
			>
				<Card.Grid style={gridStyle}>Supplier Name : </Card.Grid>
				<Card.Grid hoverable={false} style={gridStyle}>
					ALPHA Office Supplies
    			</Card.Grid>
				<Card.Grid style={gridStyle}>Contact Name : </Card.Grid>
				<Card.Grid hoverable={false} style={gridStyle}>
					Ms Irene Tan
    			</Card.Grid>
				<Card.Grid style={gridStyle}>Phone No : </Card.Grid>
				<Card.Grid hoverable={false} style={gridStyle}>
					85303054
    			</Card.Grid>
				<Card.Grid style={gridStyle}>Fax No : </Card.Grid>
				<Card.Grid hoverable={false} style={gridStyle}>
					85303054
    			</Card.Grid>
				<Card.Grid style={gridStyle}>GST Registration No : </Card.Grid>
				<Card.Grid hoverable={false} style={gridStyle}>
					MR-8500440-2
    			</Card.Grid>
				<Card.Grid style={gridStyle}>Address : </Card.Grid>
				<Card.Grid hoverable={false} style={gridStyle}>
					Blk 1128, #02-1108 Ang Mo Kio Street 62Singapore 622262
    			</Card.Grid>
			</Card>
			
			<Search
				placeholder="input search text"
				onSearch={value => console.log(value)}
				style={{ width: 200, float: "right", marginBottom: 16}}
			/>

			<Table
				title={() => 'Items : '}
				columns={columns}
				dataSource={dataSource}
			/>
		</>
	);
};
