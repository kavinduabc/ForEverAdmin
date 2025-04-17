import { useState } from 'react'
import './App.css'

import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-50 min-h-screen'>
      <>
    <NavBar/>
    <hr />
    <div className='flex w-full'>
       <SideBar/>
    </div>
    </>

    </div>
  )
}

export default App
