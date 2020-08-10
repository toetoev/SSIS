import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

export class Store extends Component {
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
			</div>
		);
	}
}

export default Store;
