import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Layout } from "antd";
import MaintainDelegation from "./MaintainDelegation";
import MaintainDept from "./MaintainDept";
import { Navbar } from "../../component/Navbar";
import React from "react";
import ReviewRequisition from "./ReviewRequisition";
import Sidebar from "../../component/Sidebar";

const { Header, Sider, Content } = Layout;
export default function DeptHead() {
	let { path } = useRouteMatch();
	const items = [
		{ to: `${path}`, title: "Maintain Department" },
		{ to: `${path}/requisition`, title: "Review Requisition" },
		{ to: `${path}/delegation`, title: "Delegation" },
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
						<Route path={`${path}/requisition`}>
							<Sidebar items={items}></Sidebar>
						</Route>
						<Route path={`${path}/delegation`}>
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
							<MaintainDept></MaintainDept>
						</Route>
						<Route path={`${path}/requisition`}>
							<ReviewRequisition></ReviewRequisition>
						</Route>
						<Route path={`${path}/delegation`}>
							<MaintainDelegation></MaintainDelegation>
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}
