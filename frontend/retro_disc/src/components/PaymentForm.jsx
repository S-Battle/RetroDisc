import React, { useState, useEffect} from  "react";
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import {Route, Routes, Link, useNavigate } from "react-router"
import SuccessfulPaymentPage from "../pages/SuccessfulPaymentPage";


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "black",
            color: "black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "2rem",
            fontSmoothing: "antialiased",
            ":-webkit-autofill" : {color: "black"},
            "::placeholder":{ color: "black" }
        },
        invalid: {
            iconColor: "red",
            color: "red"
        }
    }
}







const PaymentForm = ({urlFix, name, address, city, state, zip, amount, cartItems, setCartItems, paymentMade, setPaymentMade}) => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const tempSuccessPayment = ()=>{

        setPaymentMade(()=>{
            return true;
        })

    }

    const handleSubmit = async (e)=>{
        //e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement),
        })
        if(!error){
            try{
                const { id } = paymentMethod
                const response = await fetch(`${urlFix}/api/checkout/payment`,{
                    method : "POST",
                    headers : {"Content-Type":"application/json"},
                    body : JSON.stringify({
                        amount: amount,
                        id: id,
                        name,
                        address,
                        city,
                        state,
                        zip,
                    })
                })
                const responseData = await response.json();
                console.log(responseData)
                if(responseData.success){
                    console.log("Successful Payment");
                   
                }
            }catch(error){
                console.log("error: ", error)
            }
        }
        else{
            console.log(error.message);
        }    
    }
          return(
                <>
                <div style={{marginTop: "2rem"}}>
                    <CardElement options={CARD_OPTIONS} />  
                    <button onClick={()=>{
                    handleSubmit();
                    }}>PAY</button>                                 
                </div>
                <button onClick={()=>{ tempSuccessPayment()}}>TEST</button>
                   
                </>
          );

}



export default PaymentForm;