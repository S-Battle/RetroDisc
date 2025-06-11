import React from  "react";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"



const StripeContainer = () => {


    const PUBLIC_KEY = 'pk_test_51RYTtoCffQFfKbvcRP1jTd6xepobP2hnjrwMt8efpPkIRWjUaozWRk2UrBnI8HxUvVYMRxnxseKyS21PVZG7R9pE004VQZ5MSi';
    const stripeTestPromise = loadStripe(PUBLIC_KEY);

          return(
                             <>
                             <Elements>
                                
                             </Elements>

                             </>
          );

}



export default StripeContainer;