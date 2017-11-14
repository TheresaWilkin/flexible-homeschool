import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
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
};

const propTypes = {
  signupUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
};


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  render() {
    const {
      authenticated,
      error,
      errorMessage,
      handleSubmit,
    } = this.props;

    if (authenticated) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <Container style={{ justifyContent: 'center', paddingTop: '40px' }}>
      <Card>
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          name="username"
          type="text"
          component={FormInput}
          label="Username"
        />
        <br />
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
        <Field
          name="passwordConfirm"
          component={FormInput}
          type="password"
          label="Confirm Password"
        />
        <br />
        <ErrorMessage error={error} errorMessage={errorMessage} />
        <Button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign up</Button>
      </form>
      <i style={{ width: '100%', display: 'inline-block' }}>or <Link to="/signin">sign in</Link></i>
    </Card>
  </Container>
    );
  }
}

function validate(formProps) {
  const errors = {};

  ['username', 'email', 'password', 'passwordConfirm'].forEach(field => {
    if (!formProps[field]) {
      errors[field] = 'Required';
    }
  });

  if (formProps.email && !formProps.email.includes('@')) {
    errors.email = 'Please enter a valid email';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

Signup.defaultProps = defaultProps;

Signup.propTypes = propTypes;

const mapStateToProps = state => ({
  authenticated: getAuthenticated(state),
  errorMessage: getAuthErrorMessage(state),
  error: getAuthError(state),
});

const connectedComponent = connect(mapStateToProps, actions)(Signup);

export default reduxForm({
  form: 'signup',
  fields: ['username', 'email', 'password', 'passwordConfirm'],
  validate
})(connectedComponent);
