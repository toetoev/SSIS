import { Route, Switch, useRouteMatch } from "react-router-dom";

import Header from "../../component/Header";
import MaintainDeptForm from "./MaintainDeptForm";
import React from "react";
import Sidebar from "../../component/Sidebar";

export default function DeptHead() {
	let { path } = useRouteMatch();
	return (
		<div>
			<Header></Header>
			<div className="container-fluid">
				<div className="row">
					<Switch>
						<Route path={`${path}`}>
							<Sidebar>Maintain Dept</Sidebar>
							<MaintainDeptForm></MaintainDeptForm>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
}
