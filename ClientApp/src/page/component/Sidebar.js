import React from "react";

export default function Sidebar() {
	return (
		<nav className="col-md-3 col-lg-2 d-md-block sidebar collapse">
			<div className="sidebar-sticky pt-3">
				<ul className="nav flex-column">
					<li className="nav-item">
						<a className="nav-link">
							<i className="fas fa-user-plus mr-1"></i>
							Maintain Department
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active">
							<i className="far fa-address-book mr-2"></i>
							Review Requisitions
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
