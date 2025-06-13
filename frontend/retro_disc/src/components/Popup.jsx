import React from  "react";



const Popup = ({ popupObject, setPopupObject }) => {


    const outerStyle = {
        zIndex:'2',
        display:'flex',
        justifyContent:'center',
        height:'100%',
        width:'100%',
        backdropFilter:'blur(5px)',
        position: 'fixed',
        right: '0%',
        top: '0%',
    }

    const innerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        minWidth: '50vw',
        minHeight: '50vh',
        maxWidth: '60vw',
        maxHeight: '60vh',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '1rem',
        border: '1px solid black',
        position: 'absolute',
        top: '25%',
        overflow: 'auto',
    }

    const closePopup = ()=>{
        let myPopupObject = new Object();
        myPopupObject.type = "";
        myPopupObject.message1 = "";
        myPopupObject.message2="";
        setPopupObject(()=>{
          return myPopupObject;  
        })
        
    }

    const popupType1 = ()=>{
        return <>
        
        <div style={outerStyle}>
            <div style={innerStyle}>
                <div className="d-flex justify-content-center"><h1>{popupObject.message1}</h1></div>
                <div className=" d-flex justify-content-center"><h1>{popupObject.message2}</h1></div>
                <div className="d-flex justify-content-center"><button onClick={()=>{closePopup()}}>CONTINUE</button></div>
            </div>
        </div>
        
        
        
        </>
    }

          return(
                             <>

                             {(popupObject.type == 'type1') && popupType1()}

                             </>
          );

}



export default Popup;