import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import ResourceCard from './ResourceCard'
import SortByButton from './SortByButton'
import '../styles/ResourceSearch.css'
import { formatResource } from '../utils'

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
            Search
          </button>
        </div>
        <div className="search-divider">
          <SortByButton sortBy={this.updateSortBy.bind(this)} type="stars" currentSortBy={this.state.sortBy} />
          <SortByButton sortBy={this.updateSortBy.bind(this)} type="date" currentSortBy={this.state.sortBy} />
        </div>
        <div className="cards">
          {this.state.resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        </div>
      </div>
    )
  }

  updateSortBy(sortBy) {
    const resources = sortResources(this.state.resources, sortBy)
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
