import React from  "react";



const AboutPage = () => {


          return(
                             <>
                                <div className="container" style={{height:"80vh"}} >
                                 
                                <h1 style={{marginBottom:"20vh", marginTop:"5vh", fontSize:'4rem'}}>ABOUT</h1>
                                <div style={{height: "30%", width:"100%", display:"flex", justifyContent:"center"}}><img style={{height:"50%"}} className="border rounded-circle" src="retro_disclogobw.png" alt="retrodisc logo" /></div>
                                <p style={{fontSize:'2rem'}}>RetroDisc is a site made by Seth Battle and Libby Pieper for their Fullstack Academy capstone project.</p> 
                                <p style={{fontSize:'2rem'}}>You can find Libby's LinkedIn profile <a href="https://www.linkedin.com/in/libby-pieper-7066ba9/" target="_blank" >here.</a></p> 
                                <p style={{fontSize:'2rem'}}>You can find Seth's LinkedIn profile <a href="https://www.linkedin.com/in/seth-battle-b0866226b/" target="_blank" >here.</a></p>
                             </div>
                             </>
          );

}



export default AboutPage;