import "../../css/dashboard.css";

import { Switch, useRouteMatch } from "./node_modules/react-router-dom";

import DeptHead from "./dept-head/DeptHead";
import DeptRep from "./dept-rep/DeptRep";
import DeptRole from "../../constant/DeptRole";
import Employee from "./employee/Employee";
import Navbar from "../component/Navbar";
import { PrivateRoute } from "../../component/PrivateRoute";
import React from "./node_modules/react";

export default function Department() {
	let { path, url } = useRouteMatch();
	return (
		<div>
			<Navbar></Navbar>
			<div class="container-fluid">
				<div class="row">
					<Switch>
						<PrivateRoute path={`${path}/dept-head`} roles={[DeptRole.DeptHead]}>
							<DeptHead></DeptHead>
						</PrivateRoute>
						<PrivateRoute path={`${path}/dept-rep`} roles={[DeptRole.DeptRep]}>
							<DeptRep></DeptRep>
						</PrivateRoute>
						<PrivateRoute path={`${path}/employee`} roles={[DeptRole.Employee]}>
							<Employee></Employee>
						</PrivateRoute>
					</Switch>
				</div>
			</div>
		</div>
	);
}
