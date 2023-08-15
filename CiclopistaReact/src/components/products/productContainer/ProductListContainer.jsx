import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList.jsx";
import "./ProductsContainer.css";
import NavBar2 from "../../subcomponents/navbar/Navbar2.jsx";


const ProductListContainer = () => {

    const [products, setProducts] = useState([]);
    const categoria = useParams().categoria;

    useEffect(() => {

        if (categoria) {
            axios.get(`/api/products/${categoria}`).then(res => {
                setProducts(res.data.payload);
            }).catch(err => {
                console.log(err);
            })
        } else {
            axios.get("/api/products/all").then(res => {
                setProducts(res.data.payload);
            }).catch(err => {
                console.log(err);
            })
        }

    }, [categoria])

    console.log(products);
    return (
        <div className="adopt">
            <NavBar2></NavBar2>
            <ProductList products={products} />
        </div>
    )
}

export default ProductListContainer