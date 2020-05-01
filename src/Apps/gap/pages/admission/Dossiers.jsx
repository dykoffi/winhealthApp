import React from "react";
import DossiersPatient from "../../containers/admission/DossiersPatient";

const Dossiers = () => {
  return (
    <div className="Dossiers row p-3 text-center ">
      <div className="col-12">
        <div className="row d-flex  justify-content-center">
          <input
            type="text"
            className="p-1 col-8 rounded"
            placeholder="Rechercher un dossier patient"
          />
        </div>
      </div>
      <div className="col-12">
          <DossiersPatient />
      </div>
    </div>
  );
};

export default Dossiers;
