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
import SuccessfulPaymentPage from './pages/SuccessfulPaymentPage'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount ] = useState(0);   
  const [searchBar, setSearchBar ] = useState("");
  const [popupObject, setPopupObject ] = useState({popupType:'',message1:'', message2:''});
  const [adminPriv, setAdminPriv ] = useState(false);
  const [successfulPayment, setSuccessfulPayment] = useState(false);
  const [totalPrint, setTotalPrint] = useState(false)
  const [loggedIn, setLoggedIn ] = useState(false);
  const [tokenEmail, setTokenEmail ] = useState("");

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
    for(let i = 0; i < localStorArray.length/6 ; i++){
      let albumArray = new Array();
      for(let j = 0; j < 6; j++){
        albumArray.push(localStorArray[(i*6)+j])
      }
      newArray.push(albumArray);
    }
    setCartItems(()=>{
      return [...newArray]
    })
    console.log(newArray)
    }
    
  }


  const verifyToken = async ()=>{
      if(localStorage.getItem("TOKEN") != ""){
         let response = await fetch(`${urlFix}/api/token/verify`,{
            method: "POST",
            headers:{"Content-Type":"application/json",
               authorization:`Bearer:${localStorage.getItem('TOKEN')}`
            },
         });
         console.log("RESPONSE: ",response);
         let data = await response.json();
         if(data.message == "success"){
            //localStorage.setItem('EMAIL', data.email)
            setTokenEmail(()=>{
              return data.email;
            })
            setLoggedIn(()=>{
               return true;
            })            
         }
         else {
            let popup = new Object();
            popup.type='type1';
            popup.message1="Your session has ended."
            popup.message2="Please log in again to continue"
            setPopupObject(()=>{
               return popup;
            })
            logOut();
         }           
      }
      else{         
         console.log("NO TOKEN FOUND");
         logOut();
      }
   }



   const logOut = ()=>{
         localStorage.setItem('TOKEN', "");
         localStorage.setItem('EMAIL', "");
      setTokenEmail(()=>{
        return "";
      })
      setLoggedIn(()=>{
         return false;
      })
      setAdminPriv(()=>{
         return false;
      })
   }
 

  return (

    <>
     <Navigator
     adminPriv={adminPriv}
     setAdminPriv={setAdminPriv}
     totalPrint={totalPrint}
     setTotalPrint={setTotalPrint}
     logOut={logOut}
     loggedIn={loggedIn}
     >
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
        popupObject={popupObject}
        setPopupObject={setPopupObject}
        setTotalPrint={setTotalPrint} 
        urlFix={urlFix}
        verifyToken={verifyToken}
        tokenEmail={tokenEmail}
        
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
        popupObject={popupObject}
        setPopupObject={setPopupObject}
        adminPriv={adminPriv}
        setAdminPriv={setAdminPriv}
        totalPrint={totalPrint}
        setTotalPrint={setTotalPrint}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        logOut={logOut}
        verifyToken={verifyToken}
        tokenEmail={tokenEmail}
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
        adminPriv={adminPriv}
        setAdminPriv={setAdminPriv}
        setTotalPrint={setTotalPrint}
        verifyToken={verifyToken}
        tokenEmail={tokenEmail}
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
        popupObject={popupObject}
        setPopupObject={setPopupObject}
        setTotalPrint={setTotalPrint}
        totalPrint={totalPrint}
        loggedIn={loggedIn}
        verifyToken={verifyToken}
        tokenEmail={tokenEmail}   
             
        />}/>
        <Route path='/about' element={<AboutPage
        setTotalPrint={setTotalPrint}
        verifyToken={verifyToken}
        tokenEmail={tokenEmail}           
        />}/>
        <Route path='/faq' element={<FAQPage
        setTotalPrint={setTotalPrint}
        verifyToken={verifyToken}
        tokenEmail={tokenEmail}       
        />}/>
         {/* <Route path="/successful_payment" element={<SuccessfulPaymentPage 
          cartItems={cartItems}
          setCartItems={setCartItems}  
               
        />} /> */}


    </Routes>


      <RetroFoot
      totalPrint={totalPrint}
      setTotalPrint={setTotalPrint}
      
      />

    </>

      
    
  )
}

export default App
