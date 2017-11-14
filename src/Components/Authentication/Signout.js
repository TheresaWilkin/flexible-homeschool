import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../Actions';

import Container from '../atoms/Container';

const propTypes = {
  signoutUser: PropTypes.func.isRequired,
};

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <Container>Sorry to see you go...</Container>;
  }
}

Signout.propTypes = propTypes;

export default connect(null, actions)(Signout);
