import React from 'react';
import './Button.css';

class Button extends React.Component {
  render() {
    const { className, children, onClick, disabled, style } = this.props;
    return (
      <button
        className={`button ${className ? className : ''}`}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        {children}
      </button>
    );
  }
}

export default Button;
