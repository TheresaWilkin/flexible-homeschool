import React from 'react';
import './Card.css';

export default function({className, onClick, children }) {
  return (
    <div
      className={`card ${className ? className : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
