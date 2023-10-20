import React, { useState, useContext, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Table } from "react-bootstrap";
import { CartContext } from "../../../context/CartContext";
import Carrito from "./Carrito";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ModalCart(props) {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

  const handleVaciar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, vaciar!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes ejecutar la acción de eliminación si el usuario confirma
        vaciarCarrito();
        Swal.fire("Eliminado!", "El carrito se vació.", "success");
      }
    });
  };

  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Carrito de compras
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={12}>
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
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
                {carrito.length > 0 ? (
                  <>
                    <Button variant="danger" onClick={handleVaciar}>
                      Vaciar
                    </Button>
                    <Col xs={6} md={4}>
                      <h6>Total: ${precioTotal()}</h6>
                    </Col>
                    <Col xs={6} md={4}>
                      <Button
                        variant="success"
                        onClick={() => {
                          props.onHide(); // Cierra el modal
                          // Luego, redirige al usuario a la página "checkout2"
                          window.location.href = "/checkout2"; // O utiliza react-router para cambiar la ruta si estás usando react-router-dom
                        }}
                      >
                        Comprar
                      </Button>
                    </Col>
                  </>
                ) : (
                  <Col xs={12} md={12}>
                    <h2>El carrito está vacío :(</h2>
                  </Col>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
