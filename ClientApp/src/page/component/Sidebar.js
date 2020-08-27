import { Menu } from "antd";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

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
				<Menu.Item key={item.to} icon={item.icon}>
					<Link to={item.to}>{item.title}</Link>
				</Menu.Item>
			))}
		</Menu>
	);
}
