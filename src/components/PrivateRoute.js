import React from 'react';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import { GC_USER_ID } from '../constants'

class PrivateRoute extends React.PureComponent {
  state = {
    authorized: false,
    loggedIn: false,
    loading: true
  }

  componentDidMount() {
    const loggedIn = !this.props.data.user ? false : true;
    const authorized = this._isAuthorized(this.props.data.user, this.props.authRoles);
    const loading = this.props.data.loading;
    this.setState({ loggedIn, authorized, loading });
  }

  _isAuthorized(user, authRoles) {
    if (!user) {
      return false;
    }
    let authorized = false;
    authRoles.forEach(authRole => {
      if (user.role === authRole) {
        return authorized = true;
      }
    });
    return authorized;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user !== this.props.data.user) {
      const loggedIn = !this.props.data.user ? false : true;
      const authorized = this._isAuthorized(nextProps.data.user, nextProps.authRoles);
      const loading = nextProps.data.loading;
      this.setState({ loggedIn, authorized, loading });
    }
  }

  render() {
    const { component: Component, authRoles, ...rest } = this.props;
    const { loggedIn, authorized, loading } = this.state;
    return (
      <Route {...rest} render={props => {
        if (loggedIn && authorized) {
          return <Component {...props}/>
        } else if (loggedIn && !authorized) {
          return <p>You are not authorized to access this page.</p>
        } else if (loading) {
          return <div className="spinner"></div>;
        } else {
          return <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        }
      }}/>
    )
  }
}

const userQuery = gql`
  query {
    user {
      id
      role
    }
  }
`

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(withRouter(PrivateRoute))
