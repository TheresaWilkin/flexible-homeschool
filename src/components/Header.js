import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import '../styles/Header.css'
import logo from '../images/logo.png'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { gql, graphql } from 'react-apollo'

export const logout = () => {
  localStorage.removeItem(GC_USER_ID)
  localStorage.removeItem(GC_AUTH_TOKEN)
}

class Header extends Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    const school = userId && this._isLoggedIn() ? this.props.data.user.school : { name: '' }
    return (
      <div>
        <header className="row app-header">
          <h1>
            <img src={logo} className="app-header-logo" alt="Pile of books by Maria Kislitsina from the Noun Project"/>
            Flexible Homeschool
          </h1>
          <h2>{school.name}</h2>
        </header>
        <nav className="row header-nav">
          <Link to='/' className="nav-link one column">HOME</Link>
          <Link to='/acknowledgements' className="nav-link one column">ACKNOWLEDGEMENTS</Link>
          <div className="one column u-pull-right">
            {userId ?
              <div className="nav-link" onClick={() => {
                logout()
                this.props.history.push(`/`)
              }}>LOGOUT</div>
              :
              <Link to='/login' className="nav-link">LOGIN</Link>
            }
          </div>
        </nav>
      </div>
    )
  }

  componentWillMount() {
    if (!this.props.data.loading && !this.props.data.user) {
      logout()
    }
  }

  _isLoggedIn = () => {
    return this.props.data.user && this.props.data.user.id !== ''
  }

}

const userQuery = gql`
query {
  user {
    id
    name
    school {
      name
    }
  }
}
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only' }})(withRouter(Header))
