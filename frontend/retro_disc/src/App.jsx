import { useState } from 'react'
import {Link, Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'
import Navigator from './components/Navigator'
import AdminPage from './pages/AdminPage'

function App() {
  const urlFix = "http://localhost:3000";
 

  return (

    <>
     <Navigator>
      {/* <Link to="/" ><div style={{marginLeft: "2rem"}}>Home</div></Link>      
      <Link to="/cart" >Cart</Link>
      <Link to="/account" >Account</Link> */}
    </Navigator>

    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/cart" element={ < CartPage/>} />
      <Route path='/account' element={<AccountPage
        urlFix={urlFix}
      />} /> 
      <Route path='/admin' element={<AdminPage 
      urlFix={urlFix}/>}/>    
    </Routes>
    </>
      
    
  )
}

export default App
