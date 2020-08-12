import React, { Component } from "./node_modules/react";

export class DeptHead extends Component {
	render() {
		return (
			<Switch>
				<Route path={`${path}/dept-head`} roles={[DeptRole.DeptHead]}>
					<Sidebar></Sidebar>
					<MaintainDeptForm></MaintainDeptForm>
				</Route>
				<PrivateRoute path={`${path}/dept-rep`} roles={[DeptRole.DeptRep]}>
					<Sidebar></Sidebar>
					<MaintainDeptForm></MaintainDeptForm>
				</PrivateRoute>
				<PrivateRoute path={`${path}/employee`} roles={[DeptRole.Employee]}>
					<Sidebar></Sidebar>
					<MaintainDeptForm></MaintainDeptForm>
				</PrivateRoute>
			</Switch>
		);
	}
}

export default DeptHead;
