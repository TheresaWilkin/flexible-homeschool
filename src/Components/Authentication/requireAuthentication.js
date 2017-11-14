import React from 'react';
import { connect } from 'react-redux';

import { getAuthenticated } from '../../Selectors/auth';

export default function (Component) {
  const AuthenticatedItem = props => (props.authenticated ? <Component {...props} /> : null);

  function mapStateToProps(state) {
    return { authenticated: getAuthenticated(state) };
  }

  return connect(mapStateToProps)(AuthenticatedItem);
}
