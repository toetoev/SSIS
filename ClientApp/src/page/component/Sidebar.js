import { Link } from "react-router-dom";
import { Menu } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

export default function Sidebar({ items }) {
	return (
		<Menu
			style={{ height: "100%", borderRight: 0 }}
			theme="dark"
			mode="inline"
			defaultSelectedKeys={["0"]}
		>
			{items.map((item, index) => (
				// TODO: accept icon input to customize
				<Menu.Item key={index} icon={<UserOutlined />}>
					<Link to={item.to}>{item.title}</Link>
				</Menu.Item>
			))}
		</Menu>
	);
}
