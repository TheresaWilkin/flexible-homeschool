import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavItem = ({ link }) => (
  <li className="nav-item" style={link.style}><Link to={link.url}>{link.name}</Link></li>
)
export default ({ links, current }) => (
  <ul className="navbar">
    {links.map((link, i) => <NavItem link={link} key={i} />)}
  </ul>
);
