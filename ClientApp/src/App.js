import "./App.css";

import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Department from "./page/department/Department";
import DeptRole from "./constant/DeptRole";
import Login from "./page/login/Login";
import { PrivateRoute } from "./component/PrivateRoute";
import Store from "./page/store/Store";
import StoreRole from "./constant/StoreRole";

export default class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<PrivateRoute
						path="/dept"
						roles={Object.values(DeptRole)}
						component={Department}
					/>
					<PrivateRoute
						path="/store"
						roles={Object.values(StoreRole)}
						component={Store}
					/>
				</Switch>
			</Router>
		);
	}
}
