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
          <div className="app-header-image-container">
            <img src={logo} className="app-header-image" alt="Pile of books by Maria Kislitsina from the Noun Project"/>
          </div>
          <div className="app-header-text">
            <h1>
              Flexible Homeschool
            </h1>
          </div>
          <h2>{school.name}</h2>
        </header>
        <nav className="header-nav">
          <div className="u-pull-right">
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

export const HeaderMock = Header;

export default graphql(userQuery, { options: {fetchPolicy: 'network-only' }})(withRouter(Header))
