import { Redirect, Route } from "react-router-dom";

import React from "react";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			const isAuthenticated = localStorage.getItem("ACCESS_TOKEN") !== null;
			const currentRole = localStorage.getItem("ROLE");
			if (!isAuthenticated) {
				// not logged in so redirect to login page with the return url
				return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
			}
			// check if route is restricted by role
			if (roles && roles.indexOf(currentRole) === -1) {
				// role not authorized so redirect to home page
				return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
			}

			// authorized so return component
			return <Component {...props} />;
		}}
	/>
);
