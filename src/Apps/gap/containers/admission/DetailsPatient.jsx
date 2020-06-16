import React from "react";
import { connect } from "react-redux";

const DetailsPatient = ({ currentPatient }) => {
  return (
    <div className="DetailsPatient row">
      <div className="rounded col-12 px-4 py-2 mx-1 grey-text text-darken-1" style={{ fontSize: '14px' }}>
        <h6 className="mt-3">Patient</h6>
        <small>IPP : <b>{currentPatient.ipppatient}</b></small><br />
        <small>Nom et prenoms :{" "}<b>{currentPatient.nompatient} {currentPatient.prenomspatient}</b></small><br />
        <small>Sexe : <b>{currentPatient.sexepatient}</b></small><br />
        <small>Domicile : <b>{currentPatient.habitationpatient}</b></small><br />
        <small>Date de naissance : <b>{currentPatient.datenaissancepatient}</b></small><br />
        <small>Lieu de naissance : <b>{currentPatient.lieunaissancepatient}</b></small><br />
        <small>Nationalité : <b>{currentPatient.nationalitepatient}</b></small><br />
        <small>Contact : <b>{currentPatient.contactpatient}</b></small><br />
        <small>Situation matrimoniale :{" "}<b>{currentPatient.situationmatrimonialepatient}</b></small><br />
        <small>Religion : <b>{currentPatient.religionpatient}</b></small><br />
        <small>Profession : <b>{currentPatient.professionpatient}</b></small>
        {/* {currentPatient.nomperepatient.trim() !== "" ||
          currentPatient.nomtuteurpatient.trim() !== "" ||
          currentPatient.nommerepatient.trim() !== "" || (
            <>
              <h5 className="mt-4">Parents</h5>
              {currentPatient.nomperepatient.trim() !== "" && (
                <small>
                  (père) {currentPatient.nomperepatient}{" "}
                  {currentPatient.prenomsperepatient}{" "}
                  <b>({currentPatient.contactperepatient})</b>
                </small>
              )}
              <br />
              {currentPatient.nomtuteurpatient.trim() !== "" && (
                <small>
                  (père) {currentPatient.nomtuteurpatient}{" "}
                  {currentPatient.prenomstuteurpatient}{" "}
                  <b>({currentPatient.contacttuteurpatient})</b>
                </small>
              )}
              <br />
              {currentPatient.nommerepatient.trim() !== "" && (
                <small>
                  (mère) {currentPatient.nommerepatient}{" "}
                  {currentPatient.prenomsmerepatient}{" "}
                  <b>({currentPatient.contactmerepatient})</b>
                </small>
              )}
            </>
          )} */}
        <br />
        <h6 className="mt-3">Personne à contacter</h6>
        <small>
          ({currentPatient.qualitepersonnesurepatient}){" "}
          {currentPatient.nompersonnesurepatient}{" "}
          {currentPatient.prenomspersonnesurepatient}{" "}
          <b>{currentPatient.contactpersonnesurepatient}</b>
        </small>
        <br />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { detailsPatientReducer: { currentPatient }, } = state;
  return { currentPatient };
};

const DetailsPatientConnected = connect(mapStateToProps)(DetailsPatient);
export default DetailsPatientConnected;
