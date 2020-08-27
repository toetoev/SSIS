import { Layout } from "antd";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Navbar } from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import Ordering from "./ordering/Ordering";
import Requisition from "./requisition/Requisition";
import StockAdjustment from "./StockAdjustment";

const { Header, Sider, Content } = Layout;
export default function Clerk() {
	let { path } = useRouteMatch();
	// IMPROVE: customize icon
	const items = [
		{ to: `${path}/dashboard`, title: "Dashboard" },
		{ to: `${path}`, title: "Requisitions" },
		{ to: `${path}/ordering`, title: "Ordering" },
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
						<Route path={`${path}/dashboard`}>
							<Sidebar items={items}></Sidebar>
						</Route>
						<Route exact path={`${path}`}>
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
						<Route path={`${path}/dashboard`}>
							<Dashboard></Dashboard>
						</Route>
						<Route exact path={`${path}`}>
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
