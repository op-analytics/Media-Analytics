import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/**
 * A component that wraps react-router-dom's route
 * component to only allow users that are logged in
 * access to a route
 *
 * @component
 */
const LoggedInRoute = ({ component: Component, ...routeProps }) => {
  const isAuthenticated = useStoreState((state) => state.user.authenticated);
  return (
    <Route
      {...routeProps}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

LoggedInRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default LoggedInRoute;
