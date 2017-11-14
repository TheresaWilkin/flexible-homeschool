import React from 'react';
import { Link, Route } from 'react-router-dom';
import './NavBar.css'

const NavItem = ({ link }) => (
  <li className="nav-item"><Link to={link.url}>{link.name}</Link></li>
)
export default ({ links, current }) => (
  <ul className="navbar">
    {links.map((link, i) => <NavItem link={link} key={i} />)}
  </ul>
);
