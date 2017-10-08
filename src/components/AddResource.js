import React, { Component } from 'react'
import { gql, graphql, compose } from 'react-apollo'
import ReactStars from 'react-stars'

class AddResource extends Component {
  state = {
    name: "",
    description: "",
    link: "",
    rating: 0,
    tags: []
  }


  render() {
    return (
      <div>
        <input onChange={(name) => this.setState({ name })} placeholder="name (required)" value={this.state.name} />
        <br />
        <input onChange={(link) => this.setState({ link })} placeholder="link" value={this.state.link} />
        <br />
        <ReactStars
        count={5}
        onChange={(newRating) => this.setState({ rating: parseInt(newRating, 10) })}
        size={24}
        color2={'#ffd700'} />
        <br />
        <textarea onChange={(description) => this.setState({ description })} placeholder="description (required)" value={this.state.description} />
      </div>
    )
  }

}

// export const LoginMock = Login;
//
// export default compose(
//   graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
//   graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
// )(Login)

export default AddResource;
