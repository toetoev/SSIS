import { Link } from "react-router-dom";
import React from "react";

export default function Sidebar({ items }) {
	return (
		<nav className="col-md-3 col-lg-2 d-md-block sidebar collapse">
			<div className="sidebar-sticky pt-3">
				<ul className="nav flex-column">
					{items.map((item) => (
						<li className="nav-item" key={item.title}>
							<Link to={item.to}>{item.title}</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
