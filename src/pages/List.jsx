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
    <div className="p-5">
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-2xl rounded">
        <thead className="bg-gray-100">
          <tr className="text-gray-700">
            <th className="py-3 px-6 border-b text-left text-sm font-semibold">Key</th>
            <th className="py-3 px-6 border-b text-left text-sm font-semibold">Name</th>
            <th className="py-3 px-6 border-b text-left text-sm font-semibold">Category</th>
            <th className="py-3 px-6 border-b text-left text-sm font-semibold">Sub Category</th>
            <th className="py-3 px-6 border-b text-left text-sm font-semibold">Price</th>
            <th className="py-3 px-6 border-b text-left text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            product.length > 0 ? (
              product.map((item, index) => (
                <tr className="hover:bg-gray-50" key={item.id || index}>
                  <td className="py-3 px-6 border-b">{item.key}</td>
                  <td className="py-3 px-6 border-b">{item.name}</td>
                  <td className="py-3 px-6 border-b">{item.category}</td>
                  <td className="py-3 px-6 border-b">{item.subCategory}</td>
                  <td className="py-3 px-6 border-b">{item.price}</td>
                  <td className="py-3 px-6 border-b space-x-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Update</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No Product Available</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default List;
