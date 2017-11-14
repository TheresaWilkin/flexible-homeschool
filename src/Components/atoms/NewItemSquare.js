import React from 'react';
import './NewItemSquare.css';

export default ({ text, onClick }) => (
  <div className="new-item-square" onClick={onClick}>
    <span className="new-item-plus">+</span>
    <p className="new-item-text">{text}</p>
  </div>
);
