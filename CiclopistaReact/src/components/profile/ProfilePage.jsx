import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import firebaseApp from "../../firebase/Credentials";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function ProfilePage() {
  
  const [modalShow, setModalShow] = useState(false);

  const [userLogin, setUserLogin] = useState([]);
  const [veri, setVeri] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/sessionsGoogle/user")
      .then((res) => {
        setUserLogin(res.data.payload);
        console.log("sesión");
        console.log(userLogin);
        if (res.data.payload) {
          setVeri(true);
        } else {
          setVeri(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
    <>
      <Container>
        <Row className="mt-4">
          <Col xs={12} className="text-center">
          <ProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
            <div className='Menu' onClick={() => setModalShow(true)}>
            <img
              src={
                user?.profilePic ||
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
            /></div>
          </Col>
          <Col className="mt-4">
            <Card style={{ maxWidth: "360px" }} className="mx-auto p-4">
              <p className="text-center">
                <b>Nombre: </b>
                {!veri ? (
                  <p>Cargando datos...</p>
                ) : veri ? (
                  userLogin.firstName
                ) : (
                  user.firstName
                )}
              </p>
              <p className="text-center">
                <b>Correo: </b>
                {!veri ? (
                  <p>Cargando datos...</p>
                ) : veri ? (
                  userLogin.email
                ) : (
                  user.email
                )}
              </p>
              <p className="text-center">
                <b>Rol: </b>
                {!veri ? (
                  <p>Cargando datos...</p>
                ) : veri ? (
                  userLogin.rol
                ) : (
                  user.rol
                )}
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  );
}
