import { Route, Switch, useRouteMatch } from "react-router-dom";

import Header from "../../component/Header";
import MaintainAuthDelegation from "./MaintainAuthDelegation";
import MaintainDept from "./MaintainDept";
import React from "react";
import ReviewRequisition from "./ReviewRequisition";
import Sidebar from "../../component/Sidebar";

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
							<MaintainDept></MaintainDept>
						</Route>
						<Route path={`${path}/delegation`}>
							<Sidebar>Delegation</Sidebar>
							<MaintainAuthDelegation></MaintainAuthDelegation>
						</Route>
						<Route path={`${path}/requisition`}>
							<Sidebar>Review Requisitions</Sidebar>
							<ReviewRequisition></ReviewRequisition>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}
