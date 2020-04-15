import React from "react";

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
          <div className="col-4 p-5 text-dark">
            <div className="col-12 text-center">
              <i className=" mdi-5x animated pulse fa fa-ambulance infinite"></i>
            </div>
            <div className="text-center">
              <small>...</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chargement;
