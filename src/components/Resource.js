import React, { PureComponent } from 'react'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { formatResource } from '../utils'

class Resource extends PureComponent {
  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }
    const resource = formatResource(this.props.data.Resource)
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: 250, marginRight: 10 }}>
          <img src={resource.imageUrl}/>
        </div>
        <div style={{ display: "flex", flexDirection: "column"}}>
          <a href={resource.link}><h2 style={{ paddingLeft: 10 }}>{resource.name}</h2></a>
          <p>{resource.description}</p>
          <p>Ages: {resource.ages.minimumAge} - {resource.ages.maximumAge}</p>
          <p>Subject: {resource.subject}</p>
        </div>
        </div>
    )
  }

  _voteForLink = async () => {
    // ... you'll implement this in chapter 6
  }
}

const RESOURCE_QUERY = gql`query ResourceQuery($id: ID!) {
  Resource(id:$id) {
    id
    name
    description
    subject
    link
    imageUrl
    ageVotes {
      id
      age
      minimumAge
    }
    ratings {
      id
      score
    }
    createdDate
  }
}`

const ResourceWithData = graphql(RESOURCE_QUERY, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
})(withRouter(Resource))

export default ResourceWithData
