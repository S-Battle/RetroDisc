import React from  "react";



const CDcheckout = ({albumId, albumName, albumArtist, albumYear, albumPrice, cartItems, setCartItems, cartCount, setCartCount}) => {


    let newName = `${albumArtist}_${albumName}${albumYear}`;
    let newNameArray = newName.split(" ");
    let finishedName = "";
    for(let i = 0; i < newNameArray.length; i++){
    finishedName = finishedName + newNameArray[i]
    }
    finishedName = "/album art/" + finishedName.toLowerCase() + ".jpg"
    console.log(finishedName)

    const removeFromList = (e)=>{
        
        let cartItemsCopy = cartItems;
        console.log(e.target.attributes.album_id.value);
        let targetId = e.target.attributes.album_id.value;
       let newArray = cartItems.filter((item, num)=>{
            console.log(item[0])
            console.log(num)
            return item[0] != targetId;
        })
        console.log(newArray);
        setCartItems(()=>{
            localStorage.setItem("CART", newArray)
            return [...newArray]
        })

    }



          return(
                             <>
                             <div className="d-flex flex-row justify-content-lg-end justify-content-center p-4 " style={{width:"500px"}}>
                                <div>
                                    <img style={{width:"100px"}} src={finishedName} />
                                </div>
                                <div className="w-100">
                               
                                <div className="d-flex flex-row w-100 justify-content-between align-items-end align-content-end h-100">
                                <div className="d-flex flex-column p-2">
                                    <div>ALBUM: {albumName}</div>
                                    <div>ARTIST: {albumArtist}</div>
                                    <div>YEAR: {albumYear}</div>
                                </div>
                                <div className="d-flex flex-column justify-content-end   align-items-center  p-2 "  >
                                    
                                    <div>${albumPrice}</div>
                                    <button  album_id={albumId} onClick={(e)=>{removeFromList(e)}}>Remove</button> 
                                </div>
                                </div>
                                                               
                                
                                </div>
                             </div>

                             </>
          );

}



export default CDcheckout;