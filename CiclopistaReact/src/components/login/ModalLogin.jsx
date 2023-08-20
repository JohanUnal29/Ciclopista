import React, { useState } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function ModalLogin(props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const popup = window.open(
        "http://localhost:5000/api/sessionsGoogle/auth/google",
        "targetWindow",
        `toolbar=no,
        location=no,
        status=no,
        menubar=no,
        scrollbars=yes,
        resizable=yes,
        width=620,
        height=700`
      );

      const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopupClosed);
          setLoading(false);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Bienvenido!, sesión exitosa',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Recargar la página después de que el usuario haya visto el mensaje de éxito
            window.location.reload();
          });
        }
      }, 100);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Inicio de sesión
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example d-flex justify-content-center align-items-center">

        <Button variant='danger' onClick={handleSubmit} disabled={loading}>
          {loading ? "Cargando..." : <FaGoogle />}
        </Button>

      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}