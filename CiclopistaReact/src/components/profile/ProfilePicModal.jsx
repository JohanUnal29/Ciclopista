import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ProfilePicModal2({ isOpen, close, user, userLogin, veri}) {
  //tocar llamar la otra sesión de firebase
  
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
    if (!selectedFile)
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Debes seleccionar una nueva imagen!",
        showConfirmButton: false,
        timer: 1500,
      });

    const imageDetails = {
      email: veri ? userLogin.email : user.email,
      selectedFile,
    };

    console.log("imagen agregada: " + JSON.stringify(imageDetails));
    //acá va el axios bro updateUser({ profilePic: selectedFile })

    close();
  };

  return (
    <Modal show={isOpen} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar mi foto de perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.File
            custom
            label={fileName}
            data-browse="Subir"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .gif, .png"
          />
        </Form>

        <img
          className="img-fluid mt-2"
          src={selectedFile}
          alt="profile-previw"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdateProfilePic}>
          Actualizar imagen
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
