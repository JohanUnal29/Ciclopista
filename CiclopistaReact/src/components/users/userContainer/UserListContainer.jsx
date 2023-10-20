import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./UserList";

import { Pagination } from "react-bootstrap";
import NavBarUserManager from "../../subcomponents/navbar/NavbarUserManager";

export default function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    axios
      .get(`/api/userManager?page=${page}`)
      .then((res) => {
        setUsers(res.data.payload.users);
        setPageCount(res.data.payload.pagination.pageCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

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

  return (
    <div>
      <div className="page-content">
        <NavBarUserManager />
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

        {users === null ? (
          <div>Cargando...</div>
        ) : (
          <UserList users={users} />
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
    </div>
  );
};

