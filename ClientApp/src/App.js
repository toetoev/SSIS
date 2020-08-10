import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Admin } from "./page/admin/Admin";
import AdminRole from "./constant/AdminRole";
import { Department } from "./page/department/Department";
import DeptRole from "./constant/DeptRole";
import Login from "./page/login/Login";
import { PrivateRoute } from "./common/PrivateRoute";
import { Store } from "./page/store/Store";
import StoreRole from "./constant/StoreRole";

export default class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<PrivateRoute
						path="/dept"
						roles={[Object.values(DeptRole)]}
						component={Department}
					/>
					<PrivateRoute
						path="/store"
						roles={[Object.values(StoreRole)]}
						component={Store}
					/>
					<PrivateRoute path="/admin" roles={[AdminRole]} component={Admin} />
					<Route path="/" component={Login} />
				</Switch>
			</Router>
		);
	}
}
