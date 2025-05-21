import { useState } from 'react'
import {Link, Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'

function App() {
 

  return (

    <>
     <nav>
      <Link to="/" ><div style={{marginLeft: "2rem"}}>Home</div></Link>      
      <Link to="/cart" >Cart</Link>
      <Link to="/account" >Account</Link>
    </nav>

    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/cart" element={ < CartPage/>} />
      <Route path='/account' element={<AccountPage/>} />      
    </Routes>
    </>
      
    
  )
}

export default App
