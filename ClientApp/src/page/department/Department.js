import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "../component/Navbar";

export default class Department extends Component {
	render() {
		return (
			<div>
				{/* <Switch>
					<Route exact path={path}>
						<h3>Please select a topic.</h3>
					</Route>
					<Route path={`${path}/:topicId`}>
						<Topic />
					</Route>
				</Switch> */}
				{/* <Navbar></Navbar>
				<div class="container-fluid">
					<div class="row">
						<nav class="col-md-3 col-lg-2 d-md-block sidebar collapse">
							<div class="sidebar-sticky pt-3">
								<section>Menu</section>
							</div>
						</nav>

						<main>Main</main>
					</div>
				</div> */}
				<h1>Department</h1>
			</div>
		);
	}
}
