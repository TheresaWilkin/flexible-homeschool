import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import * as actions from '../../Actions';
import {
  getUserSchool,
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
  school: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
};


class SignupStudent extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const { school, history } = this.props;
    this.props.signupUser({ ...formProps, school, role: 'student', history });
  }

  render() {
    const {
      error,
      errorMessage,
      handleSubmit,
    } = this.props;

    return (
      <Container style={{ justifyContent: 'center', paddingTop: '40px' }}>
      <Card>
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          name="username"
          type="text"
          component={FormInput}
          label="Student Username"
        />
        <br />
        <Field
          name="password"
          component={FormInput}
          type="password"
          label="Student Password"
        />
        <br />
        <Field
          name="passwordConfirm"
          component={FormInput}
          type="password"
          label="Confirm Student Password"
        />
        <br />
        <ErrorMessage error={error} errorMessage={errorMessage} />
        <Button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Student Account</Button>
      </form>
    </Card>
  </Container>
    );
  }
}

function validate(formProps) {
  const errors = {};

  ['username', 'password', 'passwordConfirm'].forEach(field => {
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

SignupStudent.defaultProps = defaultProps;

SignupStudent.propTypes = propTypes;

const mapStateToProps = state => ({
  errorMessage: getAuthErrorMessage(state),
  error: getAuthError(state),
  school: getUserSchool(state),
});

const connectedComponent = withRouter(connect(mapStateToProps, actions)(SignupStudent));

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'passwordConfirm'],
  validate
})(connectedComponent);
