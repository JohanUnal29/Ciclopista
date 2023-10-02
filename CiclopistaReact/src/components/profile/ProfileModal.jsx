import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

export default function ProfileModal(props) {
  const [fileName, setFileName] = useState("Subir una imagen");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    const SIZE_50MB = 50 * 1024 * 1024;
    const isValidSize = file.size < SIZE_50MB;
    // const isValidSize = file.size < 200 * 1024
    const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
    const isValidType = isNameOfOneImageRegEx.test(file.name);

    if (!isValidSize)
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Imagen muy pesada, excede los 5MB!",
        showConfirmButton: false,
        timer: 1500,
      });
    if (!isValidType)
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Solo puedes subir imagenes!",
        showConfirmButton: false,
        timer: 1500,
      });

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfilePic = () => {
    try {
      if (!selectedFile)
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "¡Debes seleccionar una nueva imagen!",
          showConfirmButton: false,
          timer: 1500,
        });

      const imageDetails = {
        email: props.email,
        selectedFile,
      };

      console.log("imagen agregada: " + JSON.stringify(imageDetails));
      axios
        .post("/api/userProfile/addprofileimage", imageDetails)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Imagen de perfil agregado",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // Recargar la página después de que el usuario haya visto el mensaje de éxito
            window.location.reload();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }
    props.onHide();
    
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">prueba</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleccionar imagen</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg, .jpeg, .gif, .png"
            onChange={handleFileChange}
          />
        </Form.Group>
        <img
          className="img-fluid mt-2"
          src={selectedFile}
          alt="profile-previw"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            props.onHide();
            setSelectedFile(null);
          }}
        >
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdateProfilePic}>
          Actualizar imagen
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
