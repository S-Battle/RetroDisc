import React, { useEffect } from  "react";



const CDdisplay = ({artist, album, price, year, id, cartItems, setCartItems, cartCount, setCartCount, setPopupObject, popupObject}) => {
          
          let newArtistName = artist;
          if(newArtistName.indexOf("/") != -1){
            newArtistName = artist.replace("/", "");
          };          
          let newName = `${newArtistName.toLowerCase()}_${album.toLowerCase()}${year}.jpg`;
          let newNameArray = newName.split(" ");
          let finishedName = "";
          for(let i = 0; i < newNameArray.length; i++){
            finishedName = finishedName + newNameArray[i]
          }
          finishedName = "/album art/" + finishedName
          

          const addToCart = ((e)=>{           
            let albumString = e.target.attributes.album_info.nodeValue;
            let albumArray = albumString.split("*");           //let newAlbumObject = new Object();
            let popup = new Object();
            let needPopup = false;
            let foundNumber = cartItems.filter((item) =>{
              console.log("item[0]: ", item[0], "albumArray[0]: ", albumArray[0])
              return item[0] == albumArray[0]
            })
            console.log("found this", foundNumber)

            if (foundNumber.length > 0){
              console.log("already in cart");              
              popup.type='type1';
              popup.message1='This item has already been added to cart'   
              needPopup = true;    
              setPopupObject(()=>{
              console.log('Got here')
              if(needPopup){
                return popup;
              }
              else{
                return prev
              }
            })            

              return;
            }
            
            
            setCartItems((prev)=>{  
              localStorage.setItem("CART", [...cartItems,...albumArray])
              return [...prev, albumArray];
            })

          })
          useEffect(()=>{
          const addNumber = ()=>{
            setCartCount((prev)=>{
              let newNumber = cartItems.length;
              return newNumber;
            })            
          }
          addNumber();

          },[cartItems])
         
          
          
          
          return (
            
              <div className="col-12 col-sm-6 col-md-6 col-xl-4 col-xxl-4" style={{maxWidth:"600px", minWidth: "400px"}}>
              <div className="card shadow-sm">                                    
               <img className="w-100 rounded p-3 " style={{minWidth: "400px"}}  src={finishedName} alt={"ALBUM ART NOT AVAILABLE"} />                
                <div className="card-body d-flex flex-row justify-content-between">                  
                  <div className="card-text d-flex justify-conent-start flex-column align-items-start fs-1-lg w-75">
                   <div>{"Artist: "}{artist}</div> 
                    <div>{"Album: "}{album}</div>
                    <div>{"Price: "}${price}</div>
                    <div>{"Year: "}{year}</div>
                  </div>{" "}
                  <div className="d-flex justify-content-between align-items-center">
                    {" "}
                    <div className="btn-group d-flex align-content-start h-100">    
                      
                      <button album_id={id} album_info={id+"*"+artist +"*"+album +"*"+price+"*"+year}
                        type="button"
                        className="btn btn-sm btn-outline-secondary align-self-end remh4 rounded" onClick={(e)=>{
                          addToCart(e);
                        }}
                      >
                        Add to Cart
                      </button>{" "}
                    </div>{" "}
                    <small className="text-body-secondary"></small>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
              </div>
            
          );

}



export default CDdisplay;