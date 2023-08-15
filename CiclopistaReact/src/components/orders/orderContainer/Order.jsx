import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Card, Button, Modal } from 'react-bootstrap';
import "./Order.css";

const Order = ( {order} ) => {
  return (
    <Col sm={6} md={4} lg={3} className="item-card">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>Codigo: {order.code}</Card.Text>
            <Card.Text>{order.purchase_datetime}</Card.Text>
            <Card.Title>{order.name}</Card.Title>
            <Card.Text>{order.purchaser}</Card.Text>
            <Card.Text>{order.phone}</Card.Text>
            <Card.Text>{order.amount}</Card.Text>
            <Button variant="primary" style={{ backgroundColor: 'black' }}>
              <Link to={`/orderr/${order._id}`} style={{ textDecoration: 'none', color: 'white' }}>Ver más</Link>
            </Button>
          </Card.Body>
        </Card>
      </Col>
  )
}
//
export default Order
