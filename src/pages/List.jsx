import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import axios from 'axios';

const List = () => {
  const [product, setProduct] = useState([]);
  const [productLoaded, setProductLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productLoaded) {
      const token = localStorage.getItem('token');

      axios.get(`${backendUrl}/api/product`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProduct(res.data);
        setProductLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [productLoaded]);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.length > 0 ? (
              product.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.email}</td>
                  <td>{product.role}</td>
                  <td>Action</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Product Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
