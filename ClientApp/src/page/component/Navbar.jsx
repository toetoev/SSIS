import React, { Component } from "react";

export class Navbar extends Component {
	render() {
		return (
			<nav class="navbar navbar-dark sticky-top bg-lightblue flex-md-nowrap p-0 shadow">
				<a
					class="navbar-brand brand bg-lightblue col-md-3 col-lg-2 mr-0 px-3"
					href="#"
					id="username"
				>
					Hello
				</a>
				<ul class="navbar-nav px-3">
					<li class="nav-item text-nowrap">
						<a class="nav-link text-white" href="#" id="signOut">
							Sign out
						</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navbar;
