import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartWidget from "../../products/cart/CartWidget.jsx";
import axios from "axios";
import "./Navbar.css";
import LoginWidget from "../../login/LoginWidget.jsx";
import Swal from "sweetalert2";

import firebaseApp from "../../../firebase/Credentials.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function NavBar() {
  const [userLogin, setUserLogin] = useState([]);
  const [veri, setVeri] = useState(false);
  const [user, setUser] = useState(null);

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

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("gonorrea fianl", userData.rol.toString());
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <Navbar className="nav-grande2 sticky-top" bg="" expand="lg">
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
            <Nav.Link
              className="Menu"
              target="_blank"
              href="https://www.instagram.com/dasein.accesorios/?igshid=Yzg5MTU1MDY%3D"
            >
              Ir a @ciclopista
            </Nav.Link>
            <Nav.Link>
              <CartWidget />
            </Nav.Link>
            {/* <Nav.Link><CartWidget></CartWidget></Nav.Link> */}
            {veri === false && user === null && (
              <Nav.Link>
                <LoginWidget />
              </Nav.Link>
            )}
            {(veri === true || user) && (
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

                {veri === true && user === null && (
                  <Nav.Link onClick={logout}>
                    <p className="Cerrar">Cerrar Sesión</p>
                  </Nav.Link>
                )}

                {veri === false && user && (
                  <Nav.Link onClick={() => signOut(auth)}>
                    <p className="Cerrar">Cerrar Sesión FB</p>
                  </Nav.Link>
                )}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
