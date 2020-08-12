import React, { Component } from "react";

import { Navbar } from "../../component/Navbar";

export class Employee extends Component {
	render() {
		return (
			<div>
				<Navbar></Navbar>
				<div className="container-fluid">
					<div className="row">Employee Page</div>
				</div>
			</div>
		);
	}
}

export default Employee;
