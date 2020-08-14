import React, { Component } from "react";

import Header from "../../component/Header";

export default class Clerk extends Component {
	render() {
		return (
			<div>
				<Header></Header>
				<div className="container-fluid">
					<div className="row">Clerk Page</div>
				</div>
			</div>
		);
	}
}
