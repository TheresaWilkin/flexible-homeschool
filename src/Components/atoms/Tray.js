import React from 'react';
import './Tray.css';

export default ({ children, style }) => (
  <div className="tray" style={style}>{children}</div>
);
