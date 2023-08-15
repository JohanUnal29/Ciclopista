import React, { useState, useContext } from 'react';
import { Modal, Container, Row, Col, Button, Table } from 'react-bootstrap';
import { CartContext } from '../../../context/CartContext';
import axios from "axios";
import Carrito from './Carrito';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ModalCart(props) {

    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");

    const [modalInsertar, setModalInsertar] = useState(false);
    console.log(carrito);
    const handleSubmit = async () => {

        try {
            const OrderForm = {
                name: name,
                email: email,
                phone: phone,
                message: message,
                cart: carrito,
                totalPrice: precioTotal(),
            };
            alert("Gracias por odenar con nosotros, pronto nos contactaremos contigo ❤️");
            axios.post("/api/orders/addorder", OrderForm).then(res => {
                alert(res.data);
            }).catch(err => {
                console.log(err);
            })
        } catch (error) {
            alert(error.message);
        }

        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        vaciarCarrito();
    };


    const handleVaciar = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes ejecutar la acción de eliminación si el usuario confirma
                vaciarCarrito();;
                Swal.fire('Eliminado!', 'El carrito se vació.', 'success');
            }
        });
    };

    return (

        <><Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Carrito de compras
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Titulo</th>
                                            <th>Foto</th>
                                            <th>Cant</th>
                                            <th>Precio.U</th>
                                            <th>Total</th>
                                            <th>Quitar</th>
                                        </tr>
                                    </thead>
                                    <Carrito></Carrito>
                                </Table>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={4}>
                            {carrito.length > 0 ?
                                <>
                                    <Button variant='danger' onClick={handleVaciar}>Vaciar</Button>
                                    <Col xs={6} md={4}>
                                        <h6>Total: ${precioTotal()}</h6>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Button variant='success' onClick={() => {
                                            props.onHide();
                                        }}><Link className="Menu" to="/checkout">Comprar</Link></Button>
                                    </Col>
                                </> :
                                <Col xs={12} md={12}>
                                    <h2>El carrito está vacío :(</h2>
                                </Col>
                            }
                        </Col>

                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}