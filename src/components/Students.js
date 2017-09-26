import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { gql, graphql, compose } from 'react-apollo'

class Students extends Component {

  render() {
    if (this.props.data.loading) {
      return <p>Loading...</p>
    }
    if (this.props.data.errors){
      return <div>{this.props.data.errors.map(error => <p>{error.message}</p>)}</div>
    }
    return (
      <div>
        <h2>Students</h2>
        {this.props.data.user.school.users.map(user => {
          if (user.role === 'STUDENT') {
            return <p key={user.id}>{user.name}</p>
          }
        })}
      </div>
    )
  }


}



const studentsQuery = gql`
query {
  user {
    id
    school {
      id
      users {
        id
        name
        role
      }
    }
  }
}
`

export const StudentsMock = Students;

export default graphql(studentsQuery, { options: {fetchPolicy: 'network-only' }})(withRouter(Students))
