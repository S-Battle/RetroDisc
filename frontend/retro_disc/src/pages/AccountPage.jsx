import React,{useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router';
import CDdisplay from "../components/CDdisplay";
import Popup from "../components/Popup";




const AccountPage = ({urlFix, cartItems, setCartItems, cartCount, setCartCount, searchBar, setSearchBar, createCart, popupObject, setPopupObject, adminPriv, setAdminPriv}) => {
   const [passwordInput, setPasswordInput] = useState("")
   const [emailInput, setEmailInput] = useState("")
   const [loggedIn, setLoggedIn ] = useState(false);
   const [customerPref, setCustomerPref] = useState([]);
   const navigate = useNavigate();   
   const [searchType, setSearchType] = useState({type:"search"})
   const [cdArray, setCDArray ] = useState([]);


   const getNewReleases = async () =>{
      const request = await fetch(`${urlFix}/api/get/new/releases`);
      const data = await request.json()
      console.log(data)

      setCDArray(()=>{
         
         return [...data.result]
      })

   }
   
   useEffect( ()=>{
      createCart();
   },[])

   useEffect(()=>{
      const getAllAlbums = async ()=>{
         let request = await fetch(`${urlFix}/api/get/all/albums`);
         const data = await request.json();
         let newArray = await data.albums;    
         console.log("NEW ARRAY: ", newArray)    
         setCDArray(()=>{
            return [...newArray];
         })
      }
      getAllAlbums();
   },[])

   useEffect(()=>{
          const addNumber = ()=>{
            setCartCount((prev)=>{
              let newNumber = cartItems.length;
              return newNumber;
            })            
          }
          addNumber();
   },[cartItems])

   const searchButton = (type)=>{
      setSearchType(()=>{
         let newObject = new Object();
         newObject.type = type;
         return newObject;
      })
   }

   const searchBarInputHandler = (e)=>{
      let inputCriteria = e.target.value
      console.log(inputCriteria);
      setSearchBar(()=>{
         return inputCriteria;
      })
   }
   const checkKey = (e)=>{
      console.log(e.key)
      if(e.key == "Enter"){
         performSearch();
      }
   }

   const performSearch = async ()=>{
      console.log('Performing search')

      const request = await fetch(`${urlFix}/api/get/search/albums`, {
         method:"POST",
         headers: {"Content-Type":"application/json"},
         body: JSON.stringify({
            search: searchBar
         })
      })
      const data = await request.json();
      console.log(data)
      if(data.message == "success"){
         console.log("it was successful")
         setCDArray(()=>{
            let newArray = new Array();
            newArray = data.result;
            return [...newArray];
         })
      }
      else{
         console.log("it was uncuccessful");
         setCDArray(()=>{
            let newArray = new Array();
            return newArray;
         })
      }  
   }


   useEffect(()=>{




   },[searchBar])

   const logInView = ()=>{        
         
         return <div className="loginContainer" style={{display:"flex", justifyContent:"center", paddingTop:"100px"}}>
          <div className="text-center" style={{width: "350px"}}>
        <form className="form-signin">
  <img className="mb-4 rounded-circle " src="retro_disclogo.png" alt="" width="300" height="300"/>
  <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
  <label htmlFor="inputEmail" className="sr-only">Email address</label>
  <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" value={emailInput} onChange={(e)=>{
      let newValue = e.target.value;
      setEmailInput(()=>{
         return newValue;
      })
   }

  }/>
  <label htmlFor="inputPassword" className="sr-only">Password</label>
  <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" value={passwordInput} onChange ={(e)=>{   
      console.log(e.target.value)
      let newValue = e.target.value;
      setPasswordInput(()=>{         
         return newValue;
      })
  }}/>
  <div className="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me"/> Remember me
    </label>
  </div>
  <button className="btn btn-lg btn-primary btn-block" type="button" onClick={(()=>{
   attemptLogin();
  })}>Sign in</button>
  <button className="btn btn-lg btn-primary btn-block" type="button" onClick={(()=>{
   attemptRegister();
  })}>Register</button>
  <p className="mt-5 mb-3 text-muted">© 2025 RetroDisc</p>
  </form>                       
</div>
      <Popup 
      popupObject={popupObject}
      setPopupObject={setPopupObject}
      />
      </div> 
   }

   const loggedInView = () =>{
      return <>
               <div className="d-flex flex-column gap-3 p-2 bd-highlight ">
                  <div className="d-flex justify-content-between">
                     <div>
                        <div>
                           <h1 className="mb-3 " style={{fontSize:'4rem'}}>Logged In</h1>
                           <h2 className="mb-3 fs-1">Hello, {`${localStorage.getItem('EMAIL')}`}</h2>
                        </div>                        
                        <div>
                           <img className="mb-4 rounded-circle " src="retro_disclogo.png" alt="" width="200" height="200"/>
                        </div>
                     </div>
                     
                     <div>
                        
                        <div>
                           <button data-mdb-ripple-init  href={null} role="button" onClick={()=>{logOut();}}>Log Out</button>
                        </div>
                        <div className="d-flex gap-4">
                             <Link to="/checkout"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                              </svg></Link> <h3>{cartCount}</h3>
                        </div>  
                                           
                     </div>   
                  </div>
                  <div className="d-flex flex-column  flex-xl-row">
                  {(searchType.type =='search') && <div className="d-flex flex-column gap-5 col-12 vh-50  col-xl-3 p-3 border border-dark rounded" >
                    {/* <label className="d-flex justify-content-evenly" htmlFor=""><button className="w-25 bg-primary">ARTIST</button><button className="w-25 bg-primary">ALBUM</button><button className="w-25 bg-primary" >BOTH</button></label> */}
                    <label htmlFor=""><div className="w-100 fs-1 ">SEARCH </div><input className="remh4 w-100 border border-dark rounded p-2 fs-2"  value={searchBar} onChange={(e)=>{searchBarInputHandler(e)}} onKeyUp={(e)=>{ checkKey(e)}} type="text" /> </label>                      
                    <label htmlFor=""> <button className="w-100 fs-3" onClick={()=>{ searchButton('newReleases'); getNewReleases();}}>NEW RELEASES</button></label>
                    <label htmlFor=""> <button className="w-100 fs-3" onClick={()=>{ searchButton('topSellers')}}>TOP SELLERS</button></label>
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                  </div>}                  
                  {(searchType.type =='newReleases') && <div className="d-flex flex-column gap-5 col-12 vh-50  col-xl-3 p-3 border border-dark rounded" >
                    {/* <label className="d-flex justify-content-evenly" htmlFor=""><button className="w-25 bg-primary">ARTIST</button><button className="w-25 bg-primary">ALBUM</button><button className="w-25 bg-primary" >BOTH</button></label> */}
                                
                    <label htmlFor=""><div className="w-100 fs-1 ">New Releases </div></label> 
                    <label htmlFor=""> <button className="w-100 fs-3" onClick={()=>{ searchButton('topSellers')}} >TOP SELLERS</button></label>
                    <label htmlFor=""> <button className="w-100 fs-3" onClick={()=>{ searchButton('search')}}>SEARCH</button></label> 
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                  </div>}
                  {(searchType.type =='topSellers') && <div className="d-flex flex-column gap-5 col-12 vh-50  col-xl-3 p-3 border border-dark rounded" >
                    {/* <label className="d-flex justify-content-evenly" htmlFor=""><button className="w-25 bg-primary">ARTIST</button><button className="w-25 bg-primary">ALBUM</button><button className="w-25 bg-primary" >BOTH</button></label> */}                    
                     <label htmlFor=""><div className="w-100 fs-1 ">Top Sellers</div></label> 
                    
                    <label htmlFor=""> <button className="w-100 fs-3" onClick={()=>{ searchButton('newReleases'); getNewReleases();}}>NEW RELEASES</button></label>                    
                    <label htmlFor=""> <button className="w-100 fs-3" onClick={()=>{ searchButton('search')}}> SEARCH  </button></label> 
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                    <label htmlFor=""></label>
                  </div>}
                   <div className="text-center bg-body-tertiary d-flex flex-wrap"> 
                             
                  {/* <div className="cdView"> */}
                  {/* <div className="border rounded" style={{width:'33%'}}> */}
                     
                     {cdArray.map((cd, num)=>{

                        return (<>                        
                           <CDdisplay 
                           key={num}
                           artist={cd.artist_name}
                           album={cd.album_name}
                           price={cd.album_price}
                           year={cd.album_year}
                           id={cd.album_id}
                           cartItems={cartItems}
                           setCartItems={setCartItems}
                           cartCount={cartCount}
                           setCartCount={setCartCount}
                           popupObject={popupObject}
                           setPopupObject={setPopupObject}                           
                           />                          
                        </>)
                     })}
                     
                  {/* </div> */}
                  </div> 
                  <Popup 
                  popupObject={popupObject}
                  setPopupObject={setPopupObject}
                  />
                  </div>


               </div>       

               
            </>
   }

   const logOut = ()=>{
         localStorage.setItem('TOKEN', "");
         localStorage.setItem('EMAIL', "");
      setLoggedIn(()=>{
         return false;
      })
      setAdminPriv(()=>{
         return false;
      })

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
            localStorage.setItem('EMAIL', data.email)
            setLoggedIn(()=>{
               return true;
            })
            
         }           
      }
      else{         
         console.log("NO TOKEN FOUND");
         logOut();
      }
   }

   useEffect(()=>{
      verifyToken();
   },[])


   const attemptLogin = async()=>{
      
      const response = await fetch(`${urlFix}/api/login`,{
         method:"POST",
         headers:{"Content-Type":"application/json"},
         body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
         })
      })
      const data = await response.json();
      console.log(data)
       if(data.message == "success"){
         localStorage.setItem('TOKEN', data.token);
         localStorage.setItem('EMAIL', data.email)
         setLoggedIn(()=>{
            return true;
         })
         if(data.admn){
            setAdminPriv(()=>{
               return true;
            })
         }
      }
      else{
            setPopupObject(()=>{
               let popup = new Object();
               popup.type='type1';
               popup.message1=data.message;
               return popup;
            })
      }   
   }

   const attemptRegister = async()=>{

      const emailFormat = /\w+(@)\w+(\.)\w+/gi
      const validEmail = emailInput.match(emailFormat);
      if( !validEmail){
         let popup = new Object();
         popup.type="type1";
         popup.message1="Please use a valid email address";
         setPopupObject(()=>{
            return popup;
         })
         return;        
      }

      const response = await fetch(`${urlFix}/api/register`,{
         method:"POST",
         headers:{"Content-Type":"application/json"},
         body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
         })
      })
      const data = await response.json();
      console.log(data)
      if(data.message == "success"){
         localStorage.setItem('TOKEN', data.token);
         setLoggedIn(()=>{
            return true;
         })
      }



   }



   


      return <>

            {(loggedIn != true) && logInView()}
            {(loggedIn == true) && loggedInView()}
   
          </>

}



export default AccountPage;