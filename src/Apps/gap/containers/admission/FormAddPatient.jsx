import React from "react";

const FormmAddPatient = () => {
  return (
    <div className="FormAddProfil Modal col-12 d-flex justify-content-center align-items-center">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 white">
          <div className="row d-flex justify-content-center">
            <div className="col-12 p-3 text-left">
              <small>Informations de l'utilisateur</small>
              <input
                type="text"
                className="col-12 mt-2 p-1 rounded"
                placeholder="Nom"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormmAddPatient;
