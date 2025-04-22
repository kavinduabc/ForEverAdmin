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
              <th>Key</th>
              <th>Name</th>
              <th>Imahe</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {product.length > 0 ? (
              product.map((product) => (
                <tr key={product.id}>
                  <td>{product.key}</td>
                  <td>{product.name}</td>
                  <td>{product.image}</td>
                  <td>{product.category}</td>
                  <td>{product.subCategory }</td>
                  <td>{product.price}</td>
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
