import React from "react";
import ConstantesPatient from "../../containers/soins/ConstantesPatient";
import DetailsPatient from "../../containers/soins/DetailsPatient";
import { connect } from "react-redux";

const Constantes = ({ currentPatient }) => {
  return (
    <div className="Constantes row p-3">
      {currentPatient.iddossier ? (
        <>
          <section className="col-3">
            <DetailsPatient />
          </section>
          <section className="col-9">
            <ConstantesPatient /> 
          </section>
        </>
      ) : (
        <div className="col-12 text-secondary text-center">
          <h3 className="text-center lead">Aucun patient selectionné</h3>
          <span>Rendez vous dans file d'attente des patients et selectionnez un patient</span>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  const {
    patientsReducer: { currentPatient },
  } = state;
  return { currentPatient };
};

const ConstantesConnected = connect(mapStateToProps)(Constantes);

export default ConstantesConnected;
