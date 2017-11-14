import React from 'react';
import PropTypes from 'prop-types';
import '../atoms/TextInput.css';

const defaultProps = {
  input: '',
  label: '',
  type: 'submit',
  meta: {
    touched: false,
    error: '',
    warning: '',
  },
};

const propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export const FormInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <label htmlFor={label} className="textinput-label">{label}
    <input {...input} id={label} placeholder={label} type={type} className="textinput" />
    {touched && ((error && <span className="textinput-error">{error}</span>) || (warning && <span>{warning}</span>))}
  </label>
);

FormInput.defaultProps = defaultProps;

FormInput.propTypes = propTypes;

export default FormInput;
