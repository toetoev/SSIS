import { Col, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";
import React from "react";

export default function Sidebar({ items }) {
	return (
		<Col md={2}>
			<Nav className="flex-column">
				<Nav.Item>
					{items.map((item) => (
						<li className="nav-item" key={item.title}>
							<Link to={item.to}>{item.title}</Link>
						</li>
					))}
				</Nav.Item>
			</Nav>
		</Col>
	);
}
