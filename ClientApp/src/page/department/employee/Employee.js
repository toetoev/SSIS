import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Layout } from "antd";
import Logout from "../../component/Logout";
import React from "react";
import RequisitionHistory from "./RequisitionHistory";
import Sidebar from "../../component/Sidebar";
import SubmitRequisition from "./SubmitRequisition";

const { Header, Sider, Content } = Layout;

export default function Employee() {
	let { path } = useRouteMatch();
	const items = [
		{ to: `${path}`, title: "Submit Requisition" },
		{ to: `${path}/requisition-history`, title: "Requisition History" },
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
							<SubmitRequisition></SubmitRequisition>
						</Route>
						<Route path={`${path}/requisition-history`}>
							<RequisitionHistory></RequisitionHistory>
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}
