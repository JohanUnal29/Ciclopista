import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

import firebaseApp from "../../firebase/Credentials.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

export default function LoginFirebase() {
    const firestore = getFirestore(firebaseApp);
    const [isRegistrando, setIsRegistrando] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("user");

    const [loading, setLoading] = useState(false);

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
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h5>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h5>
                    <Form>

                        <Form.Group controlId="firstName">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombres"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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

                        <Form.Group controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <br/>
                        <Button variant="success" onClick={() => {
                            submitHandler();
                        }} disabled={loading}>
                            {isRegistrando ? <p>Registrar</p> : <p>Iniciar sesión</p>}
                        </Button>
                        <br/>
                        
                        <Button variant="danger" onClick={() => setIsRegistrando(!isRegistrando)}>
                            {isRegistrando ? <p>Ya tengo una cuenta</p> : <p>Quiero registrarme</p>}
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
        // <div>
        //   <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

        //   <form onSubmit={submitHandler}>
        //     <label>
        //       Correo electrónico:
        //       <input type="email" id="email" />
        //     </label>

        //     <label>
        //       Contraseña:
        //       <input type="password" id="password" />
        //     </label>

        //     <label>
        //       Rol:
        //       <select id="rol">
        //         <option value="admin">Administrador</option>
        //         <option value="user">Usuario</option>
        //       </select>
        //     </label>

        //     <input
        //       type="submit"
        //       value={isRegistrando ? "Registrar" : "Iniciar sesión"}
        //     />
        //   </form>

        //   <button onClick={() => setIsRegistrando(!isRegistrando)}>
        //     {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
        //   </button>
        // </div>
    );
}

