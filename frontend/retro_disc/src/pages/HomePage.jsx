import React, {useEffect, useState} from  "react";
import CDdisplay from "../components/CDdisplay";



const HomePage = () => {
    let carouselArray = ['hiphopimg.jpg', 'countryimg.jpg', 'jazzimg.jpg', 'rnbimg.jpg', 'rockandrollimg.webp'];
    const [featuredAlbums, setFeaturedAlbums ] = useState([]);
    const [carouselImage, setCarouselImage] = useState(`${carouselArray[0]}`);
    const [carouselNumber, setCarouselNumber] = useState(0);
    
    let carNum = 0;
    const urlFix = 'http://localhost:3000';

    useEffect(() => {
      const getApi = async () => {      
        let response = await fetch(`${urlFix}/api`);
        console.log(response);
      };
      getApi();
    }, []);

    const newCarouselImg = ()=>{
      setCarouselNumber((prev)=>{
         return prev + 1;
      })
      console.log(carouselNumber);
      setCarouselImage(()=>{         
         return `${carouselArray[ carouselNumber % carouselArray.length ]}`
      })
    }   

    useEffect(()=>{
      const doTheThang = async ()=>{
         setInterval(()=>{
            setCarouselNumber((prev)=>{
               let newNumber = prev + 1;
               return newNumber;
            }) 
            setCarouselImage(()=>{
               let newValue = carouselArray[carouselNumber % carouselArray.length];
               return newValue;
            })           
         }, 10000)}
      doTheThang();      
    }, [])

    



          return (
            <>
            <div>
              <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                  <div className="col-10 col-sm-8 col-lg-6">
                    <img
                      src="coverPhoto.jpg"
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
                    <p className="lead">
                      You take a risk, when you don't shop with RetroDisc                      
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg px-4 me-md-2"
                      >
                        Primary
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg px-4"
                      >
                        Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>

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
                        style={{width:"60vw", height:"60vh"}}
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
                <div className="col-lg-6 col-md-8 mx-auto">
                  {" "}
                  <h1 className="fw-light">Album example</h1>{" "}
                  <p className="lead text-body-secondary">
                    Something short and leading about the collection below—its
                    contents, the creator, etc. Make it short and sweet, but not
                    too short so folks don’t simply skip over it entirely.
                  </p>{" "}
                  <p>
                    {" "}
                    <a href="#" className="btn btn-primary my-2">
                      Main call to action
                    </a>{" "}
                    <a href="#" className="btn btn-secondary my-2">
                      Secondary action
                    </a>{" "}
                  </p>{" "}
                </div>{" "}
              </div>

              <div className="album py-5 bg-body-tertiary">
                {" "}
                <div className="container">
                  {" "}
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {" "}
                     <CDdisplay />
                     <CDdisplay />
                     <CDdisplay />
                     <CDdisplay />
                     <CDdisplay />
                     <CDdisplay />
                     <CDdisplay />
                     <CDdisplay />
                     <CDdisplay />                    
                            
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                   
              
              
              </div>
            </>
         

          );

}



export default HomePage;