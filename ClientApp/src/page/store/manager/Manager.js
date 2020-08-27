import { Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "../dashboard/Dashboard";
import { Layout } from "antd";
import MaintainSupplier from "./MaintainSupplier";
import { Navbar } from "../../component/Navbar";
import React from "react";
import Sidebar from "../../component/Sidebar";
import StationeryCatalogue from "./StationeryCatalogue";
import StockAdjustment from "./StockAdjustment";

const { Header, Sider, Content } = Layout;
export default function Manager() {
	let { path } = useRouteMatch();
	// IMPROVE: customize icon
	const items = [
		{ to: `${path}`, title: "Dashboard" },
		{ to: `${path}/stationary-catalogue`, title: "Stationery Catalogue" },
		{ to: `${path}/supplier`, title: "Maintain Suppliers" },
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
						<Route path={`${path}/stationary-catalogue`}>
							<Sidebar items={items}></Sidebar>
						</Route>
						<Route path={`${path}/supplier`}>
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
						<Route path={`${path}/stationary-catalogue`}>
							<StationeryCatalogue></StationeryCatalogue>
						</Route>
						<Route path={`${path}/supplier`}>
							<MaintainSupplier></MaintainSupplier>
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
