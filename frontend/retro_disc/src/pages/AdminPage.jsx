import React, {useState, useEffect} from  "react";




const AdminPage = ({urlFix}) => {
    const [artistInput, setArtistInput] = useState("");
    const [albumInput, setAlbumInput] = useState("");
    const [priceInput, setPriceInput] = useState("");
    const [genreInput, setGenreInput] = useState("");
    const [yearInput, setYearInput] = useState("");
    const [allAlbums, setAllAlbums] = useState([ "fake album", "fake album 2", "fake album 3" ]);
    const allAlbumsView = ()=>{

        return <>
        <div style={{width:'60vw', border:"2px solid black", height: "60vh", overflow:"auto"}}>
            {
                 allAlbums.map((album, num)=>{
                   return <>
                   <div>{album.album_name } {album.artist_name} {album.album_year} {album.genre_name} {album.album_price}</div>
                </>} 
                )     
            }
              
            </div>        
        </>
    } 
    const addAlbumFunction = async ()=>{

        const response = await fetch(`${urlFix}/api/add/album`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                artistInput: artistInput,
                albumInput: albumInput,
                priceInput: priceInput,
                genreInput: genreInput,
                yearInput: yearInput
            })
        })
        const data = await response.json();
    }
    
    const getAllAlbums = async () => {

        const response = await fetch(`${urlFix}/api/get/all/albums`)
        
        const data = await response.json();
        setAllAlbums(()=>{
            return data.albums;
        })

    }

    




    const addedAlbumView = ()=>{

        return<> 
            <div style={{display:"flex", }}></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <label htmlFor="">ARTIST <input type="text"  value={artistInput}  onChange={(e)=>{                
                setArtistInput(()=>{
                    return e.target.value;
                })
            }}     /></label>
            <label htmlFor="">ALBUM <input type="text" value={albumInput} onChange={(e)=>{                  
                setAlbumInput(()=>{
                    return e.target.value
                })               
            }} /></label>
            <label htmlFor="">PRICE <input type="number" value={priceInput} onChange={(e)=>{               
                setPriceInput(()=>{
                    return e.target.valueAsNumber;
                })
            }}  /></label>
            <label htmlFor="">GENRE <input type="text" value={genreInput}  onChange={(e)=>{                
                setGenreInput(()=>{
                    return e.target.value;
                })
            }} /></label>
            <label htmlFor="">YEAR <input type="number" value={yearInput}   onChange={(e)=>{                
                setYearInput(()=>{
                    return e.target.valueAsNumber;
                })
            }} /></label>
        </>

    }


          return(
                             <>
                             <div style={{display:"flex", flexDirection:"column", justifyContent:"center",  alignItems:'center'}}>
                             <h1>ADMIN PAGE</h1>

                             <button onClick={()=>{
                                addAlbumFunction();
                             }}>ADD ALBUM</button>
                             <button onClick={()=>{
                                getAllAlbums();
                             }}>GET ALBUMS</button>
                             {addedAlbumView()}
                             {allAlbumsView()}
                             

                            </div>

                             </>
          );

}



export default AdminPage;