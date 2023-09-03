import React, { useState } from "react";
import { Button, Form, Modal, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import firebaseApp from "../../firebase/Credentials.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import LoginGoogle from "./LoginGoogle.jsx";
import "./ModalLogin.css";


const auth = getAuth(firebaseApp);

export default function ModalLogin(props) {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("user");
  const [error, setError] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [emailPasswordReset, setEmailPasswordReset] = useState("");

  const [loading, setLoading] = useState(false);

  function handleResetPassword2() {
    setPasswordReset(true);
  }

  function handleResetPassword3() {
    setPasswordReset(false);
  }

  function handleResetPassword(email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Éxito: El correo electrónico de restablecimiento se envió correctamente
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Se ha enviado un correo electrónico de restablecimiento de contraseña.',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        // Error: No se pudo enviar el correo electrónico de restablecimiento
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Error al enviar el correo electrónico de restablecimiento',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Recargar la página después de que el usuario haya visto el mensaje de éxito
          window.location.reload();
        });
      });
  }

  async function registrarUsuario(firstName, lastName, email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { firstName: firstName, lastName: lastName, email: email, rol: rol });
  }

  function submitHandler() {

    setLoading(true);

    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      rol: rol,
    };


    console.log("submit", user);

    if (isRegistrando) {
      // registrar
      registrarUsuario(user.firstName, user.lastName, user.email, user.password, user.rol);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Bienvenido!, registro exitosa',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Recargar la página después de que el usuario haya visto el mensaje de éxito
        setLoading(false);
        window.location.reload();
      });
    } else {
      // login
      signInWithEmailAndPassword(auth, user.email, user.password);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Bienvenido!, sesión exitosa',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Recargar la página después de que el usuario haya visto el mensaje de éxito
        setLoading(false);
        window.location.reload();
      });
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isRegistrando ? "Regístrate" : "Inicia sesión"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center">

        <Form>

          {
            (isRegistrando) &&
            <><Form.Group controlId="firstName">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombres"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group><Form.Group controlId="lastName">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellidos"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
              </Form.Group></>
          }

          {
            (passwordReset === false) &&
            <><Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </Form.Group><Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <br />
              <Button variant="success" onClick={() => {
                submitHandler();
              }} disabled={loading}>
                {isRegistrando ? <p>Registrar</p> : <p>Iniciar sesión</p>}
              </Button>

              <Button variant="danger" onClick={() => setIsRegistrando(!isRegistrando)}>
                {isRegistrando ? <p>Ya tengo una cuenta</p> : <p>Quiero registrarme</p>}
              </Button>
            </>

          }

        </Form>

        {
          (!isRegistrando && passwordReset === false) &&
          <a
            className="Olvidar"
            href="#!"
            onClick={handleResetPassword2}
          >
            ¿Olvidaste tu contraseña?
          </a>

        }

        {
          (passwordReset === false) &&
          <><pr>o</pr>
            <LoginGoogle /></>
        }

        {
          (passwordReset === true) &&
          <>
              <a
                className="Olvidar"
                href="#!"
                onClick={handleResetPassword3}
              >
                Volver
              </a>

              <Form>
                <Form.Group controlId="emailPasswordReset">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={emailPasswordReset}
                    onChange={(e) => setEmailPasswordReset(e.target.value)} />
                </Form.Group>

                <Button variant="danger" onClick={() => handleResetPassword(emailPasswordReset)}>
                  Recuperar
                </Button>

              </Form>
          </>
          //emailPasswordReset
        }

      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
