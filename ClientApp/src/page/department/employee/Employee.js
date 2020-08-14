import { Route, Switch, useRouteMatch } from "react-router-dom";

import Header from "../../component/Header";
import MaintainRequisitionForm from "./MaintainRequisitionForm";
import React from "react";
import Sidebar from "../../component/Sidebar";

export default function Employee() {
	let { path } = useRouteMatch();
	return (
		<div>
			<Header></Header>
			<div className="container-fluid">
				<div className="row">
					<Switch>
						<Route path={`${path}`}>
							<Sidebar>Maintain Dept</Sidebar>
							<MaintainRequisitionForm></MaintainRequisitionForm>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}
