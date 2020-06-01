import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const LoggedInRoute = ({ component: Component, ...routeProps }) => {
  const isAuthenticated = useStoreState(state => state.user.authenticated);
  return (
    <Route
      {...routeProps}
      render={props =>
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
