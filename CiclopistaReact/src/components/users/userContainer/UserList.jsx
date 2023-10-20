import React from 'react'
import User from './User';
import "./User.css";
import { Container, Row } from 'react-bootstrap';

const UserList = ( {users} ) => {
  
  return (
    <Container>
      <Row className="justify-content-center">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </Row>
    </Container>
  )
}

export default UserList
