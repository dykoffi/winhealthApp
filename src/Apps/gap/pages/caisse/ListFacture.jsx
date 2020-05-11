import React from "react";

const ListFacture = ({ currentPatient }) => {
  return (
    <div className="Dossiers row p-3">
      <div className="col-12 text-secondary text-center">
        <h3 className="text-center lead">Aucun patient selectionné</h3>
        <span>
          Rendez vous dans liste des patients et selectionnez un patient
        </span>
      </div>
    </div>
  );
};

export default ListFacture;
