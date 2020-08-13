import { Route, Switch, useRouteMatch } from "react-router-dom";

import Header from "../../component/Header";
import MaintainDeptForm from "./MaintainDeptForm";
import React from "react";
import Sidebar from "../../component/Sidebar";
import MaintainAuthDelegation from "./MaintainAuthDelegation"

export default function DeptHead() {
	let { path } = useRouteMatch();
	return (
		<div>
			<Header></Header>
			<div className="container-fluid">
				<div className="row">
					<Switch>
						<Route exact path={`${path}`}>
							<Sidebar>Maintain Dept</Sidebar>
							<MaintainDeptForm></MaintainDeptForm>
						</Route>
						<Route path={`${path}/delegation`}>
							<Sidebar>Delegation</Sidebar>
							<MaintainAuthDelegation></MaintainAuthDelegation>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}
