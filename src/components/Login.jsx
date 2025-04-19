import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(backendUrl + '/api/user/login', { email, password });
      toast.success("Admin Login Successful");

      const user = res.data.user;
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      if (user.role !== "admin") {
        toast.error("Access denied: Not an admin");
        localStorage.removeItem("token");
        setToken("");
        navigate('/list')
      } else {
        navigate('/list'); // redirect to /list after successful login
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='email'
              placeholder='Email'
              required
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='password'
              placeholder='Password'
              required
            />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
