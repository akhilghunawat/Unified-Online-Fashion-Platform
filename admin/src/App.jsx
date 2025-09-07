import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

const App = () => {
  return (
   <>
      <div>
        <Navbar />
        <Admin />
      </div>
    </>
  )
}

export default App
