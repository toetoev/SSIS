import { Input, Space, Tabs } from "antd";

import { Completed } from "./component/Completed";
import { Disbursement } from "./component/Disbursement";
import React from "react";
import { ReadyForDelivery } from "./component/ReadyForDeliveryModal";
import { Retrieval } from "./component/Retrieval";
import { Todo } from "./component/Todo";

export default function Requisition() {
	const { TabPane } = Tabs;
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Requisitions</h3>
			<Tabs defaultActiveKey="To-Do" type="card" tabBarExtraContent={<SearchBar />}>
				<TabPane tab="To-Do" key="To-Do">
					<Todo />
				</TabPane>
				<TabPane tab="Retrieval" key="Retrieval">
					<Retrieval />
				</TabPane>
				<TabPane tab="Disbursement" key="Disbursement">
					<Disbursement />
				</TabPane>
				<TabPane tab="Ready for Delivery" key="RFD">
					<ReadyForDelivery />
				</TabPane>
				<TabPane tab="Completed" key="Completed">
					<Completed />
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
