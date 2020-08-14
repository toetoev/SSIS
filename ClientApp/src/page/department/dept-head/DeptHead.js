import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Layout } from "antd";
import Logout from "../../component/Logout";
import React from "react";
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
				<Logout></Logout>
			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background">
					<Sidebar items={items}></Sidebar>
				</Sider>
				<Content>
					<Switch>
						<Route exact path={`${path}`}>
							MaintainDept
							{/* <MaintainDept></MaintainDept> */}
						</Route>
						<Route path={`${path}/requisition`}>
							ReviewRequisition
							{/* <ReviewRequisition></ReviewRequisition> */}
						</Route>
						<Route path={`${path}/delegation`}>
							MaintainAuthDelegation
							{/* <MaintainAuthDelegation></MaintainAuthDelegation> */}
						</Route>
					</Switch>
				</Content>
			</Layout>
		</Layout>
		// <div>
		// 	<Header></Header>
		// 	{/* <Container fluid>
		// 		<Row>
		// 			<Sidebar items={items}></Sidebar>
		// <Switch>
		// 	<Route exact path={`${path}`}>
		// 		<MaintainDept></MaintainDept>
		// 	</Route>
		// 	<Route path={`${path}/requisition`}>
		// 		<ReviewRequisition></ReviewRequisition>
		// 	</Route>
		// 	<Route path={`${path}/delegation`}>
		// 		<MaintainAuthDelegation></MaintainAuthDelegation>
		// 	</Route>
		// </Switch>
		// 		</Row>
		// 	</Container> */}
		// </div>
	);
}
