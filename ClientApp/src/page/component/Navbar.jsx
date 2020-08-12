import React, { Component } from "react";

export class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-dark sticky-top bg-lightblue flex-md-nowrap p-0 shadow">
				<a
					className="navbar-brand brand bg-lightblue col-md-3 col-lg-2 mr-0 px-3"
					href="#"
					id="username"
				>
					Hello
				</a>
				<ul className="navbar-nav px-3">
					<li className="nav-item text-nowrap">
						<a className="nav-link text-white" href="#" id="signOut">
							Sign out
						</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navbar;
