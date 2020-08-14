import { Route, Switch, useRouteMatch } from "react-router-dom";

import Header from "../../component/Header";
import AcknowledgeRequisition from "./AcknowledgeRequisition";
import React from "react";
import Sidebar from "../../component/Sidebar";


export default function DeptRep() {
	let { path } = useRouteMatch();
	return (
		<div>
			<Header></Header>
			<div className="container-fluid">
				<div className="row">
					<Switch>
						<Route path={`${path}`}>
							<Sidebar>Maintain Dept</Sidebar>
							<AcknowledgeRequisition></AcknowledgeRequisition>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}
