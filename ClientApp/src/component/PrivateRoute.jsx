import { Redirect, Route } from "react-router-dom";

import React from "react";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			const isAuthenticated = localStorage.getItem("ACCESS_TOKEN") !== null;
			const currentRole = localStorage.getItem("ROLE");
			if (!isAuthenticated) {
				return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
			}
			if (!roles.includes(currentRole)) {
				return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
			}
			return <Component {...props} />;
		}}
	/>
);
