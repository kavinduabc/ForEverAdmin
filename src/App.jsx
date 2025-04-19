import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import Order from './pages/Order'
import List from './pages/List'
import Login from './components/Login'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  
  const [token , setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):"");

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
    {
      token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <NavBar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <SideBar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Order token={token} />} />
                <Route path="*" element={<Navigate to="/list" />} />
              </Routes>
            </div>
          </div>
        </>
      )
    }
  </div>
  
  )
}

export default App
