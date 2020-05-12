import React from "react";
import DossiersPatient from "../../containers/soins/DossiersPatient";
import DetailsPatient from "../../containers/soins/DetailsPatient";
import { connect } from "react-redux";

const Dossiers = ({ currentPatient }) => {
  return (
    <div className="Constantes row p-3">
      {currentPatient.iddossier ? (
        <>
          <section className="col-3">
            <DetailsPatient />
          </section>
          <section className="col-9">
            <DossiersPatient />
          </section>
        </>
      ) : (
        <div className="col-12 text-secondary text-center">
          <h3 className="text-center lead">Aucun patient selectionné</h3>
          <span>Rendez vous dans liste des patients et selectionnez un patient</span>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  const {
    detailsPatientReducer: { currentPatient },
  } = state;
  return { currentPatient };
};

const DossiersConnected = connect(mapStateToProps)(Dossiers);

export default DossiersConnected;
