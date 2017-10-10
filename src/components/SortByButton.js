import React, { PureComponent } from 'react'

const SortByButton = (props) => {
  const { sortBy, type, currentSortBy } = props
  return <button onClick={() => sortBy(type)} style={getButtonStyle(currentSortBy, type)}>{type === 'stars' ? 'Popular' : 'Recent'}</button>
}

const getButtonStyle = (sortBy, type) => {
  return sortBy === type ? { fontWeight:"bold"} : {}
}

export default SortByButton
