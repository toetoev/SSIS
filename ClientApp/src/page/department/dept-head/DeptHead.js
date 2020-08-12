import Header from "../../component/Header";
import React from "react";

export default function DeptHead() {
	// let { path, url } = useRouteMatch();

	return (
		// <Switch>
		// 	<Route path={`${path}/dept-head`} roles={[DeptRole.DeptHead]}>
		// 		<Sidebar>Maintain Dept</Sidebar>
		// 		<MaintainDeptForm></MaintainDeptForm>
		// 	</Route>
		// 	{/* <PrivateRoute path={`${path}/dept-rep`} roles={[DeptRole.DeptRep]}>
		// 			<Sidebar></Sidebar>
		// 			<MaintainDeptForm></MaintainDeptForm>
		// 		</PrivateRoute>
		// 		<PrivateRoute path={`${path}/employee`} roles={[DeptRole.Employee]}>
		// 			<Sidebar></Sidebar>
		// 			<MaintainDeptForm></MaintainDeptForm>
		// 		</PrivateRoute> */}
		// </Switch>
		<div>
			<Header></Header>
			<div className="container-fluid">
				<div className="row">
					<div>DeptHead Page</div>
				</div>
			</div>
		</div>
	);
}
