import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Select } from "../../../../components/InputCustom";
import Axios from "axios";

import { thunkDetailsPatient } from "../../api/admission/detailsPatient";
import { connect } from "react-redux";
import { header } from "../../constants/apiQuery";

const AddPatient = ({ thunkDetailsPatient }) => {
  const [inputs, setinput] = useState({
    ipp: "",
    nom: "",
    prenoms: "",
    nomjeune: "",
    sexe: "",
    datenaissance: "",
    lieunaissance: "",
    nationalite: "",
    habitation: "",
    contact: "",
    situation: "",
    religion: "",
    profession: "",
    nompere: "",
    prenomspere: "",
    contactpere: "",
    nommere: "",
    prenomsmere: "",
    contactmere: "",
    nomtuteur: "",
    prenomstuteur: "",
    contacttuteur: "",
    nompersonnesure: "",
    prenomspersonnesure: "",
    contactpersonnesure: "",
    assure: "",
    assurance: "",
  });
  const [alert, setalert] = useState({
    show: false,
    severity: "success",
    message: "",
    time: null,
    style: "standart",
  });
  //patient
  function setipp({ target: { value } }) {
    setinput({ ...inputs, ipp: value });
  }
  function setnom({ target: { value } }) {
    setinput({ ...inputs, nom: value });
  }
  function setprenoms({ target: { value } }) {
    setinput({ ...inputs, prenoms: value });
  }
  function setnomjeune({ target: { value } }) {
    setinput({ ...inputs, nomjeune: value });
  }
  function setsexe({ target: { value } }) {
    setinput({ ...inputs, sexe: value });
  }
  function setdatenaissance({ target: { value } }) {
    setinput({ ...inputs, datenaissance: value });
  }
  function setlieunaissance({ target: { value } }) {
    setinput({ ...inputs, lieunaissance: value });
  }
  function setnationalite({ target: { value } }) {
    setinput({ ...inputs, nationalite: value });
  }
  function sethabitation({ target: { value } }) {
    setinput({ ...inputs, habitation: value });
  }
  function setcontact({ target: { value } }) {
    setinput({ ...inputs, contact: value });
  }
  function setprofession({ target: { value } }) {
    setinput({ ...inputs, profession: value });
  }
  function setreligion({ target: { value } }) {
    setinput({ ...inputs, religion: value });
  }
  function setsituation({ target: { value } }) {
    setinput({ ...inputs, situation: value });
  }
  //pere
  function setnompere({ target: { value } }) {
    setinput({ ...inputs, nompere: value });
  }
  function setprenomspere({ target: { value } }) {
    setinput({ ...inputs, prenomspere: value });
  }
  function setcontactpere({ target: { value } }) {
    setinput({ ...inputs, contactpere: value });
  }
  //mere
  function setnommere({ target: { value } }) {
    setinput({ ...inputs, nommere: value });
  }
  function setprenomsmere({ target: { value } }) {
    setinput({ ...inputs, prenomsmere: value });
  }
  function setcontactmere({ target: { value } }) {
    setinput({ ...inputs, contactmere: value });
  }
  //tuteur
  function setnomtuteur({ target: { value } }) {
    setinput({ ...inputs, nomtuteur: value });
  }
  function setprenomstuteur({ target: { value } }) {
    setinput({ ...inputs, prenomstuteur: value });
  }
  function setcontacttuteur({ target: { value } }) {
    setinput({ ...inputs, contacttuteur: value });
  }

  //personne sur
  function setnompersonnesure({ target: { value } }) {
    setinput({ ...inputs, nompersonnesure: value });
  }
  function setprenomspersonnesure({ target: { value } }) {
    setinput({ ...inputs, prenomspersonnesure: value });
  }
  function setcontactpersonnesure({ target: { value } }) {
    setinput({ ...inputs, contactpersonnesure: value });
  }

  //assurance
  function setassure({ target: { value } }) {
    setinput({ ...inputs, assure: value });
    if (value === "non" || value === "") setinput({ ...inputs, assurance: "" });
  }
  function setassurance({ target: { value } }) {
    setinput({ ...inputs, assurance: value });
  }
  function verifyField() {
    const {
      nom,
      prenoms,
      ipp,
      datenaissance,
      habitation,
      lieunaissance,
      contactpersonnesure,
      sexe,
    } = inputs;
    if (
      nom.trim().length === 0 ||
      prenoms.trim().length === 0 ||
      ipp.trim().length === 0 ||
      datenaissance.trim().length === 0 ||
      lieunaissance.trim().length === 0 ||
      habitation.trim().length === 0 ||
      sexe.trim().length === 0 ||
      contactpersonnesure.trim().length === 0
    ) {
      return false;
    } else {
      return true;
    }
  }
  function send() {
    if (verifyField()) {
      setalert({
        message: "Envoi en cours ...",
        severity: "info",
        show: true,
        time: null,
        style: "filled",
      });
      Axios({
        url: `${header.url}/gap/add/patient`,
        method: "POST",
        data: inputs,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }).then(({ data: { message, rows } }) => {
        setalert({
          message: message.label,
          severity: message.type,
          show: true,
          time: 5000,
          style: "filled",
        });
        setTimeout(() => {

          thunkDetailsPatient(rows[0].iddossier);
        }, 1000);
      });
    } else {
      setalert({
        message: "Veuillez renseigner les champs obligatoires",
        severity: "warning",
        show: true,
        time: 3500,
        style: "filled",
      });
    }
  }

  return (
    <div className="row p-3">
      <h6 className="font-weight-bold font-italic text-secondary">
        Information personnelles du patient
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <TextField
            className="col-3 ml-1 required"
            label="IPP du patient"
            value={inputs.ipp}
            onChange={setipp}
          />
          <TextField
            className="col-2 ml-1 required"
            label="Nom"
            value={inputs.nom}
            onChange={setnom}
          />
          <TextField
            className="col-3 ml-1 required"
            label="Prenoms"
            value={inputs.prenoms}
            onChange={setprenoms}
          />
          <TextField
            className="col-3 ml-1"
            label="Nom de jeune fille"
            value={inputs.nomjeune}
            onChange={setnomjeune}
          />
        </div>
        <div className="row py-2">
          <Select
            value={inputs.sexe}
            onChange={setsexe}
            className="col-3 ml-1 required"
            label="Sexe"
            options={[
              { value: "masculin", label: "Masculin" },
              { value: "feminin", label: "Feminin" },
            ]}
          />
          <TextField
            value={inputs.datenaissance}
            onChange={setdatenaissance}
            className="col-2 ml-1 required"
            label="Date de naissance"
            type="date"
          />
          <TextField
            className="col-3 ml-1 required"
            label="Lieu de naissance"
            value={inputs.lieunaissance}
            onChange={setlieunaissance}
          />
          <TextField
            className="col-3 ml-1 required"
            label="Nationalité"
            value={inputs.nationalite}
            onChange={setnationalite}
          />
        </div>
        <div className="row py-2">
          <TextField
            className="col-3 ml-1 required"
            label="Lieu d'habitation"
            value={inputs.habitation}
            onChange={sethabitation}
          />
          <TextField
            className="col-2 ml-1"
            label="Contact"
            value={inputs.contact}
            onChange={setcontact}
          />
          <Select
            value={inputs.situation}
            onChange={setsituation}
            className="col-3 ml-1"
            label="Situation matrimoniale"
            options={[
              { value: "marie", label: "Marié" },
              { value: "divorce", label: "Divorcé" },
              { value: "concubinage", label: "Concubinage" },
              { value: "veuf", label: "Veuf (ve)" },
            ]}
          />
          <Select
            value={inputs.religion}
            onChange={setreligion}
            className="col-3 ml-1"
            label="Réligion"
            options={[
              { value: "chretien", label: "Chretien" },
              { value: "musulman", label: "Musulman" },
              { value: "boudiste", label: "Boudiste" },
              { value: "animiste", label: "Animiste" },
              { value: "autre", label: "Autre réligion" },
              { value: "sans", label: "Sans réligion" },
            ]}
          />
        </div>
        <div className="row py-2">
          <Select
            value={inputs.profession}
            onChange={setprofession}
            className="col-3 ml-1"
            label="Profession"
            options={[
              { value: "activité", label: "En activité" },
              { value: "chomage", label: "Au chomage" },
              { value: "retraite", label: "Retraité" },
            ]}
          />
        </div>
      </div>
      <h6 className="font-weight-bold font-italic text-secondary">
        Informations relatives aux parents
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <TextField
            className="col-2 ml-1"
            label="Nom du père"
            value={inputs.nompere}
            onChange={setnompere}
          />
          <TextField
            value={inputs.prenomspere}
            onChange={setprenomspere}
            className="col-3 ml-1"
            label="Prenoms du père"
          />
          <TextField
            value={inputs.contactpere}
            onChange={setcontactpere}
            className="col-3 ml-1"
            label="Contact du père"
          />
        </div>
        <div className="row py-2">
          <TextField
            className="col-2 ml-1"
            label="Nom de la mère"
            value={inputs.nommere}
            onChange={setnommere}
          />
          <TextField
            value={inputs.prenomsmere}
            onChange={setprenomsmere}
            className="col-3 ml-1"
            label="Prenoms de la mère"
          />
          <TextField
            value={inputs.contactmere}
            onChange={setcontactmere}
            className="col-3 ml-1"
            label="Contact de la mère"
          />
        </div>
      </div>
      <h6 className="font-weight-bold font-italic text-secondary">
        Informations relatives au tuteur
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <TextField
            className="col-2 ml-1"
            label="Nom du tuteur"
            value={inputs.nomtuteur}
            onChange={setnomtuteur}
          />
          <TextField
            value={inputs.prenomstuteur}
            onChange={setprenomstuteur}
            className="col-3 ml-1"
            label="Prenoms du tuteur"
          />
          <TextField
            value={inputs.contacttuteur}
            onChange={setcontacttuteur}
            className="col-3 ml-1"
            label="Contact du tuteur"
          />
        </div>
      </div>
      <h6 className="font-weight-bold font-italic text-secondary">
        Personne à contacter en cas de besoin
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <TextField
            className="col-2 ml-1"
            label="Nom"
            value={inputs.nompersonnesure}
            onChange={setnompersonnesure}
          />
          <TextField
            value={inputs.prenomspersonnesure}
            onChange={setprenomspersonnesure}
            className="col-3 ml-1"
            label="Prenoms"
          />
          <TextField
            value={inputs.contactpersonnesure}
            onChange={setcontactpersonnesure}
            className="col-3 ml-1 required"
            label="Contact"
          />
        </div>
      </div>
      <h6 className="font-weight-bold font-italic text-secondary">
        Informations relatives à l'assurance
      </h6>
      <div className="col-12 px-5 mb-4 grey-text text-darken-1">
        <div className="row py-2">
          <Select
            value={inputs.assure}
            onChange={setassure}
            className="col-2 ml-1"
            label="Assuré(e) ?"
            options={[
              { value: "oui", label: "Oui" },
              { value: "non", label: "Non" },
            ]}
          />
          {inputs.assure === "oui" && (
            <Select
              value={inputs.assurance}
              onChange={setassurance}
              className="col-3 ml-1"
              label="Nom de l'assurance"
              options={[
                { value: "nsia", label: "NSIA" },
                { value: "sgbci", label: "SBGCI" },
                { value: "alianz", label: "Alianz" },
              ]}
            />
          )}
        </div>
      </div>
      <div className="">
        <button
          onClick={() => {
            send();
          }}
          className="btn btn-primary btn-sm"
        >
          Envoyer le formulaire
        </button>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          // TransitionComponent={<Slide direction="right" />}
          autoHideDuration={alert.time}
          onClose={() => {
            setalert({ ...alert, show: false });
          }}
          open={alert.show}
        >
          <MuiAlert
            elevation={6}
            variant={alert.style}
            severity={alert.severity}
          >
            {alert.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

const AddPatientConnected = connect(null, { thunkDetailsPatient })(AddPatient);
export default AddPatientConnected;
