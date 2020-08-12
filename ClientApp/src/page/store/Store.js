import { Switch, useRouteMatch } from "react-router-dom";

import Clerk from "./clerk/Clerk";
import Manager from "./manager/Manager";
import { PrivateRoute } from "../../component/PrivateRoute";
import React from "react";
import StoreRole from "../../constant/StoreRole";
import Supervisor from "./supervisor/Supervisor";

export default function Store() {
	let { path } = useRouteMatch();
	return (
		<Switch>
			<PrivateRoute
				path={`${path}/manager`}
				roles={[StoreRole.Manager]}
				component={Manager}
			></PrivateRoute>
			<PrivateRoute
				path={`${path}/supervisor`}
				roles={[StoreRole.Supervisor]}
				component={Supervisor}
			></PrivateRoute>
			<PrivateRoute
				path={`${path}/clerk`}
				roles={[StoreRole.Clerk]}
				component={Clerk}
			></PrivateRoute>
		</Switch>
	);
}
