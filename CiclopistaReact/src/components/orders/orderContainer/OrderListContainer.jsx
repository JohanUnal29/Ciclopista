import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderList from "./OrderList";
import NavBar3 from "../../subcomponents/navbar/Navbar3";


export default function OrderListContainer() {

  const [orders, setOrders] = useState([]);
  const status = useParams().status;

  useEffect(() => {

    if (status) {
      axios.get(`/api/purchase/status/${status}`).then(res => {
        setOrders(res.data.payload);
      }).catch(err => {
        console.log(err);
      })
    } else {
      axios.get("/api/purchase").then(res => {
        setOrders(res.data.payload);
      }).catch(err => {
        console.log(err);
      })
    }

  }, [status])

  console.log(orders);

  return (
    <div>
      <NavBar3></NavBar3>
      <OrderList orders={orders} />
    </div>
  )
}

