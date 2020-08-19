import { Col, Row } from "antd";

import Logout from "./Logout";
import React from "react";
import { ShopTwoTone } from "@ant-design/icons";

export const Navbar = () => {
	return (
		<Row justify="space-between" align="middle">
			<Col>
				<Row align="middle">
					<ShopTwoTone style={{ fontSize: "28px", marginRight: "12px" }} />
					<span style={{ fontSize: "24px", color: "white" }}>
						{"Hi, " + localStorage.getItem("NAME")}
					</span>
				</Row>
			</Col>
			<Col>
				<Logout></Logout>
			</Col>
		</Row>
	);
};
