import React from  "react";



const CDdisplay = ({artist, album, price, year}) => {


          return (
            <>
                <div className="col">
              <div className="card shadow-sm">
                {" "}
                <svg
                  aria-label="Placeholder: Thumbnail"
                  className="bd-placeholder-img card-img-top"
                  height="225"
                  preserveAspectRatio="xMidYMid slice"
                  role="img"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Thumbnail
                  </text>
                </svg>{" "}
                <div className="card-body">
                  {" "}
                  <div className="card-text">
                   <div>{"Artist: "}{artist}</div> 
                    <div>{"Album: "}{album}</div>
                    <div>{"Price: "}{price}</div>
                    <div>{"Year: "}{year}</div>
                  </div>{" "}
                  <div className="d-flex justify-content-between align-items-center">
                    {" "}
                    <div className="btn-group">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Add
                      </button>{" "}
                    </div>{" "}
                    <small className="text-body-secondary">9 mins</small>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
              </div>
            </>
          );

}



export default CDdisplay;