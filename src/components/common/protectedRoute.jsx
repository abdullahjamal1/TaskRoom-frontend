import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      exact
      path={path}
      render={(props) => {
        if (!auth.getCurrentUser()) {
          return (
            <Redirect
              to={{
                pathname: "/register",
                state: { from: props.location },
              }}
            />
          );
        }
        return Component ? (
          <>
            <Route path={path} component={Component} />
            <Redirect to={props.location} />
          </>
        ) : (
          render(props)
        );
      }}
    />
  );
};

export default ProtectedRoute;
