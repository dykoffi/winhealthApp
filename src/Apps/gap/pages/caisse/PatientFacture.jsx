import React from "react";

const PatientFacture = ({ currentPatient }) => {
  return (
    <div className="Dossiers row p-3">
      <div className="col-12 text-secondary text-center">
        <h6 className="text-center lead">Aucun patient selectionné</h6>
        <small>
          Rendez vous dans liste des patients et selectionnez un patient
        </small>
      </div>
    </div>
  );
};

export default PatientFacture;
