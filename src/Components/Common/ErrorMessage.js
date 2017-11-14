import React from 'react';

export const ErrorMessage = ({ error, errorMessage }) => error && (
  <div className="alert alert-danger">
    <strong>Oops!</strong> {errorMessage}
  </div>
);

export default ErrorMessage;
