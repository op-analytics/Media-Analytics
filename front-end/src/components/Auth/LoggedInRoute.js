import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoggedInRoute = ({ component: Component, ...routeProps }) => {
  const isAuthenticated = useSelector(state => state.user.authenticated);
  return (
    <Route
      //eslint-disable-next-line react/jsx-props-no-spreading
      {...routeProps}
      render={props =>
        isAuthenticated === true ? (
          //eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )}
    />
  );
};

LoggedInRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default LoggedInRoute;
