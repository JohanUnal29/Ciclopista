import React from 'react';
import Product from './Product.jsx';
import "./ProductsContainer.css";
import { Container, Row } from 'react-bootstrap';

const ProductList = ( {products} ) => {
  console.log("listProduct");
  console.log(products);
  return (
    <Container>
      <Row className="justify-content-center">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </Row>
    </Container>
  )
}

export default ProductList