import { Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "../Dashboard";
import { Layout } from "antd";
import Logout from "../../component/Logout";
import Ordering from "./ordering/Ordering";
import React from "react";
import Requisition from "./requisition/Requisition";
import Sidebar from "../../component/Sidebar";
import StockAdjustment from "./StockAdjustment";

const { Header, Sider, Content } = Layout;
export default function Clerk() {
	let { path } = useRouteMatch();
	const items = [
		{ to: `${path}`, title: "Dashboard" },
		{ to: `${path}/requisition`, title: "Requisitions" },
		{ to: `${path}/ordering`, title: "Ordering" },
		{ to: `${path}/stock-adjustment`, title: "Stock Adjustment" },
	];
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header className="header">
				<Logout></Logout>
			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background">
					<Switch>
						<Route exact path={`${path}`}>
							<Sidebar items={items}></Sidebar>
						</Route>
						<Route path={`${path}/requisition`}>
							<Sidebar items={items}></Sidebar>
						</Route>
						<Route path={`${path}/ordering`}>
							<Sidebar items={items}></Sidebar>
						</Route>
						<Route path={`${path}/stock-adjustment`}>
							<Sidebar items={items}></Sidebar>
						</Route>
					</Switch>
				</Sider>
				<Content
					className="site-layout-background"
					style={{
						padding: 24,
						margin: 0,
						minHeight: 280,
					}}
				>
					<Switch>
						<Route exact path={`${path}`}>
							<Dashboard></Dashboard>
						</Route>
						<Route path={`${path}/requisition`}>
							<Requisition></Requisition>
						</Route>
						<Route path={`${path}/ordering`}>
							<Ordering></Ordering>
						</Route>
						<Route path={`${path}/stock-adjustment`}>
							<StockAdjustment></StockAdjustment>
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}
