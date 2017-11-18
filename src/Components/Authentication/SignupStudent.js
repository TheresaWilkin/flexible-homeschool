import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import * as actions from '../../Actions';
import {
  getUserSchool,
  getStudentError,
  getStudentErrorMessage,
} from '../../Selectors';

import {
  FormInput,
  ErrorMessage,
} from '../Common';

import colors from '../Students/colors';

import Button from '../atoms/Button';
import Card from '../atoms/Card';
import CardHeader from '../atoms/CardHeader';
import Select from '../atoms/Select';

const defaultProps = {
  authenticated: false,
  errorMessage: '',
  error: false,
};

const propTypes = {
  signupStudent: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  school: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
};


class SignupStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'blue'
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const { school, signupStudent } = this.props;
    signupStudent({ ...formProps, school, color: this.state.color });
  }

  render() {
    const {
      error,
      errorMessage,
      handleSubmit,
    } = this.props;

    return (
      <Card>
        <CardHeader>New Student</CardHeader>
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
        <label htmlFor="color">Favorite Color
          <br />
          <Select
            id="color"
            style={{ width: '100%', backgroundColor: colors[this.state.color].color, color: '#000' }}
            value={this.state.color}
            handleChange={(e) => this.setState({ color: e.target.value })}
            options={Object.keys(colors).map(name => ({ id: name, name }))}
          />
        </label>
        <ErrorMessage error={error} errorMessage={errorMessage} />
        <Button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Student Account</Button>
      </form>
    </Card>
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
  errorMessage: getStudentErrorMessage(state),
  error: getStudentError(state),
  school: getUserSchool(state),
});

const connectedComponent = withRouter(connect(mapStateToProps, actions)(SignupStudent));

export default reduxForm({
  form: 'signupStudent',
  fields: ['username', 'password', 'passwordConfirm'],
  validate
})(connectedComponent);
