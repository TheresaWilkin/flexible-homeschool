import React from 'react';
import './TooltipMenu.css';
import Button from './Button';

class TooltipMenu extends React.Component {
  render() {
    const { className, links, label, style } = this.props;
    return (
      <div className={`tooltip-menu ${className}`} style={style}>
        <Button
          style={{
            color: "var(--main-color)",
            backgroundColor: "#ddd",
            fontWeight: 'bold',
            fontSize: '24px',
            paddingTop: 0,
            paddingBottom: '10px',
          }}>{label}</Button>
        <div className="tooltip-menu-content">
          {links.map((link, i) => <a href={link.url} key={i}>{link.name}</a>)}
        </div>
      </div>
    )
  }
}

export default TooltipMenu;
