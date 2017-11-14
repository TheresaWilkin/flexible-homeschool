import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  getAuthenticated,
} from '../../Selectors/auth';

const defaultProps = {
  authenticated: false,
  location: '/',
};

const propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  location: PropTypes.shape(),
};

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      )}
    />
  );
}

PrivateRoute.defaultProps = defaultProps;

PrivateRoute.propTypes = propTypes;

function mapStateToProps(state) {
  return { authenticated: getAuthenticated(state) };
}

export default connect(mapStateToProps)(PrivateRoute);
