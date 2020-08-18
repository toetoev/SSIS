import { Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "../Dashboard";
import { Layout } from "antd";
import Logout from "../../component/Logout";
import React from "react";
import Sidebar from "../../component/Sidebar";
import StockAdjustment from "./StockAdjustment";

const { Header, Sider, Content } = Layout;

export default function Supervisor() {
	let { path } = useRouteMatch();
	const items = [
		{ to: `${path}`, title: "Dashboard" },
		{ to: `${path}/stock-adjustment`, title: "Stock Adjustment" },
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
					<Switch>
						<Route exact path={`${path}`}>
							<Dashboard></Dashboard>
						</Route>
						<Route exact path={`${path}/stock-adjustment`}>
							<StockAdjustment></StockAdjustment>
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}
