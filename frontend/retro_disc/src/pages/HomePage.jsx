import React, { useEffect, useState } from "react";
import CDdisplay from "../components/CDdisplay";
// import { useNavigate } from "react-router";


const HomePage = ({createCart, setCartItems, cartCount, setCartCount, searchBar, setSearchBar}) => {
    let carouselArray = ['hiphopimg.jpg', 'countryimg.jpg', 'jazzimg.jpg', 'rnbimg.jpg', 'rockandrollimg.webp'];
    const [featuredAlbums, setFeaturedAlbums ] = useState([]);
    const [carouselImage, setCarouselImage] = useState(`${carouselArray[0]}`);
    const [carouselNumber, setCarouselNumber] = useState(0);
    
    let carNum = 0;
    const urlFix = 'http://localhost:3000';

    useEffect( ()=>{
          createCart();
       },[])

    useEffect(() => {
      const getApi = async () => {      
        let response = await fetch(`${urlFix}/api`);
        console.log(response);
        setFeaturedAlbums(()=>{
          return 43;
        })
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




//   const filteredAlbums = albums.filter((album) =>
//     `${album.title} ${album.artist}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (!albums || albums.length === 0) {
//     return <div>Loading albums or none found...</div>;
//   }

//   return (<main style={{ padding: '16px' }}>
//     {/* Search Bar */}
//     <div style={{ marginBottom: '20px' }}>
//       <input
//         type="text"
//         placeholder="Search by title or author..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           padding: '10px',
//           fontSize: '1em',
//           border: '1px solid #ccc',
//             borderRadius: '6px'
//         }}
//       />
//     </div>
//  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
//    {filteredAlbums.map((album) => (
//      <div
//        key={album.id}
//        onClick={() => navigate(`/album/${album.id}`)}
//        style={{
//          width: '180px',
//          border: '1px solid #ccc',
//          borderRadius: '8px',
//          padding: '12px',
//          cursor: 'pointer',
//          textAlign: 'center'
//        }}
//      >
//        <h4>{album.title}</h4>
//        <p style={{ fontSize: '0.9em' }}>{album.artist}</p>
//        {album.coverimage && (
//          <img
//            src={album.coverimage}
//            alt={album.title}
//            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
//          />
//        )}
//      </div>
//    ))}
//  </div>
//  </main>
// );
// }

// const HomePage2 = ({ urlFix }) => {
//   const [randomAlbums, setRandomAlbums] = useState([]);

//   const fetchRandomAlbums = async () => {
//       try {
//           const response = await fetch(`${urlFix}/api/album/random`);
//           const data = await response.json();
//           setRandomAlbums(data.album);
//       } catch (err) {
//           console.error("Failed to fetch random albums:", err);
//       }
//   };

//   useEffect(() => {
//       fetchRandomAlbums();
//   }, []);

//   return (
//       <div>
//           <h1>Featured Albums</h1>
//           <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
//               {randomAlbums.map((album, index) => (
//                   <div key={index} style={{border: '1px solid #ccc', padding: '10px', width: '250px'}}>
//                       <h3>{album.album_name}</h3>
//                       <p><strong>Artist:</strong> {album.artist_name}</p>
//                       <p><strong>Genre:</strong> {album.genre_name}</p>
//                       <p><strong>Year:</strong> {album.album_year}</p>
//                       <p><strong>Price:</strong> ${album.album_price}</p>
//                   </div>
//               ))}
//           </div>
//       </div>
//   );
// }

const HomePage = ({cartItems, setCartItems, cartCount, setCartCount}) => {
  let carouselArray = [
    "hiphopimg.jpg",
    "countryimg.jpg",
    "jazzimg.jpg",
    "rnbimg.jpg",
    "rockandrollimg.webp",
  ];
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [carouselImage, setCarouselImage] = useState(`${carouselArray[0]}`);
  const [carouselNumber, setCarouselNumber] = useState(0);
  
  let carNum = 0;
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

  const newCarouselImg = () => {
    setCarouselNumber((prev) => {
      return prev + 1;
    });
    console.log(carouselNumber);
    setCarouselImage(() => {
      return `${carouselArray[carouselNumber % carouselArray.length]}`;
    });
  };

  useEffect(() => {
    const doTheThang = async () => {
      setInterval(() => {
        setCarouselNumber((prev) => {
          let newNumber = prev + 1;
          return newNumber;
        });
        setCarouselImage(() => {
          let newValue = carouselArray[carouselNumber % carouselArray.length];
          return newValue;
        });
      }, 10000);
    };
    doTheThang();
  }, []);

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
          <div className="col-lg-6 col-md-8 mx-auto">
            {" "}
            <h1 className="fw-light">Album example</h1>{" "}
            <p className="lead text-body-secondary">
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don’t simply skip over it entirely.
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
              
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default HomePage;
