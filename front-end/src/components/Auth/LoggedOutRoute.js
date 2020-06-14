import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const LoggedOutRoute = ({ component: Component, ...rest }) => {
  const authenticated = useStoreState(state => state.user.authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

LoggedOutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default LoggedOutRoute;
