import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  makeIsAuthorized,
} from '../../Selectors/auth';
import Unauthorized from './Unauthorized';

const propTypes = {
  authorized: PropTypes.bool.isRequired,
};

const Authorization = authorizedRoles =>
  (WrappedComponent) => {
    const WithAuthorization = ({ authorized }) => {
      if (authorized) {
        return <WrappedComponent {...this.props} />;
      }
      return <Unauthorized />;
    };

    const makeMapStateToProps = () => {
      const isUserAuthorized = makeIsAuthorized(authorizedRoles);
      const mapStateToProps = state => ({
        authorized: isUserAuthorized(state),
      });
      return mapStateToProps;
    };

    WithAuthorization.propTypes = propTypes;

    return connect(makeMapStateToProps)(WithAuthorization);
  };

export default Authorization;
