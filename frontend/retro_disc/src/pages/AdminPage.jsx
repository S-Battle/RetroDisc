import React, {useState, useEffect} from  "react";




const AdminPage = ({urlFix, verifyToken, adminPriv, setTotalPrint, totalPrint, setAdminPriv}) => {
    const [artistInput, setArtistInput] = useState("");
    const [albumInput, setAlbumInput] = useState("");
    const [priceInput, setPriceInput] = useState("");
    const [genreInput, setGenreInput] = useState("");
    const [yearInput, setYearInput] = useState("");
    const [allAlbums, setAllAlbums] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    
    const allUsersView = () => {
            return (
                <div style={{width:'60vw', border:"2px solid black", height: "60vh", overflow:"auto"}}>
                    {/* <h1>ALL USERS</h1> */}
                    {
                        allUsers.map((user, index) => (
                            <div key={index} style={{borderBottom: "1px solid grey", padding: "10px"}}>
                                <div><strong>User ID:</strong> {user.user_id}</div>
                                <div><strong>Email:</strong> {user.email}</div>
                            </div>
                        ))
                    }
                </div>
            );
        };

        useEffect(()=>{
            verifyToken();
           setTotalPrint(()=>{
              return false;
           })
        },[])




    const allAlbumsView = ()=>{

        return <>
        <div style={{width:'60vw', border:"2px solid black", height: "60vh", overflow:"auto"}}>
            {
                 allAlbums.map((album, num)=>{
                   return <div key={num}>
                   <div className="d-flex justify-content-sm-center flex-row align-content-sm-center align-items-sm-center   flex-wrap border border-dark rounded" ><div className="col-xxl-2 col-lg-4 text-sm-center text-center col-sm-12 col-12 col-md-6 text-md-start p-2 flex-fill bd-highlight">Name: {album.album_name }</div> <div className="col-xxl-2  col-12 text-sm-center col-lg-4 col-sm-12 col-md-6 text-center text-md-start p-2 flex-fill bd-highlight" >Artist: {album.artist_name}</div> <div className="col-xxl-2  text-sm-center col-12 col-lg-4 col-md-6 col-sm-12 text-center text-md-start  p-2 flex-fill bd-highlight"  >YEAR: {album.album_year}</div> <div  className="col-xxl-2  col-12 col-lg-4 col-md-6 col-sm-12  text-center text-sm-center text-md-start p-2 flex-fill bd-highlight"  >GENRE: {album.genre_name}</div> <div  className="col-xxl-2  col-12 col-lg-4 col-md-6 col-sm-12  text-center  text-sm-center text-md-start  p-2 flex-fill bd-highlight"  >PRICE: ${album.album_price}</div></div>
                </div>} 
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

    
    const getAllUsers = async () => {
        try {
            const response = await fetch(`${urlFix}/api/get/all/users`);
            const data = await response.json();
            setAllUsers(data.users); 
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };



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
        const noAccess = ()=>{
            return<>
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center align-content-center" style={{height:"80vh"}}>
                    <h1>WARNING!</h1>                
                    <h1>YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE!</h1> 
               </div>
            </div>           
            </>
        }


          return(
                             <>

                            { (adminPriv) && (<div style={{display:"flex", flexDirection:"column", justifyContent:"center",  alignItems:'center'}}>
                                <h1>ADMIN PAGE</h1>

                                <button onClick={()=>{
                                    addAlbumFunction();
                                }}>ADD ALBUM</button>
                                <button onClick={()=>{
                                    getAllAlbums();
                                }}>GET ALBUMS</button>
                                {addedAlbumView()}
                                {allAlbumsView()}
                                <button onClick={()=>{
                                    getAllUsers();
                                }}>GET USERS</button>
                                    {allUsersView()}
                                <></>
                                </div>)}
                                {(!adminPriv) && noAccess()}
                             

                             </>
          );

}



export default AdminPage;