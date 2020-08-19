import { Input, Space, Tabs } from "antd";

import { LowStock } from "./component/LowStock";
import { Order } from "./component/Order";
import React from "react";
import { Stock } from "./component/Stock";

export default function Ordering() {
	const { TabPane } = Tabs;
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
					<Stock />
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
