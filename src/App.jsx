import { useState } from 'react'
import './App.css'
import Admin from './admin/Admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Admin/>
    </>
  )
}

export default App
