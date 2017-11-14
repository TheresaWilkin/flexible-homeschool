import React from 'react';
import './Breadcrumbs.css'

const Breadcrumb = ({ link }) => <li className="breadcrumb"><a href={link.url}>{link.name}</a></li>

export default ({ links, current }) => (
  <ul className="breadcrumbs">
    {links.map((link, i) => <Breadcrumb link={link} key={i} />)}
    <li className="breadcrumbs-current">{current}</li>
  </ul>
);
