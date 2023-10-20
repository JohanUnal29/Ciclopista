import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import Swal from "sweetalert2";

import "./profile.css";

import firebaseApp from "../../firebase/Credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import NavBarProfile from "../subcomponents/navbar/NavbarProfile";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function ProfilePage() {
  const [modalShow, setModalShow] = useState(false);

  const [userLogin, setUserLogin] = useState([]);
  const [veri, setVeri] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState();

  async function getName(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().firstName;
    return infoFinal;
  }

  useEffect(() => {
    // Función asincrónica para obtener los datos de usuario de la sesión de Firebase
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/sessionsGoogle/user");
        setUserLogin(response.data.payload);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    // Configura el listener de autenticación solo una vez
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        // Usuario autenticado
        getName(usuarioFirebase.uid).then((name) => {
          const userData = {
            uid: usuarioFirebase.uid,
            email: usuarioFirebase.email,
            firstName: name, // Actualiza el nombre con el valor obtenido
          };
          setUser(userData);

          // Almacena el nombre en el estado
        });
      } else {
        // Usuario no autenticado
        setUser(null);
      }
    });

    // Obtén los datos de usuario de la sesión
    getUserData();

    // Devuelve una función de limpieza para evitar fugas de memoria
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Verifica si hay un valor en userLogin.email o user.email antes de hacer la solicitud
    if (userLogin?.email || user?.email) {
      axios
        .get(`/api/userProfile/email/${userLogin?.email || user?.email}`)
        .then((res) => {
          setProfileImage(res.data.payload);
          console.log("chamo ", res.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userLogin?.email, user?.email]);

  return (
    <>
      <Container>
        <Button
          variant="danger"
          style={{ marginTop: '10px' }}
        >
          <Link className="link" to="/">
            &lt; Inicio
          </Link>
        </Button>
        <Row className="mt-4">
          <Col xs={12} className="text-center">
            <ProfileModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              email={userLogin?.email || user?.email}
            />
            <div className="Menu" onClick={() => setModalShow(true)}>
              <img
                src={
                  profileImage?.selectedFile ||
                  "https://drive.google.com/uc?export=download&id=1_nY7URDJHMJruyMsUjerTNhRZqhNNFoR"
                }
                alt="profile"
                onClick={() => setModalShow(true)}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </div>
          </Col>
          <Col className="mt-4">
            <Card style={{ maxWidth: "360px" }} className="mx-auto p-4">
              <p className="text-center">
                <b>Nombre: </b>
                {userLogin?.firstName || user?.firstName || "Cargando datos..."}
              </p>
              <p className="text-center">
                <b>Correo: </b>
                {userLogin?.email || user?.email || "Cargando datos..."}
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
