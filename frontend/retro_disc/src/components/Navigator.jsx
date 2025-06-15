import React from  "react";
import {Link, Route, Routes } from 'react-router'



const Navigator = ({adminPriv, setAdminPriv, totalPrint, setTotalPrint, logOut, loggedIn}) => {


          return(
                             <>   {!totalPrint && <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ fontSize:'2rem'}}>
  <div className="container-fluid">
    <div>  
      <div className="d-inline-flex justify-content-center" style={{gap:'1rem'}}>
        <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-disc-fill" viewBox="0 0 18 14">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0M4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0m9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5"/>
        </svg>
      </div>
      RETRODISC      
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="#" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#" to="/account" > {(!loggedIn) && 'Login/Register'} {(loggedIn) && 'Shop'}   </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" href="#"  to="/cart" >Cart</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" href="#"  to="/checkout" >Cart</Link>
        </li>
        {loggedIn && <li className="nav-item">
          <div className="nav-link cursor-pointer" role='button' onClick={()=>{logOut()}}> Log Out</div>
        </li>}
        
        {adminPriv && (<li className="nav-item">
          <Link className="nav-link" style={{color:'red'}} href="#"  to="/admin" >Admin</Link>
        </li>)}
        
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
      </ul>
    </div>
    
  </div>
</nav>}                         


                             </>
          );

}



export default Navigator;