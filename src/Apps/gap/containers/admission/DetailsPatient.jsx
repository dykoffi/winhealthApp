import React from "react";
import { connect } from "react-redux";
const DetailsPatient = ({ currentPatient }) => {
  return (
    <div className="DetailsPatient bgcolor-primary text-white row p-3 border-left">
      <div className="col-3" style={{ fontSize: '14.5px' }}>
        <h6 className="">Patient ({currentPatient.ipppatient})</h6>
        <small>Nom et prenoms :{" "}<b>{currentPatient.nompatient} {currentPatient.prenomspatient}</b></small><br />
        <small>Sexe : <b>{currentPatient.sexepatient}</b></small><br />
        <small>Domicile : <b>{currentPatient.habitationpatient}</b></small><br />
        <small>Contact : <b>{currentPatient.contactpatient}</b></small><br />
      </div>
      <div className="col-3">
        <h6>Personne à contacter</h6>
        <small>Nom et prenoms :{" "}<b>{currentPatient.nompersonnesurepatient}{" "}{currentPatient.prenomspersonnesurepatient}</b></small><br />
        <small>Qualité : <b>{currentPatient.qualitepersonnesurepatient}</b></small><br />
        <small>Contact : <b>{currentPatient.contactpersonnesurepatient}</b></small><br />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { PatientReducer: { currentPatient }, } = state;
  return { currentPatient };
};

const DetailsPatientConnected = connect(mapStateToProps)(DetailsPatient);
export default DetailsPatientConnected;
