import React, { useState, useEffect} from  "react";
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js'



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







const PaymentForm = ({urlFix}) => {

    const stripe = useStripe();
    const elements = useElements();

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
                        amount: 1000,
                        id: id
                    })
                })
                const responseData = response.json();
                if(responseData.success){
                    console.log("Successful Payment");
                    setSuccess(()=>{
                        return true;
                    })
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
                             </>
          );

}



export default PaymentForm;