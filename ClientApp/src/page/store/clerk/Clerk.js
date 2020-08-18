import { Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "../Dashboard";
import { Layout } from "antd";
import Logout from "../../component/Logout";
import React from "react";
import Sidebar from "../../component/Sidebar";
import StockAdjustment from "./StockAjustment";
import StockList from "./StockList";
import RequisitionList from "./RequisitionList";

const { Header, Sider, Content } = Layout;
export default function Clerk() {
	let { path } = useRouteMatch();
	const items = [
		{ to: `${path}`, title: "Dashboard" },
		{ to: `${path}/requisition`, title: "Requisitions" },
		{ to: `${path}/stocklist`, title: "Ordering" },
		{ to: `${path}/stockadjustment`, title: "Stock Adjustment" },
	];

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header className="header">
				<Logout></Logout>
			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background">
					<Sidebar items={items}></Sidebar>
				</Sider>
				<Content
					className="site-layout-background"
					style={{
						padding: 24,
						margin: 0,
						minHeight: 280,
					}}
				>
					<Route exact path={`${path}`}>
						<Dashboard></Dashboard>
					</Route>
					<Route path={`${path}/requisition`}>
						<RequisitionList></RequisitionList>
					</Route>
					<Route path={`${path}/stocklist`}>
						<StockList></StockList>
					</Route>
					<Route path={`${path}/stockadjustment`}>
						<StockAdjustment></StockAdjustment>
					</Route>
				</Content>
			</Layout>
		</Layout>
	);
}
