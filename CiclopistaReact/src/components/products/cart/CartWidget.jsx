import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import ModalCart from './ModalCart';

const CartWidget = () => {

  const { cantidadEnCarrito } = useContext(CartContext);
  const [modalShow, setModalShow] = useState(false);

  return (
    <><ModalCart show={modalShow} onHide={() => setModalShow(false)} />
    <div className='Menu' onClick={() => setModalShow(true)}>
      <FaShoppingCart size={20} />
      <span className="numerito"> {cantidadEnCarrito()}</span>
    </div></>
  )
}

export default CartWidget