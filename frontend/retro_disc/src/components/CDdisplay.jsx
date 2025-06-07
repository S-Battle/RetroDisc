import React from  "react";



const CDdisplay = ({artist, album, price, year, id, cartItems, setCartItems, cartCount, setCartCount }) => {


          let newName = `${artist.toLowerCase()}_${album.toLowerCase()}${year}.jpg`;
          let newNameArray = newName.split(" ");
          let finishedName = "";
          for(let i = 0; i < newNameArray.length; i++){
            finishedName = finishedName + newNameArray[i]
          }
          finishedName = "/album art/" + finishedName
          console.log(finishedName);
          
          return (
            <>
              <div className="col">
              <div className="card shadow-sm">                                    
               <img className="w-100 rounded p-3"  src={finishedName} alt={"ALBUM ART NOT AVAILABLE"} />                
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
                      
                      <button album_id={id}
                        type="button"
                        className="btn btn-sm btn-outline-secondary align-self-end remh4 rounded"
                      >
                        Add to Cart
                      </button>{" "}
                    </div>{" "}
                    <small className="text-body-secondary"></small>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
              </div>
            </>
          );

}



export default CDdisplay;