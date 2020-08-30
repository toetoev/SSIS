import { Input, Space, Tabs } from "antd";
import React, { useState } from "react";

import { Completed } from "./component/Completed";
import { Disbursement } from "./component/Disbursement";
import { ReadyForDelivery } from "./component/ReadyForDelivery";
import { Retrieval } from "./component/Retrieval";
import { Todo } from "./component/Todo";

export default function Requisition() {
	const [loading, setLoading] = useState(true);
	const [keyword, setKeyword] = useState("");
	const { TabPane } = Tabs;
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Requisitions</h3>
			<Tabs
				defaultActiveKey="To-Do"
				tabBarExtraContent={<SearchBar setKeyword={setKeyword} />}
			>
				<TabPane tab="To-Do" key="To-Do">
					<Todo loading={loading} setLoading={setLoading} keyword={keyword} />
				</TabPane>
				<TabPane tab="Retrieval" key="Retrieval">
					<Retrieval loading={loading} setLoading={setLoading} keyword={keyword} />
				</TabPane>
				<TabPane tab="Disbursement" key="Disbursement">
					<Disbursement loading={loading} setLoading={setLoading} keyword={keyword} />
				</TabPane>
				ReadyForDelivery
				<TabPane tab="Ready for Delivery" key="RFD">
					<ReadyForDelivery loading={loading} setLoading={setLoading} keyword={keyword} />
				</TabPane>
				<TabPane tab="Completed" key="Completed">
					<Completed loading={loading} setLoading={setLoading} keyword={keyword} />
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
