import { useState } from 'react'
import {Link, Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'
import Navigator from './components/Navigator'
import AdminPage from './pages/AdminPage'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount ] = useState(0);   
  const [searchBar, setSearchBar ] = useState("");
  const urlFix = "http://localhost:3000";
 

  return (

    <>
     <Navigator>
      {/* <Link to="/" ><div style={{marginLeft: "2rem"}}>Home</div></Link>      
      <Link to="/cart" >Cart</Link>
      <Link to="/account" >Account</Link> */}
    </Navigator>

    <Routes>
      <Route path="/" element={<HomePage
      cartItems={cartItems} 
        setCartItems={setCartItems}
        cartCount={cartCount} 
        setCartCount={setCartCount}
        searchBar={searchBar}
        setSearchBar={setSearchBar} />}/>

      <Route path="/cart" element={ < CartPage/>} />

      <Route path='/account' element={<AccountPage
        urlFix={urlFix}
        cartItems={cartItems} 
        setCartItems={setCartItems}
        cartCount={cartCount} 
        setCartCount={setCartCount}
        searchBar={searchBar}
        setSearchBar={setSearchBar}
      />} /> 
      <Route path='/admin' element={<AdminPage 
      urlFix={urlFix}/>}/>
      cartItems={cartItems} 
        setCartItems={setCartItems}
        cartCount={cartCount} 
        setCartCount={setCartCount}
        searchBar={searchBar}
        setSearchBar={setSearchBar}    
    </Routes>
    </>
      
    
  )
}

export default App
