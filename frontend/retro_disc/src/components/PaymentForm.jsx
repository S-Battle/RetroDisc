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
//pm_1RZyLICffQFfKbvcQxXtOWlz






const PaymentForm = ({urlFix, tokenEmail, popupObject, setPopupObject, name, address, city, state, zip, amount, cartItems, setCartItems, paymentMade, setPaymentMade}) => {

    const stripe = useStripe();
    const elements = useElements();
   

    const tempSuccessPayment = ()=>{

        setPaymentMade(()=>{
            return true;
        })

    }

    const handleSubmit = async (e)=>{
        //e.preventDefault();
        if( (name == "") || (address == "") || (city == "") || ( state == "") || (zip == "")){
            console.log("NO BUENO")
            let popup = new Object();
            popup.type = "type1"
            popup.message1 = "Please fill in all fields before continuing."
            popup.message2 = "(name address city state zip)"
            setPopupObject(()=>{
                return popup;
            })
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement),            
        })
        // paymentMethod = await stripe.paymentMethods.attach(
        //     {
        //         customer: { name,
        //                     address : {
        //                                 line1: address,
        //                                 city: city,
        //                                 state: state,
        //                                 postal_code: zip,
        //                             }
        //                   }
        //     })
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
                        email: tokenEmail,
                    })
                })
                const responseData = await response.json();
                console.log(responseData)
                if(responseData.success){
                    console.log("Successful Payment");
                    
                    setPaymentMade(()=>{                        
                        let myVal = true;
                        return myVal;
                    });
                    updatePurchases(id)                   
                }
            }catch(error){
                console.log("error: ", error)
            }
        }
        else{
            console.log(error.message);
        }    
    }
    const getUserId = async ()=>{
        let response = await fetch(`${urlFix}/api/retrieve/user_id`, {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                email : tokenEmail,
            })
        })
        let data = await response.json();
        console.log(response);
        return data;
    }

    const updatePurchases = async (id)=>{

        let userID = await getUserId()
        let insertInfo = await cartItems.map((item)=>{
            return (`('${userID}', '${item[0]}', ${Number (item[5])}, '${name}',
            '${address}', '${city}', '${state}', '${zip}', '${id}')`)
        })
        const request = await fetch(`${urlFix}/api/update/sales`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body : JSON.stringify({
            array: insertInfo,            
        })
    })    
}












          return(
                <>
                <div style={{marginTop: "2rem"}}>
                    {(cartItems.length < 1) && <h3>NO ITEMS IN CART</h3>  }
                    {(cartItems.length > 0) && <CardElement options={CARD_OPTIONS} /> } 
                    {(cartItems.length > 0) && <button className="btn-lng mt-3" role='btn' onClick={()=>{
                    handleSubmit();
                    }}>PAY</button> }  <br />
                    <button className="btn-lng mt-3" role='btn' onClick={()=>{
                        updatePurchases();
                        //getUserId();
                    }}>Update Purchases</button>                              
                </div>
                <button className="mt-3" onClick={()=>{ tempSuccessPayment()}}>TEST</button>
                   
                </>
          );

}






export default PaymentForm;