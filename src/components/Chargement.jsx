import React from "react";
import logo from "../static/images/wh_logo.png";

const Chargement = () => {
  return (
    <div className="col-12 Chargement">
      <div className="row">
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 10001,
            opacity: 0.95,
          }}
          className="col-12 p-5 d-flex bg-light justify-content-center align-items-center"
        >
          <div className="col-4 p-5 text-dark d-flex flex-column align-items-center justify-content-center">
           <img src={logo} className="col-5 logo" alt=""/>
           <div>
             <i className="m-1  text-secondary mdi-image-brightness-1"></i>
             <i className="m-1  text-secondary mdi-image-brightness-1"></i>
             <i className="m-1  text-secondary mdi-image-brightness-1"></i>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chargement;
