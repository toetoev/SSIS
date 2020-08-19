import { Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "../Dashboard";
import { Layout } from "antd";
import Logout from "../../component/Logout";
import Ordering from "./Ordering";
import React from "react";
import Requisition from "./Requisition";
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
