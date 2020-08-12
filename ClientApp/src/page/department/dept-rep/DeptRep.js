import React, { Component } from "react";

import { Navbar } from "../../component/Navbar";

export class DeptRep extends Component {
	render() {
		return (
			<div>
				<Navbar></Navbar>
				<div className="container-fluid">
					<div className="row">DeptRep</div>
				</div>
			</div>
		);
	}
}

export default DeptRep;
