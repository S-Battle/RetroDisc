import React from  "react";
import { loadStripe } from "@stripe/stripe-js"
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm";



const StripeContainer = ({urlFix, name, address, city, state, zip, amount, cartItems, setCartItems, paymentMade, setPaymentMade}) => {


    const PUBLIC_KEY = 'pk_test_51RYTtoCffQFfKbvcRP1jTd6xepobP2hnjrwMt8efpPkIRWjUaozWRk2UrBnI8HxUvVYMRxnxseKyS21PVZG7R9pE004VQZ5MSi';
    const stripeTestPromise = loadStripe(PUBLIC_KEY);

          return(
                  <>
                  <Elements stripe={stripeTestPromise}>
                     <PaymentForm
                     urlFix={urlFix}
                     name={name}
                     address={address}
                     city={city}
                     state={state}
                     zip={zip}
                     amount={amount}
                     cartItems={cartItems}
                     setCartItems={setCartItems}
                     paymentMade={paymentMade}
                     setPaymentMade={setPaymentMade}
                     />   
                  </Elements>

                  </>
          );

}



export default StripeContainer;