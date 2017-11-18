import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Actions';
import {
  getUserSchool,
  getStudentById,
} from '../../Selectors';

import Student from './Student';

class StudentContainer extends React.Component {
  render() {
    return  <Student student={this.props.student} />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    school: getUserSchool(state),
    student: getStudentById(state, ownProps.student),
  }
}

export default connect(mapStateToProps, actions)(StudentContainer);
