import React from "react";
import DossiersPatient from "../../containers/admission/DossiersPatient";
import DetailsPatient from "../../containers/admission/DetailsPatient";
import { connect } from "react-redux";

const Dossiers = ({ currentPatient }) => {
  return (
    <div className="Dossiers row p-3">
      {currentPatient.iddossier ? (
        <>
          <section className="col-2">
            <DetailsPatient />
          </section>
          <section className="col-10">
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
    detailsPatientReducer: { currentPatient },
  } = state;
  return { currentPatient };
};

const DossiersConnected = connect(mapStateToProps)(Dossiers);

export default DossiersConnected;
