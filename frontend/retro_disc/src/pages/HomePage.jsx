import React, { useEffect, useState } from "react";
import CDdisplay from "../components/CDdisplay";



const HomePage = ({cartItems, setCartItems, cartCount, setCartCount}) => {
  let carouselArray = [
    "hiphopimg.jpg",
    "country.jpg",
    "jazz.jpg",
    "rnboldschool.jpg",
    "rockandrollimg.webp",
    "hardrock.jpg",
    "metal.jpg",
    "pop.jpg",
    "punk.jpg",
    "raggae.jpg",
    "blues2.jpg",
    "folk.jpg",
    "electronicmusic.png",    
  ];
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [carouselImage, setCarouselImage] = useState(`${carouselArray[0]}`);
  const [carouselNumber, setCarouselNumber] = useState(0);
  let passedNumber = 0;  
  
  const urlFix = "http://localhost:3000";

  useEffect(() => {
    const getApi = async () => {
      let response = await fetch(`${urlFix}/api`);
      console.log(response);
    };
    getApi();
  }, []);

  useEffect(() => {
    const fetchFeaturedAlbums = async () => {
      try {
        const response = await fetch(`${urlFix}/api/album/random`);
        const data = await response.json();
        setFeaturedAlbums(data.album);
      } catch (err) {
        console.error("Failed to fetch featured albums:", err);
      }
    };
    fetchFeaturedAlbums();
  }, []);

  // const newCarouselImg = () => {
  //   setCarouselNumber((prev) => {
  //     return prev + 1;
  //   });
  //   console.log(carouselNumber);
  //   setCarouselImage(() => {
  //     return `${carouselArray[carouselNumber % carouselArray.length]}`;
  //   });
  // };


  function startCarousel(){

    passedNumber ++;
    changeCarouselImage(passedNumber);
  }
                              

  useEffect(() => {
    
     const doTheThang = async () => { 
     clearInterval(startCarousel)
      setInterval(startCarousel, 10000);      
    };

    doTheThang();
  }, []);
          
  const changeCarouselImage = (newNumber)=>{

      setCarouselImage(() => {
                let newValue = carouselArray[newNumber % carouselArray.length];                
                console.log(newNumber)               
                return newValue;
              });                       
      







  }








  return (
    <>
    <div  >


      <div className="d-flex flex-row gradient-background py-5 px-10 justify-content-center flex-wrap align-items-center align-content-center"  >
        
        <div className="d-flex justify-content-center flex-column p-5 col-12 col-lg-6 h-75 ">
            
           <h1 style={{fontSize:'4rem', fontWeight:'bold'}}>RETRODISC</h1>
            <h1 className="display-5 fw-bold lh-1 mb-5">                 
                THE KING OF MUSIC SHOPS
              </h1>
              
            <p className="lead text-white fs-3">
                Shop our selection of new and used CD's and vinyl records. 
                We have eveything from the classics to the latest hits.
        
            </p>
                <br></br>
            <p className="lead text-white fs-3">
                You take a risk, when you don't shop with RetroDisc.
            </p>
        
        </div>
        <div className="col-12 d-flex justify-content-center col-lg-6 p-5 h-75 align-content-center align-items-center">
          <img  className=" d-block mx-lg-auto img-fluid w-50 "  src="retro_disclogo.png" alt="retroDisc"  width="700"
                height="500"
                loading="lazy"  style={{minWidth:'450px'}}/>


        </div>

      </div>






      






















      
        {/* <div className="container col-xxl-8 px-4 py-5" >
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5 gradient-background "  >
            <div className="col-10 col-sm-8 col-lg-6 "   >
              <img
                src="retro_disclogo.png"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">            
              <h1 className="display-5 fw-bold lh-1 mb-3">
                RETRODISC <br />
                THE KING OF MUSIC SHOPS
              </h1>
              <p className="lead text-white fs-3">
                Shop our selection of new and used CD's and vinyl records. 
                We have eveything from the classics to the latest hits.
        
                <p></p>
                <br></br>
                You take a risk, when you don't shop with RetroDisc.
              </p>
             
            </div>
          </div>
        </div> */}








        
        <div
          className="carouselContainer"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={carouselImage}
                  alt="First slide"
                  style={{ width: "60vw", height: "60vh" }}
                />
              </div>

              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="hiphopimg.jpg"
                  alt="Second slide"
                />
              </div>

              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="rnbimg.jpg"
                  alt="Third slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="countryimg.jpg"
                  alt="Fourth slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="jazzimg.jpg"
                  alt="First slide"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row py-lg-5">
          {" "}
          <div className="col-lg-6 col-md-8 mx-auto ">
            {" "}
            <h1 className="fw-light fs-1 ">This Just In</h1>{" "}
            <p className="lead text-body-secondary  fs-3">
                Check out what's new in stock.   
                Browse our featured albums below.  
            </p>{" "}
            <p>
              {" "}
              {/* <a href="#" className="btn btn-primary my-2">
                Main call to action
              </a>{" "} */}
              {/* <a href="#" className="btn btn-secondary my-2">
                Secondary action
              </a>{" "} */}
            </p>{" "}
          </div>{" "}
        </div>
                    

        <div className="album py-5 bg-body-tertiary ">
          {" "}
          <div className="container">
            {" "}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
              {" "}

              {featuredAlbums.map((album, index) => {
                return <>                
                         
                  <CDdisplay
                    artist={album.artist_name}
                    album={album.album_name}
                    price={album.album_price}
                    year={album.album_year}
                    id={album.album_id}
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
    </>
  );
};



export default HomePage;
