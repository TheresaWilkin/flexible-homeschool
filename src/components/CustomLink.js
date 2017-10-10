import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import '../styles/CustomLink.css'

const CustomLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div className={match ? 'active' : ''}>
      <Link to={to}>{label}</Link>
    </div>
  )}/>
)

export default CustomLink
