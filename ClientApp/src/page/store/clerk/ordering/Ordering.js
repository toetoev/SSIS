import { Input, Space, Tabs } from "antd";
import React, { useState } from "react";

import { LowStock } from "./component/LowStock";
import { Order } from "./component/Order";
import { Stocked } from "./component/Stocked";

export default function Ordering() {
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
	const { TabPane } = Tabs;
	const handleDataChange = (data) => {
		setDataSource(data);
	};

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Purchase Orders</h3>
			<Tabs defaultActiveKey="Low-Stock" type="card" tabBarExtraContent={<SearchBar />}>
				<TabPane tab="Low-Stock" key="Low-Stock">
					<LowStock />
				</TabPane>
				<TabPane tab="Order" key="Order">
					<Order />
				</TabPane>
				<TabPane tab="Stocked" key="Stocked">
					<Stocked />
				</TabPane>
			</Tabs>
		</Space>
	);
}

const SearchBar = () => {
	const { Search } = Input;
	return (
		<Space>
			<Search
				placeholder="input search text"
				onSearch={(value) => console.log(value)}
				style={{ width: 200 }}
			/>
		</Space>
	);
};
