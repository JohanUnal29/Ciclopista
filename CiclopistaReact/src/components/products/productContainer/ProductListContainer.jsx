import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList.jsx";
import "./ProductsContainer.css";
import NavBar2 from "../../subcomponents/navbar/Navbar2.jsx";

import { Pagination } from "react-bootstrap";

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const categoria = useParams().categoria;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (categoria) {
      axios
        .get(`/api/products/${categoria}`)
        .then((res) => {
          setProducts(res.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`/api/products?page=${page}`)
        .then((res) => {
          setProducts(res.data.payload.products);
          setPageCount(res.data.payload.pagination.pageCount);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoria, products]);

  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  function handleFirst() {
    setPage(1); // Navega a la primera página
  }

  function handleLast() {
    setPage(pageCount); // Navega a la última página
  }

  console.log(products);
  return (
    <div className="page-content">
      <NavBar2></NavBar2>

      <Pagination className="pagination-red">
        <Pagination.First onClick={handleFirst} />
        <Pagination.Prev onClick={handlePrevious} />
        {Array.from({ length: pageCount }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === page}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNext} />
        <Pagination.Last onClick={handleLast} />
      </Pagination>

      {products === null ? (
        <div>Cargando...</div>
      ) : (
        <ProductList products={products} />
      )}

      <Pagination className="pagination-red">
        <Pagination.First onClick={handleFirst} />
        <Pagination.Prev onClick={handlePrevious} />
        {Array.from({ length: pageCount }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === page}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNext} />
        <Pagination.Last onClick={handleLast} />
      </Pagination>
    </div>
  );
};

export default ProductListContainer;
