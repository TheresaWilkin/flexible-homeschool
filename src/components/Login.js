import React, { Component } from 'react'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { gql, graphql, compose } from 'react-apollo'
import '../styles/Login.css'

class Login extends Component {

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
    error: ''
  }

  render() {
    return (
      <div>
        <h4>{this.state.login ? 'Login' : 'Sign Up'}</h4>
        <div className="row">
          {!this.state.login &&
          <input
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='Your name'
          />}
          <div className="row">
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />
        </div>
        <div className="row">
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        </div>
          <div className="row">
          <button className="button-primary"
            onClick={() => this._confirm()}
          >
            {this.state.login ? 'login' : 'create account' }
          </button>
        </div>
        <div className="row">
          <button
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </div>
        <div className="row">
          <p>{this.state.error}</p>
        </div>
      </div>
    )
  }

  _confirm = async () => {
    const { name, email, password } = this.state
    if (this.state.login) {
      try {
        const result = await this.props.signinUserMutation({
          variables: {
            email,
            password
          }
        })
        const id = result.data.signinUser.user.id
        const token = result.data.signinUser.token
        this._saveUserData(id, token)
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        this.props.history.push(from)
      } catch (err) {
        this.setState({ error: err.message })
      }
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this._saveUserData(id, token)
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      this.props.history.push(from)
    }
  }

  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`
export const LoginMock = Login;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login)
