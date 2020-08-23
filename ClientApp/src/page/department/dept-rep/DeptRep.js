import { Route, Switch, useRouteMatch } from "react-router-dom";

import AcknowledgeRequisition from "./AcknowledgeRequisition";
import { Layout } from "antd";
import { Navbar } from "../../component/Navbar";
import React from "react";
import Sidebar from "../../component/Sidebar";

const { Header, Sider, Content } = Layout;

export default function DeptRep() {
	let { path } = useRouteMatch();
	// IMPROVE: customize icon
	const items = [{ to: `${path}`, title: "Requisition History" }];
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
							<AcknowledgeRequisition></AcknowledgeRequisition>
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}
