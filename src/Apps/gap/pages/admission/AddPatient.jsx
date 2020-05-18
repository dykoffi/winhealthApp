import React, { useState, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Input from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Axios from "axios";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { thunkDetailsPatient } from "../../api/admission/detailsPatient";
import { connect } from "react-redux";
import { header } from "../../../global/apiQuery";
import { MenuItem, InputLabel, FormControl, Button } from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";

import ThemeContext from "../../../global/context";

const AddPatient = ({ thunkDetailsPatient }) => {
  const theme = useContext(ThemeContext);
  const [inputs, setinput] = useState({
    nom: "",
    prenoms: "",
    civilite: "",
    sexe: "",
    datenaissance: new Date(),
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
    qualitepersonnesure: "",
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
  // function setipp({ target: { value } }) {
  //   setinput({ ...inputs, ipp: value });
  // }
  function setnom({ target: { value } }) {
    setinput({ ...inputs, nom: value });
  }
  function setprenoms({ target: { value } }) {
    setinput({ ...inputs, prenoms: value });
  }
  function setcivilite({ target: { value } }) {
    setinput({ ...inputs, civilite: value });
  }
  function setsexe({ target: { value } }) {
    setinput({ ...inputs, sexe: value });
  }
  function setdatenaissance(value) {
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
  function setqualitepersonnesure({ target: { value } }) {
    setinput({ ...inputs, qualitepersonnesure: value });
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
      civilite,
      habitation,
      contactpersonnesure,
      sexe,
    } = inputs;
    if (
      nom.trim().length === 0 ||
      civilite.trim().length === 0 ||
      prenoms.trim().length === 0 ||
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
    <div className="row p-4">
      <fieldset className="border col-4 px-4 py-2 mx-1 grey-text text-darken-1">
        <legend className="grey lighten-4 px-3">
          <small>Patient</small>
        </legend>
        <div className="row py-1">
          <FormControl variant="outlined" size="small" className="m-1 col">
            <InputLabel id="civilite-label">Civilité</InputLabel>
            <Select
              required
              labelId="civilite-label"
              id="civilite"
              label="Civilité"
              value={inputs.civilite}
              onChange={setcivilite}
              error={inputs.civilite.trim().length === 0}
              style={{ fontSize: "13px" }}
            >
              <MenuItem style={{ fontSize: "13px" }} value={"m"}>
                M.
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"mme"}>
                Mme
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"mlle"}>
                Mlle
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"enf"}>
                Enfant
              </MenuItem>
            </Select>
          </FormControl>
          <Input
            required
            className="m-1 col-4"
            variant="outlined"
            size="small"
            label="Nom"
            onChange={setnom}
            value={inputs.nom}
            error={inputs.nom.trim().length === 0}
          />

          <Input
            required
            className="m-1 col-4"
            variant="outlined"
            size="small"
            label="Prenoms"
            value={inputs.prenoms}
            onChange={setprenoms}
            error={inputs.prenoms.trim().length === 0}
          />
        </div>
        <div className="row py-1">
          <FormControl variant="outlined" size="small" className="m-1 col">
            <InputLabel id="sexe-label">Sexe</InputLabel>
            <Select
              required
              labelId="sexe-label"
              id="sexe"
              label="Sexe"
              value={inputs.sexe}
              onChange={setsexe}
              error={inputs.sexe.trim().length === 0}
              style={{ fontSize: "13px" }}
            >
              <MenuItem style={{ fontSize: "13px" }} value={"M"}>
                M
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"F"}>
                F
              </MenuItem>
            </Select>
          </FormControl>
          <Input
            className="m-1 col-4"
            variant="outlined"
            size="small"
            label="Lieu de naissance"
            value={inputs.lieunaissance}
            onChange={setlieunaissance}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              value={inputs.datenaissance}
              onChange={setdatenaissance}
              className="m-1 col-4"
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="row py-1">
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Nationalité"
            value={inputs.nationalite}
            onChange={setnationalite}
          />
          <Input
            required
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Domicile"
            value={inputs.habitation}
            onChange={sethabitation}
            error={inputs.habitation.trim().length === 0}
          />
          <Input
            className="m-1 col-3"
            variant="outlined"
            size="small"
            label="Contact"
            value={inputs.contact}
            onChange={setcontact}
          />
        </div>
        <div className="row py-1">
          <FormControl variant="outlined" size="small" className="m-1 col">
            <InputLabel id="situation-label">Situation</InputLabel>
            <Select
              labelId="situation-label"
              id="situation"
              label="Situation"
              value={inputs.situation}
              onChange={setsituation}
              style={{ fontSize: "13px" }}
            >
              <MenuItem style={{ fontSize: "13px" }} value={"Marié"}>
                Marié(e)
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Célibataire"}>
                Célibataire
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Divorcé"}>
                Divorcé(e)
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Concubinage"}>
                Concubinage
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Veuf"}>
                Veuf(ve)
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" className="m-1 col">
            <InputLabel id="religion-label">Réligion</InputLabel>
            <Select
              labelId="religion-label"
              id="religion"
              label="Réligion"
              value={inputs.religion}
              onChange={setreligion}
              style={{ fontSize: "13px" }}
            >
              <MenuItem style={{ fontSize: "13px" }} value={"Chrétient"}>
                Chrétient(ne)
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Musulman"}>
                Musulman(e)
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Boudiste"}>
                Boudiste
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Animiste"}>
                Animiste
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Autre"}>
                Autre réligion
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Sans"}>
                Sans réligion
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" className="m-1 col">
            <InputLabel id="profession-label">Proffession</InputLabel>
            <Select
              labelId="profession-label"
              id="profession"
              value={inputs.profession}
              label="Profession"
              onChange={setprofession}
              style={{ fontSize: "13px" }}
            >
              <MenuItem style={{ fontSize: "13px" }} value={"Activité"}>
                En activité
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Chomage"}>
                Chomage
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"Retraité"}>
                Retraité(e)
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </fieldset>

      <fieldset className="border col-5 py-2 px-4 mx-2 grey-text text-darken-1">
        <legend className="grey lighten-4 px-3">
          <small>Contacts patient</small>
        </legend>
        <div className="row py-1">
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Nom du père"
            value={inputs.nompere}
            onChange={setnompere}
          />
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Prenoms du père"
            value={inputs.prenomspere}
            onChange={setprenomspere}
          />
          <Input
            className="m-1 col-4"
            variant="outlined"
            size="small"
            label="Contact du père"
            value={inputs.contactpere}
            onChange={setcontactpere}
          />
        </div>
        <div className="row py-1">
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Nom de la mère"
            value={inputs.nommere}
            onChange={setnommere}
          />
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Prenoms de la mère"
            value={inputs.prenomsmere}
            onChange={setprenomsmere}
          />
          <Input
            className="m-1 col-4"
            variant="outlined"
            size="small"
            label="Contact de la mère"
            value={inputs.contactmere}
            onChange={setcontactmere}
          />
        </div>
        <div className="row py-1">
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Nom du tuteur"
            value={inputs.nomtuteur}
            onChange={setnomtuteur}
          />
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Prenoms du tuteur"
            value={inputs.prenomstuteur}
            onChange={setprenomstuteur}
          />
          <Input
            className="m-1 col-4"
            variant="outlined"
            size="small"
            label="Contact du tuteur"
            value={inputs.contacttuteur}
            onChange={setcontacttuteur}
          />
        </div>
        <small>Personne à contacter en cas de besoins</small>
        <div className="row py-1">
          <Input
            className="m-1 col-2"
            variant="outlined"
            size="small"
            label="Qualité"
            value={inputs.qualitepersonnesure}
            onChange={setqualitepersonnesure}
          />
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Nom"
            value={inputs.nompersonnesure}
            onChange={setnompersonnesure}
          />
          <Input
            className="m-1 col"
            variant="outlined"
            size="small"
            label="Prenoms"
            value={inputs.prenomspersonnesure}
            onChange={setprenomspersonnesure}
          />
          <Input
            required
            className="m-1 col-3"
            variant="outlined"
            size="small"
            label="Contact"
            value={inputs.contactpersonnesure}
            onChange={setcontactpersonnesure}
            error={inputs.contactpersonnesure.trim().length === 0}
          />
        </div>
      </fieldset>

      <fieldset className="border col py-2 px-4 mx-2 grey-text text-darken-1">
        <legend className="grey lighten-4 px-3">
          <small>Assurance patient</small>
        </legend>
        <div className="row py-1">
          <FormControl variant="outlined" size="small" className="m-1 col-12">
            <InputLabel id="assure-label">Assuré ?</InputLabel>
            <Select
              labelId="assure-label"
              id="assure"
              label="Assuré ?"
              value={inputs.assure}
              onChange={setassure}
              style={{ fontSize: "13px" }}
            >
              <MenuItem style={{ fontSize: "13px" }} value={"oui"}>
                Oui
              </MenuItem>
              <MenuItem style={{ fontSize: "13px" }} value={"non"}>
                Non
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row py-1">
          {inputs.assure === "oui" && (
            <FormControl variant="outlined" size="small" className="m-1 col-12">
              <InputLabel id="assurance-label">Assurance</InputLabel>
              <Select
                labelId="assurance-label"
                id="assurance"
                label="Assurance"
                value={inputs.assurance}
                onChange={setassurance}
                style={{ fontSize: "13px" }}
              >
                <MenuItem style={{ fontSize: "13px" }} value={"sgbci"}>
                  SGBCI
                </MenuItem>
                <MenuItem style={{ fontSize: "13px" }} value={"nsia"}>
                  NSIA
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
      </fieldset>
      <div className="col-12 mt-4">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            send();
          }}
          style={{
            textTransform: "none",
            backgroundColor: theme.primary,
            color: "white",
          }}
        >
          Enregistrer le patient
        </Button>
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
            elevation={2}
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
