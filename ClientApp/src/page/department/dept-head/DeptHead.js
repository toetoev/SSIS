import { Route, Switch, useRouteMatch } from "react-router-dom";

import Header from "../../component/Header";
import MaintainDeptForm from "./MaintainDeptForm";
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
							<Sidebar>Maintain Departments</Sidebar>
							<MaintainDeptForm></MaintainDeptForm>
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
