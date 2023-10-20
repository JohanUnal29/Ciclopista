import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartWidget from "../../products/cart/CartWidget.jsx";
import LoginWidget from "../../login/LoginWidget.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import "./Navbar2.css";

export default function NavBar2() {
  const [userLogin, setUserLogin] = useState([]);
  const [veri, setVeri] = useState(false);

  const logout = async () => {
    try {
      axios
        .get("/api/sessionsGoogle/logout")
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Adiós!, sesión finalizada",
            showConfirmButton: false,
            timer: 1500,
          });
          setUserLogin([]);
          setVeri(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    axios
      .get("/api/sessionsGoogle/user")
      .then((res) => {
        setUserLogin(res.data.payload);
        console.log("sesión");
        console.log(userLogin);
        if (res.data.payload) {
          setVeri(true);
          console.log("veri: true");
        } else {
          setVeri(false);
          console.log("veri: false");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Navbar className="nav-grande" bg="white" expand="lg">
      <Container fluid style={{ paddingLeft: "100px", paddingRight: "100px" }}>
        <div className="logo-container">
          <Navbar.Brand>
            <Link to="/">
              <a className="navbar-brand col-6">
                <img
                  className="logotipoo"
                  src="https://drive.google.com/uc?export=download&id=1qvxqCkqCxFeQyxzYarFAgABEMRX9jrIO"
                  alt="Logo Ciclopista"
                />
              </a>
              {/* <span className="logo-title">Adopta un cheems</span> */}
            </Link>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link className="Menu" to="/">
                Inicio
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="Menu" to="/products">
                Productos
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="Menu" to="/products/Sillines">
                Sillines
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="Menu" to="/products/Cadenas">
                Cadenas
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="Menu" to="/products/Cadenillas">
                Cadenillas
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="Menu" to="/products/Pachas">
                Pachas
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="Menu" to="/products/Llantas">
                Llantas
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="Menu" to="/products/Rines">
                Rines
              </Link>
            </Nav.Link>
            <Nav.Link>
              <CartWidget></CartWidget>
            </Nav.Link>
            {veri === false && (
              <Nav.Link>
                <LoginWidget />
              </Nav.Link>
            )}
            {veri === true && (
              <NavDropdown title="Cuenta" id="basic-nav-dropdown">
                <Nav.Link>
                  <Link className="Menu" to="/ProfilePage">
                    Perfil
                  </Link>
                </Nav.Link>
                {userLogin.rol == "admin" && (
                  <>
                    <Nav.Link>
                      <Link className="Menu" to="/orders">
                        Administrador
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link className="Menu" to="/UserManager">
                        Roles
                      </Link>
                    </Nav.Link>
                  </>
                )}
                <NavDropdown.Divider />
                <Nav.Link onClick={logout}>
                  <p className="Cerrar">Cerrar Sesión</p>
                </Nav.Link>
              </NavDropdown>
            )}
            {/* <Nav.Link className="Menu" target="_blank" href="https://www.instagram.com/dasein.accesorios/?igshid=Yzg5MTU1MDY%3D">Ir a @dasein.outfit</Nav.Link> */}
          </Nav>
          {/* <Link to="/carrito"><CardWidget cantidad="10" /></Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
