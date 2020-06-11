import React from "react";
import AntecedantPatient from "../../containers/medical/AntecedantsPatient";
import DetailsPatient from "../../containers/soins/DetailsPatient";
import { connect } from "react-redux";

const Antecedant = ({ currentPatient }) => {
  return (
    <div className="Antecedant row p-3">
      <div className="col-12 text-secondary text-center">
          <h3 className="text-center lead">Page en cour de developpement ...</h3>
          <small>Cette page est toujours en construction</small>
        </div>
      {/* {currentPatient.iddossier ? (
        <>
          <section className="col-3">
            <DetailsPatient />
          </section>
          <section className="col-8 offset-1">
            <ConsultationPatient /> 
          </section>
        </>
      ) : (
        <div className="col-12 text-secondary text-center">
          <h3 className="text-center lead">Aucun patient selectionné</h3>
          <span>Rendez vous dans file d'attente des patients et selectionnez un patient</span>
        </div>
      )} */}
    </div>
  );
};
const mapStateToProps = (state) => {
  const {
    patientsReducer: { currentPatient },
  } = state;
  return { currentPatient };
};

const AntecedantConnected = connect(mapStateToProps)(Antecedant);

export default AntecedantConnected;
