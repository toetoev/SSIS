import React, { Component } from "react";

import Header from "../../component/Header";

export default class Employee extends Component {
	render() {
		return (
			<div>
				<Header></Header>
				<div className="container-fluid">
					<div className="row">Employee Page</div>
				</div>
			</div>
		);
	}
}
