import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../Actions';
import {
  getUserSchool,
  getStudentIds,
} from '../../Selectors';

import StudentList from './StudentList';
import SignupStudent from '../Authentication/SignupStudent';
import Container from '../atoms/Container';

class StudentsContainer extends React.Component {
  state = {
    signup: false
  }

  componentDidMount() {
    this.props.fetchStudents(this.props.school);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.students.length > this.props.students.length) {
      this.setState({ signup: false });
    }
  }

  render() {
    return (
      <Container>
        <StudentList
          students={this.props.students}
          onClick={() => this.setState({signup: true})}
          signup={this.state.signup}
        />
        {this.state.signup && <SignupStudent />}
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    school: getUserSchool(state),
    students: getStudentIds(state),
  }
}

export default connect(mapStateToProps, actions)(StudentsContainer);
