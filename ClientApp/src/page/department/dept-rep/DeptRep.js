import React, { Component } from "react";

import { Layout } from "antd";
import Logout from "../../component/Logout";

const { Header, Sider, Content } = Layout;

export default class DeptRep extends Component {
	render() {
		return (
			<Layout>
				<Header className="header">
					<Logout></Logout>
				</Header>
				<Layout>
					<Sider>Sider</Sider>
					<Content>DeptRep</Content>
				</Layout>
			</Layout>
		);
	}
}
