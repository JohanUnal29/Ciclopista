import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useContext, useState } from "react";
import {CartContext} from '../../../context/CartContext';
import ProductCount from './ProductCount';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {

  const imgurl = "https://drive.google.com/uc?export=download&id=";
  const { carrito, agregarAlCarrito } = useContext(CartContext);
  console.log("carrito:");
    console.log(carrito);
    console.log("itemActual:");
    console.log(product);

  const [cantidad, setCantidad] = useState(1);

  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1)
  }

  const handleSumar = () => {
    cantidad < product.stock && setCantidad(cantidad + 1)
  }

  const handleChange = (event) => {
    const newCantidad = parseInt(event.target.value);
    setCantidad(newCantidad);
  };

  return (

    <Container>
      <Row>
        <Col className="contdetalle">
          <Card style={{ width: '30rem' }}>
            <Card.Img src={imgurl+product.thumbnails} />
          </Card>
        </Col>
        <Col className="contdetalle2">
          <Row><h5>Código: {product.code}</h5></Row>
          <Row><h2 className="mb-3">{product.title}</h2></Row>
          <Row className="cajitas"><h5 className="mt-3">Descripción:</h5><p>{product.description}</p><h5 className="mb-3">Precio: {product.price}</h5></Row>
          <Row className="cajitas">
            <ProductCount
              cantidad={cantidad}
              handleSumar={handleSumar}
              handleRestar={handleRestar}
              handleChange={handleChange}
              handleAgregar={() => { agregarAlCarrito(product, cantidad) }}
            />
          </Row>
        </Col>

      </Row>

    </Container>

  )
}

export default ProductDetail
