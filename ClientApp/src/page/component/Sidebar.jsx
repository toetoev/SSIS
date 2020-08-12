import React, { Component } from "react";

export class Sidebar extends Component {
	render() {
		return (
			<nav class="col-md-3 col-lg-2 d-md-block sidebar collapse">
				<div class="sidebar-sticky pt-3">
					<ul class="nav flex-column">
						<li class="nav-item">
							<a class="nav-link">
								<i class="fas fa-user-plus mr-1"></i>
								Register
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link active">
								<i class="far fa-address-book mr-2"></i>
								Manage Employees
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Sidebar;
