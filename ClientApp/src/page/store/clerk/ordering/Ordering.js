import { Input, Space, Tabs } from "antd";
import React, { useState } from "react";
import { LowStock } from "./component/LowStock";
import { Order } from "./component/Order";
import { Stock } from "./component/Stock";

export default function Ordering() {
	const [loading, setLoading] = useState(true);
	const { TabPane } = Tabs;
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Purchase Orders</h3>
			<Tabs defaultActiveKey="Low-Stock" type="card" tabBarExtraContent={<SearchBar />}>
				<TabPane tab="Low-Stock" key="Low-Stock">
					<LowStock loading={loading} setLoading={setLoading} />
				</TabPane>
				<TabPane tab="Order" key="Order">
					<Order loading={loading} setLoading={setLoading} />
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
