import { Input, Space, Tabs } from "antd";
import React, { useState } from "react";

import { LowStock } from "./component/LowStock";
import { Order } from "./component/Order";
import { Stock } from "./component/Stock";

export default function Ordering() {
	const [loading, setLoading] = useState(true);
	const [keyword, setKeyword] = useState("");
	const { TabPane } = Tabs;
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Purchase Orders</h3>
			<Tabs
				defaultActiveKey="Low-Stock"
				tabBarExtraContent={<SearchBar setKeyword={setKeyword} />}
			>
				<TabPane tab="Low-Stock" key="Low-Stock" forceRender={true}>
					<LowStock loading={loading} setLoading={setLoading} keyword={keyword} />
				</TabPane>
				<TabPane tab="Order" key="Order" forceRender={true}>
					<Order loading={loading} setLoading={setLoading} keyword={keyword} />
				</TabPane>
				<TabPane tab="Stocked" key="Stocked" forceRender={true}>
					<Stock loading={loading} setLoading={setLoading} keyword={keyword} />
				</TabPane>
			</Tabs>
		</Space>
	);
}

const SearchBar = ({ setKeyword }) => {
	const { Search } = Input;
	return (
		<Space>
			<Search
				placeholder="input search text"
				onSearch={(value) => setKeyword(value)}
				style={{ width: 200 }}
			/>
		</Space>
	);
};
