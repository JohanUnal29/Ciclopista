import React, { useState, useContext } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../../context/CartContext';
import axios from "axios";
import { Link } from 'react-router-dom';
import NavBar from '../../subcomponents/navbar/Navbar';
import Swal from 'sweetalert2';

export default function Checkout() {

    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async () => {

        try {
            const TicketForm = {
                name: name,
                purchaser: email,
                phone: phone,
                message: message,
                cart: carrito,
                amount: precioTotal(),
            };
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Gracias por ordenar con nosotros ❤️',
                showConfirmButton: false,
                timer: 1500
            })
            axios.post("/api/purchase/addticket", TicketForm).then(res => {
                console.log(res.data);
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

    return (
        <>
            <NavBar/>
            <br/>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h5>Orden</h5>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="message">
                                <Form.Label>Sugerencias</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="success" onClick={() => {
                                handleSubmit();
                            }}>
                                <Link className="Menu" to="/">comprar</Link>
                            </Button>

                            <Button variant="danger">
                                <Link className="Menu" to="/">Cancelar</Link>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
