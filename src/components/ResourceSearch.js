import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import ResourceCard from './ResourceCard'
import '../styles/ResourceSearch.css'

class ResourceSearch extends Component {

  state = {
    resources: [],
    searchText: '',
    sortBy: 'stars'
  }

  componentDidMount() {
    this._executeSearch()
  }

  render() {
    return (
      <div>
        <div>
          <input
            type='text'
            placeholder="Title or keyword"
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
          <button
            onClick={() => this._executeSearch()}
          >
            OK
          </button>
        </div>
        <div className="search-divider">
          <button onClick={() => this.updateSortBy('stars')}>Popular</button>
          <button onClick={() => this.updateSortBy('date')}>Recent</button>
        </div>
        <div className="cards">
          {this.state.resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        </div>
      </div>
    )
  }

  updateSortBy(sortBy) {
    const resources = sortResources(this.state.resources, sortBy)
    console.log(resources)
    this.setState({ resources, sortBy })
  }

  _executeSearch = async () => {
    const { searchText } = this.state
    const result = await this.props.client.query({
      query: ALL_RESOURCES_SEARCH_QUERY,
      variables: { searchText }
    })
    const resources = sortResources(result.data.allResources.map(formatResource), this.state.sortBy)
    this.setState({ resources })
  }
}

const sortByStars = (a, b) => b.stars - a.stars
const sortByDate = (a, b) => {
    a = new Date(a.createdDate);
    b = new Date(b.createdDate);
    return a>b ? -1 : a<b ? 1 : 0;
}

const sortResources = (resources, sortedBy) => {
  return sortedBy === 'stars' ? resources.sort(sortByStars) : resources.sort(sortByDate);
}

const formatResource = (resource) => {
  return {
    ...resource,
    subject: truncateText(resource.subject, 11),
    description: truncateText(resource.description, 300),
    ages: determineAges(resource.ageVotes),
    stars: averageStars(resource.ratings, 0)
  }
}

const truncateText = (text, length) => {
  if (text.length > length) {
    return `${text.substr(0, length - 3)}...`
  } else {
    return text
  }
}

const sumAges = (sum, ageVote) => sum + ageVote.age

const averageAge = (ageVotes, defaultAge) => ageVotes.length > 0 ? ageVotes.reduce(sumAges, 0)/ageVotes.length : defaultAge

const determineAges = (ageVotes) => {
  const minimumAges = ageVotes.filter(ageVote => ageVote.minimumAge)
  const maximumAges = ageVotes.filter(ageVote => !ageVote.minimumAge)
  return {
    minimumAge: averageAge(minimumAges, 0),
    maximumAge: averageAge(maximumAges, 18)
  }
}

const sumStars = (sum, star) => sum + star.score

const averageStars = (stars, defaultStars) => stars.length > 0 ? stars.reduce(sumStars, 0)/stars.length : defaultStars

const ALL_RESOURCES_SEARCH_QUERY = gql`
  query AllResourcesSearchQuery($searchText: String!) {
    allResources(filter: {
      OR: [{
        name_contains: $searchText
      }, {
        description_contains: $searchText
      },
      {
        subject_contains: $searchText
      }]
    }) {
      id
      name
      description
      subject
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
  }
`

export default withApollo(ResourceSearch)
