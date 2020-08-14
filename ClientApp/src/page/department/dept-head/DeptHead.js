import { Route, Switch, useRouteMatch } from "react-router-dom";

import Header from "../../component/Header";
import MaintainAuthDelegation from "./MaintainAuthDelegation";
import MaintainDept from "./MaintainDept";
import React from "react";
import ReviewRequisition from "./ReviewRequisition";
import Sidebar from "../../component/Sidebar";

export default function DeptHead() {
	let { path } = useRouteMatch();
	const sideBarItem = [
		{ to: `${path}`, title: "Maintain Department" },
		{ to: `${path}/requisition`, title: "Review Requisition" },
		{ to: `${path}/delegation`, title: "Delegation" },
	];
	return (
		<div>
			<Header></Header>
			<div className="container-fluid">
				<div className="row">
					<Switch>
						<Sidebar items={sideBarItem}></Sidebar>
						<Route exact path={`${path}`}>
							<MaintainDept></MaintainDept>
						</Route>
						<Route path={`${path}/requisition`}>
							<ReviewRequisition></ReviewRequisition>
						</Route>
						<Route path={`${path}/delegation`}>
							<MaintainAuthDelegation></MaintainAuthDelegation>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}
