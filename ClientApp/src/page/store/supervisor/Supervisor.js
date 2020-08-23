import { Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "../dashboard/Dashboard";
import { Layout } from "antd";
import { Navbar } from "../../component/Navbar";
import React from "react";
import Sidebar from "../../component/Sidebar";
import StockAdjustment from "./StockAdjustment";

const { Header, Sider, Content } = Layout;
// IMPROVE: make default page to be stock adjustment
export default function Supervisor() {
	let { path } = useRouteMatch();
	// IMPROVE: customize icon
	const items = [
		{ to: `${path}`, title: "Dashboard" },
		{ to: `${path}/stock-adjustment`, title: "Stock Adjustment" },
	];
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header className="header">
				<Navbar></Navbar>
			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background">
					<Switch>
						<Route exact path={`${path}`}>
							<Sidebar items={items}></Sidebar>
						</Route>
						<Route exact path={`${path}/stock-adjustment`}>
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
						<Route exact path={`${path}/stock-adjustment`}>
							<StockAdjustment></StockAdjustment>
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}
