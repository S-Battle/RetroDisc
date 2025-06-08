import React, { useState, useEffect} from  "react";
import CDdisplay from "../components/CDdisplay";
import CDcheckout from "../components/CDcheckout";
import CheckoutTotal from "../components/CheckoutTotal";


const CheckoutPage = ({urlFix, cartItems, setCartItems, cartCount, setCartCount, searchBar, setSearchBar, createCart}) => {
        const [addressInput, setAddressInput ] = useState("");
        const [cityInput, setCityInput ] = useState("");
        const [stateInput, setStateInput ] = useState("");
        const [zipInput, setZipInput ] = useState("");

    useEffect( ()=>{
          createCart();
    },[])


    console.log(cartItems)


          return(    <>
                            <div className="d-flex flex-wrap ">
                                <div className="border  col-12 col-lg-4">
                                    <h1 className="p-5">RETRO DISC</h1>
                                    <div className="d.flex flex-column p-5 ">
                                        <div className="w-100" ><label className="w-50" htmlFor=""><div>Address</div> <input className="rounded border-dark" style={{width:"400px"}} type="text" /></label></div>
                                        <br />
                                        <div><label htmlFor=""><div>City</div><input className="rounded border-dark" type="text" /></label></div>
                                        <br />
                                        <div><label htmlFor=""><div>State</div><input className="rounded border-dark" type="text" /></label></div>
                                        <br />
                                        <div><label htmlFor=""><div>Zip</div><input className="rounded border-dark" type="number" /></label></div>
                                    </div>
                                </div>
                                <div className="border col-12 col-lg-8 overflow-auto d-flex flex-column justify-content-start align-content-center align-items-center align-items-lg-end align-content-lg-end justify-content-lg-start justify-content-center">
                                <CheckoutTotal 

                                cartItems={cartItems}
                                
                                
                                />
                                
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






                             </> );
          

}



export default CheckoutPage;