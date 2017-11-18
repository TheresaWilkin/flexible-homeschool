import React from 'react';
import colors from './colors';

export default ({ student }) => {
  const style = {
    backgroundColor: colors[student.color].color,
    padding: '10px',
    listStyle: 'none',
    margin: '5px 0',
    width: '100%'
  }
  return <li style={style} key={student.id}>{student.username}</li>;
}
