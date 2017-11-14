import React from 'react';
import { connect } from 'react-redux';

import { makeIsAuthorized } from '../../Selectors/auth';

export default function AuthorizedItem(authorizedRoles) {
  return (Component) => {
    const Authorized = props => (props.authorized ? <Component {...props} /> : null);

    const makeMapStateToProps = () => {
      const isUserAuthorized = makeIsAuthorized(authorizedRoles);
      const mapStateToProps = state => ({
        authorized: isUserAuthorized(state),
      });
      return mapStateToProps;
    };

    return connect(makeMapStateToProps)(Authorized);
  };
}
