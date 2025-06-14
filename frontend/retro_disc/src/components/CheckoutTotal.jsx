import React, {useState, useEffect } from  "react";



const CheckoutTotal = ({cartItems, checkoutAmount, setCheckoutAmount}) => {

    let sum = 0;
    
    cartItems.forEach((item, num)=>{
        sum = sum + (Number(item[3]) * Number(item[5]));
        console.log(sum)
    })
    sum = sum.toFixed(2)
    let tax = (sum * .0725).toFixed(2);
    let total = (Number(sum) + Number(tax)).toFixed(2);
    
    useEffect(()=>{        
        const handlePayChange = async ()=>{            
            setCheckoutAmount(()=>{
                console.log('TOTAL: ', total)
                        return total * 100;
            })
        }
        handlePayChange();     
    },[total])
    

          return(
                             <>
                             <div id="checkoutBox" className="align-self-lg-start border border-dark rounded p-5" style={{width:"450px"}}>
                                <h2>Checkout</h2>
                                <div className="d-flex mt-4"><div  style={{width:'80px'}}>Amount:</div><div>${sum}</div></div>
                                <div className="d-flex mt-0"><div style={{width:'80px'}}>Tax:</div><div>${tax}</div></div>
                                <div className="mt-0">------------------------</div>
                                <div className="d-flex mt-0"><div style={{width:'80px'}}>Total:</div><div>${total}</div></div>
                                <div></div>
                            </div>
                             

                             </>
          );

}



export default CheckoutTotal;