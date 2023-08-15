import React, { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { BsTrash } from "react-icons/bs";
import Swal from 'sweetalert2';
import './Carrito.css';

const Carrito = () => {

    const imgurl = "https://drive.google.com/uc?export=download&id=";
    const { carrito, eliminarDelCarrito } = useContext(CartContext);

    const showConfirmation = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes ejecutar la acción de eliminación si el usuario confirma
                eliminarDelCarrito(id);
                Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
            }
        });
    };

    return (

        carrito.map((prod) => (
            <tbody>
                <tr>
                    <td>{prod.title}</td>
                    <td><img src={imgurl + prod.thumbnails} alt={prod.title} className="imagen-miniatura" /></td>
                    <td>{prod.cantidad}</td>
                    <td>${prod.price}</td>
                    <td>${prod.price * prod.cantidad}</td>
                    <td><BsTrash
                        onClick={() => showConfirmation(prod._id)}
                        style={{ cursor: "pointer" }}
                    /></td>
                </tr>
            </tbody>
        ))

    )
}

export default Carrito