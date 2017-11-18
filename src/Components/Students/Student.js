import React from 'react';
import colors from './colors';

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default ({ student }) => {
  const style = {
    backgroundColor: colors[student.color].color,
    padding: '10px',
    listStyle: 'none',
    margin: '5px 0',
    width: '100%'
  }
  return <li style={style} key={student.id}>{capitalize(student.username)}</li>;
}
