import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar3 from "../../subcomponents/navbar/Navbar3";
import OrderDetail from "./OrderDetail.jsx";

export default function OrderDetailContainer() {
    const [order, setOrder] = useState(null);
    const id = useParams().id;
    console.log(id);

    useEffect(() => {

        axios.get(`/api/purchase/id/${id}`).then(res => {
            setOrder(res.data.payload);
            console.log("respuesta servidor:"+res.data.payload);
        }).catch(err => {
            console.log(err);
        })

    }, [id])

    
    return (
        <div>
            <NavBar3></NavBar3>
            {order !== null && <OrderDetail order={order} />}
        </div>
    )
}