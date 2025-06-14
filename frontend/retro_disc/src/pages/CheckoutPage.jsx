import React, { useState, useEffect} from  "react";
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CDdisplay from "../components/CDdisplay";
import CDcheckout from "../components/CDcheckout";
import CheckoutTotal from "../components/CheckoutTotal";
import StripeContainer from "../components/StripeContainer";
import SuccessfulPaymentElement from "../components/SuccessfulPaymentElement";
import SuccessfulPaymentPage from "./SuccessfulPaymentPage";


const CheckoutPage = ({urlFix, loggedIn, totalPrint, setTotalPrint, cartItems, setCartItems, cartCount, setCartCount, searchBar, setSearchBar, createCart}) => {
        const [addressInput, setAddressInput ] = useState("");
        const [cityInput, setCityInput ] = useState("");
        const [stateInput, setStateInput ] = useState("");
        const [zipInput, setZipInput ] = useState("");
        const [success, setSuccess] = useState(false);
        const [checkoutAmount, setCheckoutAmount] = useState(-1)
        const [nameInput, setNameInput] = useState("");
        const [paymentMade, setPaymentMade ] = useState(false)


      


        

    useEffect( ()=>{
          createCart();
    },[])

    const needToLogIn = ()=>{
        return (<>
            <div  style={{height:"80vh"}}>
            <div className=" container" style={{height:"100%"}}>
            <div className="d-flex align-items-center flex-wrap" style={{height:"100%"}}>
            <div className="d-flex flex-column col-12 col-lg-6">
                <div><h1 >You have reached the cart.</h1></div>
                <div><h1>Please log in/Register to make purchases.</h1></div>
            </div>
            <div className="col-12 col-lg-6">
               <div style={{height: "100%", display:"flex", justifyContent:"center"}}><img style={{width:"50%"}} className="border rounded-circle" src="retro_disclogo.png" alt="retrodisc logo" /></div> 
            </div>
            </div>
            
            
            </div>
            </div>
            
            
            
            </>
        );
    }


    console.log(cartItems)


          return(<>     
                            {(!paymentMade && loggedIn) && <div className="container">
                            <div className="d-flex flex-wrap ">
                                <div className="border   col-12  col-lg-6 ">
                                    {/* <h1 className="p-5">RETRO DISC</h1> */}
                                    <div className="pl-5 w-100"><img className="mb-4 rounded-circle" src="retro_disclogo.png" alt="" width="370" height="370"/>
                                    </div> 
                                
                                    <div className="d.flex flex-column p-5 w-100">
                                         <div><label htmlFor=""><div>Name</div><input className="rounded border-dark p-1 fs-3 remh3" value={nameInput} onChange={(e)=>{
                                            setNameInput(()=>{
                                                return e.target.value
                                            })
                                        }} type="text" /></label></div>
                                        <br />
                                        <div className="w-100" ><label className="w-50 " htmlFor=""><div>Address</div> <input className="rounded border-dark p-1 fs-3 remh3" style={{width:"400px"}} onChange={(e)=>{
                                            setAddressInput(()=>{
                                                return e.target.value
                                            }) 
                                        }}  value={addressInput} type="text" /></label></div>
                                        <br />
                                        <div><label htmlFor=""><div>City</div><input className="rounded border-dark p-1 fs-3 remh3" value={cityInput} onChange={(e)=>{
                                            setCityInput(()=>{
                                                return e.target.value
                                            })
                                        }} type="text" /></label></div>
                                        <br />
                                        <div><label htmlFor=""><div>State</div><input className="rounded border-dark p-1 fs-3 remh3" value={stateInput} onChange={(e)=>{
                                            setStateInput(()=>{
                                                return e.target.value
                                            })
                                        }} type="text" /></label></div>
                                        <br />
                                        <div><label htmlFor=""><div>Zip</div><input className="rounded border-dark p-1 fs-3 remh3" value={zipInput} onChange={(e)=>{
                                            setZipInput(()=>{
                                                return e.target.value
                                            })
                                        }} type="number" /></label></div>                                                                               
                                        <StripeContainer
                                        urlFix={urlFix} 
                                        name={nameInput}
                                        address={addressInput}
                                        city={cityInput}
                                        state={stateInput}
                                        zip={zipInput}
                                        amount={checkoutAmount}
                                        cartItems = {cartItems}
                                        setCartItems = {setCartItems}
                                        paymentMade={paymentMade}
                                        setPaymentMade={setPaymentMade}  
                                        />
                                    </div>
                                </div>
                                <div className="border col-12 col-lg-6  overflow-auto d-flex flex-column justify-content-start align-content-center align-items-center align-items-lg-end align-content-lg-end justify-content-lg-start justify-content-center">
                                
                                <CheckoutTotal 
                                    cartItems={cartItems} 
                                    checkoutAmount = {checkoutAmount}
                                    setCheckoutAmount = { setCheckoutAmount }                              
                                /> 
                                <div className="d-flex justify-content-between w-100 mt-5 ">
                                    <div>
                                       
                                    </div>
                                    <div>
                                        {cartItems.map((item, num)=>{
                                        return <>
                                            <CDcheckout 
                                                key={item[0]}
                                                albumId={item[0]}
                                                albumName={item[2]} 
                                                albumArtist={item[1]} 
                                                albumYear={item[4]} 
                                                albumPrice={item[3]} 
                                                cartItems={cartItems} 
                                                setCartItems={setCartItems} 
                                                cartCount={cartCount} 
                                                setCartCount={setCartCount}                                        
                                            />                                    
                                            </>
                                        })}
                                    </div>
                                    
                                </div>
                                
                                
                                </div>
                               
                            </div>
                            </div>}
                            {(paymentMade && loggedIn) && <SuccessfulPaymentPage 
                                amount={checkoutAmount}
                                setCartItems={setCartItems}
                                cartItems={cartItems}
                                setTotalPrint={setTotalPrint}
                                totalPrint={totalPrint}
                            
                            />}
                            {(!loggedIn)&& needToLogIn() }
                              
                </> );
          

}



export default CheckoutPage;