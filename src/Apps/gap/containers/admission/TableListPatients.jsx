import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import moment from "moment";
import {
  thunkListPatient,
  thunkSearchPatient,
  thunkAddPatient,
  setModalAdd,
  thunkDetailsPatient,
} from "../../api/admission/patients";

import { TextField, Avatar, Chip, Dialog, Button, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import GlobalContext, { Info } from "../../../global/context";

import CancelIcon from "@material-ui/icons/CancelOutlined";
import AddIcon from '@material-ui/icons/Add'
import CropFreeIcon from '@material-ui/icons/CropFree';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

import QrReader from 'react-qr-scanner'

import InputMask from "react-input-mask";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import frLocale from "date-fns/locale/fr";

import qr from '../../../../static/images/qr2.png'

import { header } from "../../../global/apiQuery";
import { MenuItem, InputLabel, FormControl } from "@material-ui/core";
import Axios from "axios";

const Input = withStyles({
  root: {
    "& label.Mui-focused": { color: Info.theme.primary, },
    "& .MuiInput-underline:after": { borderBottomColor: Info.theme.primary, },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": { borderColor: Info.theme.primary, },
    },
  },
})(TextField);

const InputContact = (props) => (
  <InputMask
    mask="(225) 99 999 999"
    permanent={[0, 1, 2, 3, 4, 5]}
    value={props.value}
    onChange={props.onChange}
  >
    {(inputProps) => <Input type="tel" {...props} />}
  </InputMask>
);

const TableListPatient = ({ thunkListPatient, thunkAddPatient, thunkSearchPatient, listPatients, thunkDetailsPatient, modalAdd, setModalAdd, currentPatient, modalModif }) => {
  const global = useContext(GlobalContext);
  const columns = [
    "N°",
    "IPP",
    "Nom & prenoms",
    "Sexe",
    "Domicile",
    "Date de naissance",
    "Lieu de naissance",
    "Nationalité",
    "Contact",
  ]
  moment.locale("fr");
  const [value, setvalue] = useState("");
  const [scanQR, setscanQR] = useState(null)
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

  //patient
  function setnom({ target: { value } }) { setinput({ ...inputs, nom: value }); }
  function setprenoms({ target: { value } }) { setinput({ ...inputs, prenoms: value }); }
  function setcivilite({ target: { value } }) { setinput({ ...inputs, civilite: value }); }
  function setsexe({ target: { value } }) { setinput({ ...inputs, sexe: value }); }
  function setdatenaissance(value) { setinput({ ...inputs, datenaissance: value }); }
  function setlieunaissance({ target: { value } }) { setinput({ ...inputs, lieunaissance: value }); }
  function setnationalite({ target: { value } }) { setinput({ ...inputs, nationalite: value }); }
  function sethabitation({ target: { value } }) { setinput({ ...inputs, habitation: value }); }
  function setcontact({ target: { value } }) { setinput({ ...inputs, contact: value }); }
  function setprofession({ target: { value } }) { setinput({ ...inputs, profession: value }); }
  function setreligion({ target: { value } }) { setinput({ ...inputs, religion: value }); }
  function setsituation({ target: { value } }) { setinput({ ...inputs, situation: value }); }

  //pere
  function setnompere({ target: { value } }) { setinput({ ...inputs, nompere: value }); }
  function setprenomspere({ target: { value } }) { setinput({ ...inputs, prenomspere: value }); }
  function setcontactpere({ target: { value } }) { setinput({ ...inputs, contactpere: value }); }

  //mere
  function setnommere({ target: { value } }) { setinput({ ...inputs, nommere: value }); }
  function setprenomsmere({ target: { value } }) { setinput({ ...inputs, prenomsmere: value }); }
  function setcontactmere({ target: { value } }) { setinput({ ...inputs, contactmere: value }); }

  //tuteur
  function setnomtuteur({ target: { value } }) { setinput({ ...inputs, nomtuteur: value }); }
  function setprenomstuteur({ target: { value } }) { setinput({ ...inputs, prenomstuteur: value }); }
  function setcontacttuteur({ target: { value } }) { setinput({ ...inputs, contacttuteur: value }); }

  //personne sur
  function setnompersonnesure({ target: { value } }) { setinput({ ...inputs, nompersonnesure: value }); }
  function setprenomspersonnesure({ target: { value } }) { setinput({ ...inputs, prenomspersonnesure: value }); }
  function setcontactpersonnesure({ target: { value } }) { setinput({ ...inputs, contactpersonnesure: value }); }
  function setqualitepersonnesure({ target: { value } }) { setinput({ ...inputs, qualitepersonnesure: value }); }

  const handleClose = () => {
    setinput({
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
    }); setModalAdd(false);
  };
  
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

  useEffect(() => { thunkListPatient(); }, []);
  return (
    <div className="row">
      <div className="col-12">
        <div className="row mb-2">
          <Input
            className="col-2"
            variant="outlined"
            size="small"
            label="Rechercher un patient"
            value={value}
            onChange={({ target: { value } }) => {
              let v = value
                .replace("*", "")
                .replace("+", "")
                .replace("-", "")
                .replace("/", "")
                .replace("~", "")
                .replace("~", "")
                .replace(")", "")
                .replace("(", "")
                .replace("=", "")
              setvalue(v);
              thunkSearchPatient(v.trim());
            }}
          />
          <div className="col">
            <Chip
              label="patient(s)"
              avatar={<Avatar className="white-text" style={{ backgroundColor: global.theme.primary }} > {listPatients.length}</Avatar>}
            />
          </div>
          <div className="col d-flex justify-content-end p-0">
            <Button
              variant="contained"
              startIcon={<CropFreeIcon />}
              onClick={() => {
                scanQR ? setscanQR(false) : setscanQR(true)
              }}
              style={{
                textTransform: "none",
                fontSize: "11px",
              }}
              className={scanQR ? "bg-danger white-text" : ""}
            >
              Scanner le code QR
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => { setModalAdd(true) }}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                color: "white",
                fontSize: "11px",
              }}
              className="ml-2"
            >
              Ajouter un patient
            </Button>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          {listPatients.length === 0 ? (
            <div className="col-12 text-secondary text-center">
              <h3 className="text-center lead">Aucun patient</h3>
              <small> Pour en créer un, cliquer le boutton 'ajouter un patient' puis rerenseignez les informations </small>
            </div>
          ) : (
              <table className="table-sm table-hover col-12 table-striped">
                <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                  <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                </thead>
                <tbody>
                  {listPatients.map(({ iddossier, ipppatient, nompatient, prenomspatient, sexepatient, habitationpatient, datenaissancepatient, lieunaissancepatient, nationalitepatient, contactpatient, civilitepatient, }, i) => (
                    <tr
                      key={i}
                      style={{ cursor: "pointer" }}
                      onClick={() => thunkDetailsPatient(ipppatient)}
                      className={(currentPatient && currentPatient.ipppatient === ipppatient) ? "bgcolor-primary font-weight-bold white-text" : ""}
                    >
                      <td>{i + 1}</td>
                      <td><b>{ipppatient}</b></td>
                      <td><b>{civilitepatient} {nompatient} {prenomspatient}</b></td>
                      <td>{sexepatient}</td>
                      <td>{habitationpatient}</td>
                      <td>{datenaissancepatient}</td>
                      <td>{lieunaissancepatient}</td>
                      <td>{nationalitepatient}</td>
                      <td>{contactpatient}</td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            )}
        </div>
        {/* Popup pour la creéation d'un patient */}
        <Dialog
          disableBackdropClick
          open={modalAdd}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          transitionDuration={0}
          maxWidth="sm"
        >
          <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
            <b className="font-weight-bold">
              Ajouter un Patient
            </b>
          </DialogTitle>
          <DialogContent>
            <small className="font-weight-bold bg-light">Patient</small>
            <div className="row py-1">
              <FormControl variant="standard" size="small" className="m-1 col">
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
                  <MenuItem style={{ fontSize: "13px" }} value={"M"}>M.</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Mme"}>Mme</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Mlle"}>Mlle</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Enf"}>Enfant</MenuItem>
                </Select>
              </FormControl>
              <Input
                required
                className="m-1 col-4"
                variant="standard"
                size="small"
                label="Nom"
                onChange={setnom}
                value={inputs.nom}
                error={inputs.nom.trim().length === 0}
              />

              <Input
                required
                className="m-1 col-4"
                variant="standard"
                size="small"
                label="Prenoms"
                value={inputs.prenoms}
                onChange={setprenoms}
                error={inputs.prenoms.trim().length === 0}
              />
            </div>
            <div className="row py-1">
              <FormControl variant="standard" size="small" className="m-1 col">
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
                  <MenuItem style={{ fontSize: "13px" }} value={"M"}>M</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"F"}>F</MenuItem>
                </Select>
              </FormControl>
              <Input
                className="m-1 col-4"
                variant="standard"
                size="small"
                label="Lieu de naissance"
                value={inputs.lieunaissance}
                onChange={setlieunaissance}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                <KeyboardDatePicker
                  label="Date de naissance"
                  id="date-picker-dialog"
                  format="dd MMMM yyyy"
                  value={inputs.datenaissance}
                  onChange={setdatenaissance}
                  className="m-1 col-4"
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="row py-1">
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Nationalité"
                value={inputs.nationalite}
                onChange={setnationalite}
              />
              <Input
                required
                className="m-1 col"
                variant="standard"
                size="small"
                label="Domicile"
                value={inputs.habitation}
                onChange={sethabitation}
                error={inputs.habitation.trim().length === 0}
              />
              <InputContact
                className="m-1 col-4"
                variant="standard"
                size="small"
                label="Contact"
                value={inputs.contact}
                onChange={setcontact}
              />
            </div>
            <div className="row py-1">
              <FormControl variant="standard" size="small" className="m-1 col">
                <InputLabel id="situation-label">Situation</InputLabel>
                <Select
                  labelId="situation-label"
                  id="situation"
                  label="Situation"
                  value={inputs.situation}
                  onChange={setsituation}
                  style={{ fontSize: "13px" }}
                >
                  <MenuItem style={{ fontSize: "13px" }} value={"Marié"}>Marié(e)</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Célibataire"}>Célibataire</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Divorcé"}>Divorcé(e)</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Concubinage"}>Concubinage</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Veuf"}>Veuf(ve)</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" size="small" className="m-1 col">
                <InputLabel id="religion-label">Réligion</InputLabel>
                <Select
                  labelId="religion-label"
                  id="religion"
                  label="Réligion"
                  value={inputs.religion}
                  onChange={setreligion}
                  style={{ fontSize: "13px" }}
                >
                  <MenuItem style={{ fontSize: "13px" }} value={"Chrétient"}>Chrétient(ne)</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Musulman"}>Musulman(e)</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Boudiste"}>Boudiste</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Animiste"}>Animiste</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Autre"}>Autre réligion</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"Sans"}>Sans réligion</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" size="small" className="m-1 col">
                <InputLabel id="profession-label">Proffession</InputLabel>
                <Select
                  labelId="profession-label"
                  id="profession"
                  value={inputs.profession}
                  label="Profession"
                  onChange={setprofession}
                  style={{ fontSize: "13px" }}
                >
                  <MenuItem style={{ fontSize: "13px" }} value={"agriculteurs"}>Agriculteurs</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"artisans"}>Artisants</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"commerçant"}>Commerçants</MenuItem>
                  <MenuItem
                    style={{ fontSize: "13px" }}
                    value={"chef d'entreprise"}
                  >
                    Chef d'entreprise
              </MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"profession liberale"}>Professions liberales</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"etudiant"}>Étudiant(e)</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"retraité"}>Retraité(e)</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"salarié"}>Salarié(e)</MenuItem>
                  <MenuItem style={{ fontSize: "13px" }} value={"sans activité"}>Sans activité</MenuItem>
                </Select>
              </FormControl>
            </div>
            <small className="font-weight-bold bg-light">Père</small>
            <div className="row py-1">
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Nom"
                value={inputs.nompere}
                onChange={setnompere}
              />
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Prenoms"
                value={inputs.prenomspere}
                onChange={setprenomspere}
              />
              <InputContact
                className="m-1 col-4"
                variant="standard"
                size="small"
                label="Contact"
                value={inputs.contactpere}
                onChange={setcontactpere}
              />
            </div>
            <small className="font-weight-bold bg-light">Mère</small>
            <div className="row py-1">
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Nom"
                value={inputs.nommere}
                onChange={setnommere}
              />
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Prenoms"
                value={inputs.prenomsmere}
                onChange={setprenomsmere}
              />
              <InputContact
                className="m-1 col-4"
                variant="standard"
                size="small"
                label="Contact"
                value={inputs.contactmere}
                onChange={setcontactmere}
              />
            </div>
            <small className="font-weight-bold bg-light">Tuteur</small>
            <div className="row py-1">
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Nom"
                value={inputs.nomtuteur}
                onChange={setnomtuteur}
              />
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Prenoms"
                value={inputs.prenomstuteur}
                onChange={setprenomstuteur}
              />
              <InputContact
                className="m-1 col-4"
                variant="standard"
                size="small"
                label="Contact"
                value={inputs.contacttuteur}
                onChange={setcontacttuteur}
              />
            </div>
            <small className="font-weight-bold bg-light">Personne à contacter en cas de besoins</small>
            <div className="row py-1">
              <Input
                className="m-1 col-2"
                variant="standard"
                size="small"
                label="Qualité"
                value={inputs.qualitepersonnesure}
                onChange={setqualitepersonnesure}
              />
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Nom"
                value={inputs.nompersonnesure}
                onChange={setnompersonnesure}
              />
              <Input
                className="m-1 col"
                variant="standard"
                size="small"
                label="Prenoms"
                value={inputs.prenomspersonnesure}
                onChange={setprenomspersonnesure}
              />
              <InputContact
                required
                className="m-1 col-3"
                variant="standard"
                size="small"
                label="Contact"
                value={inputs.contactpersonnesure}
                onChange={setcontactpersonnesure}
                error={inputs.contactpersonnesure.trim().length === 0}
              />
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center text-center mt-2">
              <ReportProblemOutlinedIcon className="bg-warning mr-2" />
              <small className="font-weight-bold">Veuillez Renseigner tous les champs Obligatoires avant la creation du patient</small>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="mb-2"
              startIcon={<CancelIcon />}
              onClick={handleClose}
              style={{
                textTransform: "none",
                fontSize: "11px",
              }}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              className="mb-2"
              onClick={() => {
                thunkAddPatient(inputs)
                handleClose()
              }}
              disabled={!verifyField()}
              startIcon={<AddIcon />}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                fontSize: "11px",
                color: "white",
              }}
            >
              Creer le patient
            </Button>
          </DialogActions>
        </Dialog>
       { //Scanner un qr code pour avoir le dossier du patient
          scanQR && !modalModif && !modalAdd && <div style={{ position: "fixed", zIndex: "10001", right: "0.5cm", bottom: "0.5cm" }}
            className="bg-light col-2 d-flex p-0 flex-column border justify-content-center text-center align-items-center">
            <img src={qr} height={125} width={125} alt="" className="animated infinite flash" />
            <small style={{ fontSize: "10px" }} className="text-secondary">Scanner votre le Qr code pour identifier le patient</small>
            <QrReader
              delay={500}
              style={{ width: "100%" }}
              onError={(err) => { alert(err) }}
              onScan={(result) => {
                if (result != null) {
                  Axios({ url: `${header.url}/gap/details/patient/${result}` })
                    .then(({ data: { rows } }) => {
                      if (rows.length === 0) alert("Ce patient n'existe pas ici")
                      else thunkDetailsPatient(result)
                    })
                }
              }}
            />
          </div>
        }
      </div>
    </div>
  );
};


const mapStateToProp = (state) => {
  const { PatientReducer: { listPatients, modalAdd, currentPatient }, } = state;
  return { listPatients, modalAdd, currentPatient };
};
const TableListPatientConnected = connect(mapStateToProp, { thunkListPatient, thunkAddPatient,thunkDetailsPatient, thunkSearchPatient, setModalAdd })(TableListPatient);
export default TableListPatientConnected;
