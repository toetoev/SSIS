import { Switch, useRouteMatch } from "react-router-dom";

import DeptHead from "./dept-head/DeptHead";
import DeptRep from "./dept-rep/DeptRep";
import DeptRole from "../../constant/DeptRole";
import Employee from "./employee/Employee";
import { PrivateRoute } from "../../component/PrivateRoute";
import React from "react";

export default function Department() {
	let { path } = useRouteMatch();
	return (
		<Switch>
			<PrivateRoute
				path={`${path}/dept-head`}
				roles={[DeptRole.DeptHead]}
				component={DeptHead}
			></PrivateRoute>
			<PrivateRoute
				path={`${path}/dept-rep`}
				roles={[DeptRole.DeptRep]}
				component={DeptRep}
			></PrivateRoute>
			<PrivateRoute
				path={`${path}/employee`}
				roles={[DeptRole.Employee]}
				component={Employee}
			></PrivateRoute>
		</Switch>
	);
}
