import React from 'react';

import StudentContainer from './StudentContainer';
import Card from '../atoms/Card';
import CardHeader from '../atoms/CardHeader';
import Button from '../atoms/Button';

export default ({ students, onClick, signup }) => (
  <Card>
    <CardHeader>Students</CardHeader>
    <ul style={{ listStyleType: 'none',
    margin: 0,
    padding: 0 }}>
      {students.map(student => <StudentContainer student={student} key={student} />)}
    </ul>
    {!signup && <Button onClick={onClick} style={{ width: '100%' }}>Create Student Account</Button>}
  </Card>
);
