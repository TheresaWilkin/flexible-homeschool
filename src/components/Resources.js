import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CustomLink from './CustomLink'
import PrivateRoute from './PrivateRoute'
import '../styles/Resources.css'

class Resources extends Component {
  render() {
    return (
      <div>
        <nav className="sub-nav">
          <CustomLink to="/resources" activeOnlyWhenExact={true}  label="Resources Home" />
          <CustomLink to="/resources/search" label="Search Resources" />
          <CustomLink to="/resources/add" label="Add a Resource" />
          <CustomLink to="/resources/favorites" label="View Favorite Resources" />
        </nav>
        <Switch>
          <Route path='/' render={() => <h2>Coming soon</h2>} />
        </Switch>
      </div>
    )
  }
}

export default Resources
