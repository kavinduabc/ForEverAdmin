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
    <div className='w-full h-full  relative flex flex-col items-center'> 
      <div>
        <table className='w-full max-w-full text-left border-collapse bg-white shadow-2xl rounded'>
          <thead>
            <tr className='bg-gray-200 text-gray-700'>
              <th className='px-4 py-2'>Key</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Category</th>
              <th className='px-4 py-2'>Sub Category</th>
              <th className='px-4 py-2'>Price</th>
              <th className='px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.length > 0 ? (
              product.map((product) => (
                <tr key={product.id}>
                  <td className='px-4 py-2'>{product.key}</td>
                  <td className='px-4 py-2'>{product.name}</td>
                  
                  <td className='px-4 py-2'>{product.category}</td>
                  <td className='px-4 py-2'>{product.subCategory }</td>
                  <td className='px-4 py-2'>{product.price}</td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-1.5'>
                     <button className='bg-black text-white w-[80px]'>Update</button>
                     <button className='bg-white text-black w-[80px]'>Delete</button>
                    </div>
                  </td>
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
