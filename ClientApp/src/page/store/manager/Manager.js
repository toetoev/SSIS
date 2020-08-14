import React, { Component } from "react";

import Header from "../../component/Header";

export default class Manager extends Component {
	render() {
		return (
			<div>
				<Header></Header>
				<div className="container-fluid">
					<div className="row">Manager Page</div>
				</div>
			</div>
		);
	}
}
