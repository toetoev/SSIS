import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, InputNumber, Checkbox, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function RequisitionList() {
    //const [dataSource, setDataSource] = useState([]);
    const { Search } = Input;
    const { TabPane } = Tabs;

	const dataSource = [
		{
			key: "1",
			departmentName: "",
			requestedBy: "",
			requestedDate: "",
			collectionPoint: "",
			action: "action",
		},
	];

	const columns = [
		{
			title: "Department Name",
			dataIndex: "departmentName",
			key: "departmentName",
		},
		{
			title: "Requested By",
			dataIndex: "requestedBy",
			key: "requestedBy",
		},
		{
			title: "Requested Date",
			dataIndex: "requestedDate",
			key: "requestedDate",
		},
		{
			title: "Collection Point",
			dataIndex: "collectionPoint",
			key: "collectionPoint",
		},
		{
			title: "Details",
			dataIndex: "action",
			key: "action",
			render :() => (
                <Button>View</Button>
            ),
        },
        {
			title: "Select",
			dataIndex: "select",
			key: "select",
			render :() => (
                <Checkbox />
            ),
        },
	];

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Stock Adjustment</h3>
			<Row
				justify="space-between"
				style={{ float: "right" }}
			>
				<Col>
					<Space>
						<Search
							placeholder="input search text"
							onSearch={value => console.log(value)}
							style={{ width: 200 }}
						/>
						<Button type="primary">Add</Button>
					</Space>
				</Col>
			</Row>
			<Table
				columns={columns}
				dataSource={dataSource}
			/>
		</Space>
	);
}
