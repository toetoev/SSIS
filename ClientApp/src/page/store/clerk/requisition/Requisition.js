import { Input, Space, Tabs } from "antd";
import React, { useState } from "react";

import { Completed } from "./component/Completed";
import { Disbursement } from "./component/Disbursement";
import { ReadyForDelivery } from "./component/ReadyForDelivery";
import { Retrieval } from "./component/Retrieval";
import { Todo } from "./component/Todo";

export default function Requisition() {
	const [loading, setLoading] = useState(true);
	const { TabPane } = Tabs;
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Requisitions</h3>
			<Tabs defaultActiveKey="To-Do" type="card" tabBarExtraContent={<SearchBar />}>
				<TabPane tab="To-Do" key="To-Do">
					<Todo loading={loading} setLoading={setLoading} />
				</TabPane>
				<TabPane tab="Retrieval" key="Retrieval">
					<Retrieval loading={loading} setLoading={setLoading} />
				</TabPane>
				<TabPane tab="Disbursement" key="Disbursement">
					<Disbursement loading={loading} setLoading={setLoading} />
				</TabPane>
				ReadyForDelivery
				<TabPane tab="Ready for Delivery" key="RFD">
					<ReadyForDelivery loading={loading} setLoading={setLoading} />
				</TabPane>
				<TabPane tab="Completed" key="Completed">
					<Completed loading={loading} setLoading={setLoading} />
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
