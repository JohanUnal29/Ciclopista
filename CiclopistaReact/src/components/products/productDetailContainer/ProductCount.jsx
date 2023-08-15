import React from 'react';
import {Button } from 'react-bootstrap';
import './ProductDetail.css';

const ProductCount = ( {cantidad, handleRestar, handleSumar, handleAgregar, handleChange} ) => {

  return (
    <div>

        <div className="item-count mt-3">
            <Button variant="dark" onClick={handleRestar}>-</Button>
            <input type="number" style={{ textAlign: 'center' }} value={cantidad} onChange={handleChange} />
            <Button variant='dark' onClick={handleSumar}>+</Button>
        </div>
        <Button variant="dark" className="mt-3" onClick={handleAgregar}>Agregar al carrito</Button>
    </div>
  )
}

export default ProductCount