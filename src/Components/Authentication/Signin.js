import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import * as actions from '../../Actions';
import {
  getAuthenticated,
  getAuthErrorMessage,
  getAuthError,
} from '../../Selectors/auth';

import {
  FormInput,
  ErrorMessage,
} from '../Common';

import Button from '../atoms/Button';
import Card from '../atoms/Card';
import Container from '../atoms/Container';

const defaultProps = {
  authenticated: false,
  errorMessage: '',
  error: false,
  location: { state: { from: { pathname: '/' } } },
};

const propTypes = {
  signinUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  location: PropTypes.shape({ state: PropTypes.object }),
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
};


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ email, password }) {
    if (!!email && !!password) {
      this.props.signinUser({ email, password });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const {
      authenticated,
      error,
      errorMessage,
      handleSubmit,
    } = this.props;

    if (authenticated) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <Container>
      <Card>
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          name="email"
          type="email"
          component={FormInput}
          label="Email"
        />
        <br />
        <Field
          name="password"
          component={FormInput}
          type="password"
          label="Password"
        />
        <br />
        <ErrorMessage error={error} errorMessage={errorMessage} />
        <Button type="submit" className="btn btn-primary">Sign in</Button>
      </form>
    </Card>
  </Container>
    );
  }
}

Signin.defaultProps = defaultProps;

Signin.propTypes = propTypes;

const mapStateToProps = state => ({
  authenticated: getAuthenticated(state),
  errorMessage: getAuthErrorMessage(state),
  error: getAuthError(state),
});

const connectedComponent = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password '],
})(connectedComponent);
