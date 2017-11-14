import React from 'react';
import './TextInput.css';

class TextInput extends React.Component {
  state = {
    error: '',
    value: '',
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(input) {
    this.setState({ value: input });
  }

  handleEndInput(input) {
    const { validate, errorMessage, handleEndInput } = this.props;
    const formattedInput = input.trim();
    if (!formattedInput) {
      return;
    }

    const isValid = validate(formattedInput);
    if (!isValid) {
      this.setState({ error: errorMessage || 'Invalid input' });
      return;
    }

    this.setState({ error: '' });
    handleEndInput(formattedInput);
  }

  handleKeyPress(key) {
    if (key === 'Enter') {
      this.handleEndInput(this.state.value)
    }
  }

  render() {
    const { htmlFor, label, placeholder, required } = this.props;

    return (
      <label htmlFor={htmlFor} className="textinput-label">
        {required && <span className="textinput-required">*</span>}
        {label}
        <input
          placeholder={placeholder}
          value={this.state.value}
          id={htmlFor}
          onChange={(e) => this.handleChange(e.target.value)}
          className="textinput"
          onBlur={() => this.handleEndInput(this.state.value)}
          onKeyPress={(e) => this.handleKeyPress(e.key)}
        />
        <p className="textinput-error">{this.state.error}</p>
      </label>
    );
  }
}

export default TextInput;
