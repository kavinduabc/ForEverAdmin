import { useState } from 'react'
import './App.css'

import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add'
import Order from './pages/Order'
import List from './pages/List'

function App() {
  
  const [token,setToken] = useState("")



  return (
    <div className='bg-gray-50 min-h-screen'>
      {
        token === "" ? <Login/> :
        <>
        <NavBar/>
        <hr />
        <div className='flex w-full'>
           <SideBar/>
           <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
               <Routes>
                <Route path="/add" element={<Add/>}/>
                <Route path='/list' element={<List/>}/>
                <Route path='/orders' element={<Order/>}/>
               </Routes>
           </div>
        </div>
        </>
      }
    

    </div>
  )
}

export default App
