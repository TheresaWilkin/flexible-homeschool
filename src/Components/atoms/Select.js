import React from 'react';
import './Select.css';

const Option = ({ id, name }) => (
  <option value={id} className="option">
    {name}
  </option>
);

export default ({ value, handleChange, options, style }) => (
  <select className="select" value={value} onChange={handleChange} style={style}>
    {options.map(option => <Option {...option} key={option.id} />)}
  </select>
);
