import React, { useState, useEffect } from  "react";
import SuccessfulPaymentElement from "../components/SuccessfulPaymentElement";
//import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import CheckoutTotal from "../components/CheckoutTotal";
import { useNavigate } from "react-router";



const SuccessfulPaymentPage = ({cartItems, tokenEmail, verifyToken, setCartItems, amount, setTotalPrint, totalPrint}) => {


   
let navigate = useNavigate();



let day = new Date(Date.now()).getDay();
let date = new Date(Date.now()).getDate();
let year = new Date(Date.now()).getFullYear();
let month = new Date(Date.now()).getMonth(); 

let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let finalDate = `${dayArray[day]}, ${monthArray[month]} ${date}, ${year}`;


   


const clearCart = () =>{

   localStorage.setItem("CART", [])
   setCartItems(()=>{
      let newArray = new Array();
      return newArray;
   })

}





setTotalPrint(true)
const handleButtonClick= ()=>{
   window.print()
}
const goHome= ()=>{
   clearCart();
   navigate('/');
}
let total = 0;
         cartItems.forEach((item, num)=>{
                        total = total + (Number(item[3]) * Number(item[5]))        
                        })
    total = total.toFixed(2)
    let tax = (total * .0725).toFixed(2);



          return(       <>
                             
                                <div className="container">
                                 
                                 
                                 <h1>THANK YOU FOR YOUR PURCHASE!!!</h1>
                                 <br />
                                 <h4>{localStorage.getItem('EMAIL')}</h4>
                                 <br />
                                 <div> <h4>{finalDate}</h4> </div>
                                 <br />                                
                                 <h4>ALBUMS</h4>  
                                 <br /><br />
                                 {cartItems.map((item, num)=>{                                     
                                    return <div key={num} className="fs-5 border-bottom border-dark">{item[2]}, {item[1]} <br /> ${item[3]} x {item[5]}</div>                              
                                 })}
                                 <br /><br />

                                 <div className="d-flex gap-5 fs-5">Tax: ${tax}</div>

                                 <br /><br /><br />

                                 <div className="d-flex gap-5"><div ><h4>TOTAL:</h4></div><div> <h4>${amount/100}</h4> </div></div>
                                 <br />
                                 <div className="text-danger fs-3" >Please print a copy for your records.</div>
                                 <br /><br />
                                 
                                 <div className="d-inline-flex flex-column gap-5">
                                 <button className="btn-lg" onClick={()=>{
                                    handleButtonClick();
                                 }}>PRINT</button>
                                 <button className="btn-lg" onClick={()=>{
                                    goHome();
                                 }}>Home</button>
                                 </div>
                                

                               </div>                                
                             </>
          );

}



export default SuccessfulPaymentPage;