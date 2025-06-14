import React from  "react";
import { Link } from "react-router";



const RetroFoot = ({totalPrint, setTotalPrint}) => {


          return (
            <>
            {!totalPrint && <div id="footing" style={{color:'pink'}} className="container fs-3">
              <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                {" "}
                <p className="col-md-4 mb-0 text-body-secondary">
                  ©2025 RETRODISC, Inc
                </p>{" "}
                <a
                  href="/"
                  className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                  aria-label="Bootstrap"
                >
                  {" "}
                  <svg
                    className="bi me-2"
                    width="40"
                    height="32"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#bootstrap"></use>
                  </svg>{" "}
                </a>{" "}
                <ul className="nav col-md-4 justify-content-end">
                  {" "}
                  <li className="nav-item">
                    <div  className="nav-link px-2 text-body-secondary ">
                      <Link to="/">Home</Link>
                    </div>
                  </li>{" "}               
                  <li className="nav-item">
                    <div  className="nav-link px-2 text-body-secondary">
                      <Link to="/about">About</Link>
                    </div>
                  </li>{" "}
                  <li className="nav-item">
                    <div  className="nav-link px-2 text-body-secondary">
                     <Link to="/faq">FAQ</Link>
                    </div>
                  </li>{" "}
                </ul>{" "}
              </footer>
              </div>  }
            
            </>
          );

}



export default RetroFoot;