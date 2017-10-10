import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CustomLink from './CustomLink'
import PrivateRoute from './PrivateRoute'
import '../styles/Resources.css'
import ResourceSearch from './ResourceSearch'
import Resource from './Resource'

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
          <Route path='/resources/search' component={ResourceSearch} />
          <Route path='/resources/resource/:id' component={Resource} />
          <Route exact path='/resources' render={() => <h2>HOME</h2>} />
          <Route path='/resources' render={() => <h2>Coming soon</h2>} />
        </Switch>
      </div>
    )
  }
}

export default Resources
