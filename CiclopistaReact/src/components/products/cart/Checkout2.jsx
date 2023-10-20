import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../../../context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Checkout2() {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  //dirección
  const [departamento, setDepartamento] = useState("");
  const [ciudad_o_municipio, setCiudad_o_municipio] = useState("");
  const [barrio, setBarrio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencias_entrega, setReferencias_entrega] = useState("");

  const handleSubmit = async () => {
    try {
      const TicketForm = {
        name: name,
        purchaser: email,
        phone: phone,
        message: message,
        departamento: departamento,
        ciudad_o_municipio: ciudad_o_municipio,
        barrio: barrio,
        direccion: direccion,
        referencias_entrega: referencias_entrega,
        cart: carrito,
        amount: precioTotal(),
      };
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Gracias por ordenar con nosotros ❤️",
        showConfirmButton: false,
        timer: 1500,
      });
      axios
        .post("/api/purchase/addticket", TicketForm)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setDepartamento("");
    setCiudad_o_municipio("");
    setBarrio("");
    setDireccion("");
    setReferencias_entrega("");
    vaciarCarrito();
  };

  return (
    <>
      <Button variant="danger" style={{ marginTop: "10px" }}>
        <Link className="link" to="/">
          &lt; Inicio
        </Link>
      </Button>
      <br />
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

              <Form.Group controlId="departamento">
                <Form.Label>Departamento</Form.Label>
                <select
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                >
                  <option value="Amazonas">Amazonas</option>
                  <option value="Antioquía">Antioquía</option>
                  <option value="Arauca">Arauca</option>
                  <option value="Atlántico">Atlántico</option>
                  <option value="Bogotá D.C.">Bogotá D.C.</option>
                  <option value="Bolivar">Bolivar</option>
                  <option value="Boyacá">Boyacá</option>
                  <option value="Caldas">Caldas</option>
                  <option value="Caquetá">Caquetá</option>
                  <option value="Casanare">Casanare</option>
                  <option value="Cauca">Cauca</option>
                  <option value="Cesar">Cesar</option>
                  <option value="Chocó">Chocó</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Cundinamarca">Cundinamarca</option>
                  <option value="Guainía">Guainía</option>
                  <option value="Guaviare">Guaviare</option>
                  <option value="Huila">Huila</option>
                  <option value="La Guajira">La Guajira</option>
                  <option value="Magdalena">Magdalena</option>
                  <option value="Meta">Meta</option>
                  <option value="Nariño">Nariño</option>
                  <option value="Norte de Santander">Norte de Santander</option>
                  <option value="Putumayo">Putumayo</option>
                  <option value="Quindio">Quindio</option>
                  <option value="Risaralda">Risaralda</option>
                  <option value="San Andrés y Providencia">
                    San Andrés y Providencia
                  </option>
                  <option value="Santander">Santander</option>
                  <option value="Sucre">Sucre</option>
                  <option value="Tolima">Tolima</option>
                  <option value="Valle del Cauca">Valle del Cauca</option>
                  <option value="Vaupés">Vaupés</option>
                  <option value="Vichada">Vichada</option>
                </select>
              </Form.Group>

              <Form.Group controlId="ciudad_o_municipio">
                {ciudad_o_municipio === "Bogotá D.C." && (
                  <Form.Label>Localidad</Form.Label>
                )}

                {ciudad_o_municipio !== "Bogotá D.C." && (
                  <Form.Label>Ciudad o Municipio</Form.Label>
                )}

                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ciudad o Municipio"
                  value={ciudad_o_municipio}
                  onChange={(e) => setCiudad_o_municipio(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="barrio">
                <Form.Label>Barrio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Barrio"
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="direccion">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="referencias_entrega">
                <Form.Label>referencias del lugar de entrega</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="referencias del lugar de entrega"
                  value={referencias_entrega}
                  onChange={(e) => setReferencias_entrega(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="success"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <Link className="Menu" to="/">
                  comprar
                </Link>
              </Button>

              <Button variant="danger">
                <Link className="Menu" to="/">
                  Cancelar
                </Link>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
