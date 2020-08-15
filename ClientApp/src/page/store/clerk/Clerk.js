import { Layout } from "antd";
import Logout from "../../component/Logout";
import React from "react";
import Sidebar from "../../component/Sidebar";
import { useRouteMatch } from "react-router-dom";

const { Header, Sider, Content } = Layout;
export default function Clerk() {
	let { path } = useRouteMatch();
	// const items = [
	// 	{ to: `${path}`, title: "Maintain Department" },
	// 	{ to: `${path}/requisition`, title: "Review Requisition" },
	// 	{ to: `${path}/delegation`, title: "Delegation" },
	// ];
	const items = [];
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
					{/* <Switch>
						<Route exact path={`${path}`}>
							MaintainDept
						</Route>
						<Route path={`${path}/requisition`}>
							ReviewRequisition
						</Route>
						<Route path={`${path}/delegation`}>
							MaintainAuthDelegation
						</Route>
					</Switch> */}
				</Content>
			</Layout>
		</Layout>
	);
}
