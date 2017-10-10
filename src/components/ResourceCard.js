import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'
import '../styles/ResourceCard.css'

class ResourceCard extends PureComponent {
  render() {
    const { resource } = this.props;
    const { subject, description, ages, stars } = resource;
    return (
      <Link className="card" to={`/resources/resource/${resource.id}`}>
        <span className="card-header" style={{backgroundImage:`url('${resource.imageUrl}')`}}>
          <span className="card-title">
            <h3>{resource.name} <ReactStars
              value={stars}
              edit={false}
              size={24}
              color2={'#ffd700'} /></h3>
          </span>
        </span>
        <span className="card-summary">
          {description}
        </span>
        <span className="card-meta">
          Subject: {subject}, Ages: {ages.minimumAge} - {ages.maximumAge}
        </span>
      </Link>
    )
  }
}

export default ResourceCard
