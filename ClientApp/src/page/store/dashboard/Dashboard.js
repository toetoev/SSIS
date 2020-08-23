import { LineChartOutlined, PieChartOutlined } from "@ant-design/icons";
import { Space, Tabs } from "antd";

import OrderTrend from "./orderTrend/OrderTrend";
import React from "react";
import RequisitionTrend from "./requisitionTrend/RequisitionTrend";

const Dashboard = () => {
	const { TabPane } = Tabs;
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<h3>Dashboard</h3>
			<Tabs defaultActiveKey="order">
				<TabPane
					tab={
						<span>
							<PieChartOutlined />
							Order Trend
						</span>
					}
					key="order"
				>
					<OrderTrend />
				</TabPane>
				<TabPane
					tab={
						<span>
							<LineChartOutlined />
							Requisition Trend
						</span>
					}
					key="requisition"
				>
					<RequisitionTrend />
				</TabPane>
			</Tabs>
		</Space>
	);
};

export default Dashboard;
