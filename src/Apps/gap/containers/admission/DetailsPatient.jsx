import React from "react";
import { connect } from "react-redux";

const DetailsPatient = ({ currentPatient }) => {
  return (
    <div className="DetailsPatient">
      <h5 className="">Informations du patient</h5>
      <small>
        Nom et prenoms :{" "}
        <b>
          {currentPatient.nompatient} {currentPatient.prenomspatient}
        </b>
      </small>
      <br />
      <small>
        Sexe : <b>{currentPatient.sexepatient}</b>
      </small>
      <br />
      <small>
        Domicile : <b>{currentPatient.habitationpatient}</b>
      </small>
      <br />
      <small>
        Date de naissance : <b>{currentPatient.datenaissancepatient}</b>
      </small>
      <br />
      <small>
        Lieu de naissance : <b>{currentPatient.lieunaissancepatient}</b>
      </small>
      <br />
      <small>
        Nationalité : <b>{currentPatient.nationalitepatient}</b>
      </small>
      <br />
      <small>
        Contact : <b>{currentPatient.contactpatient}</b>
      </small>
      <br />
      <small>
        Situation matrimoniale :
        <b>{currentPatient.situationmatrimonialepatient}</b>
      </small>
      <br />
      <small>
        Religion : <b>{currentPatient.religionpatient}</b>
      </small>
      <br />
      <small>
        Profession : <b>{currentPatient.professionpatient}</b>
      </small>
      <br />
      <h5 className="mt-4">Parents</h5>
      <small>
        (père) {currentPatient.nomperepatient}{" "}
        {currentPatient.prenomsperepatient}{" "}
        <b>({currentPatient.contactperepatient})</b>
      </small>
      <br />
      <small>
        (mère) {currentPatient.nommerepatient}{" "}
        {currentPatient.prenomsmerepatient}{" "}
        <b>({currentPatient.contactmerepatient})</b>
      </small>
      <br />
      <h5 className="mt-4">Personne à contacter</h5>
      <small>
        {currentPatient.nompersonnesurepatient}{" "}
        {currentPatient.prenomspersonnesurepatient}{" "}
        <b>({currentPatient.contactpersonnesurepatient})</b>
      </small>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    detailsPatientReducer: { currentPatient },
  } = state;
  return { currentPatient };
};

const DetailsPatientConnected = connect(mapStateToProps)(DetailsPatient);
export default DetailsPatientConnected;
