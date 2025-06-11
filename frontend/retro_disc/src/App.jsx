import { useState } from 'react'
import {Link, Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'
import Navigator from './components/Navigator'
import AdminPage from './pages/AdminPage'
import CheckoutPage from './pages/CheckoutPage'
import RetroFoot from './components/RetroFoot'
import AboutPage from './pages/AboutPage'
import FAQPage from './pages/FAQPage'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount ] = useState(0);   
  const [searchBar, setSearchBar ] = useState("");
  const urlFix = import.meta.env.VITE_URL_FIX;

  const createCart = ()=>{
    if(localStorage.getItem("CART") == ""){
      setCartItems(()=>{
        return [];
      })
      return;
    }
    if (localStorage.getItem("CART") != null ){
    let localStorArray = localStorage.getItem("CART");
    localStorArray = localStorArray.split(",");
    console.log(localStorArray)
    
    let newArray = new Array();
    for(let i = 0; i < localStorArray.length/5 ; i++){
      let albumArray = new Array();
      for(let j = 0; j < 5; j++){
        albumArray.push(localStorArray[(i*5)+j])
      }
      newArray.push(albumArray);
    }
    setCartItems(()=>{
      return [...newArray]
    })
    console.log(newArray)
    }

    
  }
 

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
        setSearchBar={setSearchBar} 
        createCart={createCart}
        urlFix={urlFix}
        />}/>

      <Route path="/cart" element={ < CartPage/>} />

      <Route path='/account' element={<AccountPage
        urlFix={urlFix}
        cartItems={cartItems} 
        setCartItems={setCartItems}
        cartCount={cartCount} 
        setCartCount={setCartCount}
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        createCart={createCart}
      />} /> 
      <Route path='/admin' element={<AdminPage 
        urlFix={urlFix}
        cartItems={cartItems} 
        setCartItems={setCartItems}
        cartCount={cartCount} 
        setCartCount={setCartCount}
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        createCart={createCart}  
        />}/>
        <Route path='/checkout' element={<CheckoutPage 
        urlFix={urlFix}
        cartItems={cartItems} 
        setCartItems={setCartItems}
        cartCount={cartCount} 
        setCartCount={setCartCount}
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        createCart={createCart}  
        />}/>
        <Route path='/about' element={<AboutPage 
          
        />}/>
        <Route path='/faq' element={<FAQPage 
         
        />}/>




    </Routes>


      <RetroFoot/>

    </>

      
    
  )
}

export default App
