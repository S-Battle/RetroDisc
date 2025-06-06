import React,{useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router';



const AccountPage = ({urlFix}) => {
   const [passwordInput, setPasswordInput] = useState("")
   const [emailInput, setEmailInput] = useState("")
   const [loggedIn, setLoggedIn ] = useState(false);
   const [customerPref, setCustomerPref] = useState([]);
   const navigate = useNavigate();
   const [cartItems, setCartItems] = useState([]);
   
   
   
   const logInView = ()=>{        
         
         return <div className="loginContainer" style={{display:"flex", justifyContent:"center", paddingTop:"100px"}}>
          <div className="text-center" style={{width: "350px"}}>
        <form className="form-signin">
  <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
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
      </div> 
   }

   const loggedInView = () =>{
      return <>
               <div className="d-flex flex-wrap p-2 bd-highlight h-100">
                  <div className="col-12 h-100 d-inline-block col-md-3 col-lg-2 border border-dark rounded" ></div>
                  <div className="col-12 col-md-9 col-lg-10 p-5 text-center bg-body-tertiary">
                  <h1 className="mb-3">Successfully Logged in</h1>
                  <h2 className="mb-3">Hello, {`${localStorage.getItem('EMAIL')}`}</h2>
                  <button data-mdb-ripple-init  href={null} role="button" onClick={()=>{logOut();}}>Log Out</button>
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

      if(emailInput == 'admin'){
         navigate('/admin');
      }

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
      }
   }

   const attemptRegister = async()=>{
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