import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  disabled: false,
  type: 'submit',
  className: '',
  onClick: () => {},
};

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export function Button({
  children,
  onClick,
  disabled,
  type,
  className,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

Button.propTypes = propTypes;

export default Button;
