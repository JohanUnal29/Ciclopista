import React, { useState, useEffect } from "react";
import { Button, Table, Container } from "react-bootstrap";

import "./User.css";
import axios from "axios";
import Swal from "sweetalert2";

const User = ({ user }) => {
  //sesión:
  const [userLogin, setUserLogin] = useState([]);

  useEffect(() => {
    axios
      .get("/api/sessionsGoogle/user")
      .then((res) => {
        setUserLogin(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //eliminar usuario
  const deleteUser = async (id) => {
    try {
      axios
        .delete(`/api/userManager/${id}`)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: 'error',
            title: err,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  //actualizar usuario
  const [rol, setRol] = useState();

  const uptadeRol = async (id) => {
    try {
      const changes = {
        rol: rol,
      };
      axios
        .put(`/api/userManager/${id}`, changes)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rol Actualizado",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }
    setRol();
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Actualizar Rol</th>
            <th>Eliminar Usuario</th>
          </tr>
        </thead>
        <tbody>
          <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.rol}</td>
            {userLogin.rol == "admin" && (
              <>
                <td>
                  <Button variant="danger" onClick={() => deleteUser(user._id)}>
                    Eliminar Usuario
                  </Button>
                </td>
                <td>
                  <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Button variant="success" onClick={() => uptadeRol(user._id)}>
                    Actualizar Rol
                  </Button>
                </td>
              </>
            )}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default User
