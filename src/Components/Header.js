import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

import {
  getAuthenticated,
} from '../Selectors/auth';
import Container from './atoms/Container';
import NavBar from './atoms/NavBar';

const defaultProps = {
  authenticated: false,
};

const propTypes = {
  authenticated: PropTypes.bool,
};

class Header extends Component {
  links() {
    if (this.props.authenticated) {
      return [
        {url: '/', name: 'Home'},
        {url: '/signout', name: 'Sign Out'}
      ];
    }
    return [
      {url: '/', name: 'Home'},
      {url: '/signin', name: 'Sign In'}
    ]
  }

  render() {
    return (
      <header className="App-header">
        <Container>
          <h1 className="App-title">Flexible Homeschool</h1>
          <NavBar links={this.links()} current="Components" />
        </Container>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: getAuthenticated(state) };
}

Header.defaultProps = defaultProps;

Header.propTypes = propTypes;

export default connect(mapStateToProps)(Header);
