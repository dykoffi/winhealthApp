import React from "react";
import DossiersPatient from "../../containers/admission/DossiersPatient";
import DetailsPatient from "../../containers/admission/DetailsPatient";
import { connect } from "react-redux";

const Dossiers = ({ currentPatient }) => {
  return (
    <div className="Dossiers row">
      {currentPatient.iddossier ? (
        <>
          <section className="col-12 p-0">
            <DetailsPatient />
          </section>
          <section className="col-12 p-3">
            <DossiersPatient />
          </section>
        </>
      ) : (
        <div className="col-12 text-secondary text-center">
          <h6 className="text-center lead">Aucun patient selectionné</h6>
          <small>Rendez vous dans liste des patients et selectionnez un patient</small>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  const {
    PatientReducer: { currentPatient },
  } = state;
  return { currentPatient };
};

const DossiersConnected = connect(mapStateToProps)(Dossiers);

export default DossiersConnected;
