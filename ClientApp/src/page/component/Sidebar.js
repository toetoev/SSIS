import { Link, useRouteMatch } from "react-router-dom";

import { Menu } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

export default function Sidebar({ items }) {
	let { path } = useRouteMatch();
	return (
		<Menu
			style={{ height: "100%", borderRight: 0 }}
			theme="dark"
			mode="inline"
			defaultSelectedKeys={[path]}
		>
			{items.map((item) => (
				// IMPROVE: accept icon input to customize
				<Menu.Item key={item.to} icon={<UserOutlined />}>
					<Link to={item.to}>{item.title}</Link>
				</Menu.Item>
			))}
		</Menu>
	);
}
