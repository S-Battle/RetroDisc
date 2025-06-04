import React,{useEffect, useState} from "react";



const AccountPage = ({urlFix}) => {
   const [passwordInput, setPasswordInput] = useState("")
   const [emailInput, setEmailInput] = useState("")
   const [loggedIn, setLoggedIn ] = useState(false);
      const loginView = ()=>{             
         
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
      </div> }


   const verifyToken = async ()=>{
      if(localStorage.getItem("TOKEN") != ""){
      let response = await fetch(`${urlFix}/api/token/verify`,{
         method: "POST",
         headers:{"Content-Type":"application/json",
            authorization:`Bearer:${localStorage.getItem('TOKEN')}`
         },
      });
      console.log("RESPONSE: ",response);      
      }
      else{
         console.log("NO TOKEN FOUND")
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
      }



   }


      return <>

            {loginView()}
   
          </>

}



export default AccountPage;