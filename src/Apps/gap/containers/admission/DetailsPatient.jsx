import React, { useState, useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import frLocale from "date-fns/locale/fr";
import InputMask from "react-input-mask";
import { connect } from "react-redux";
import {
  setModalModif, thunkDeletePatient, thunkModifPatient
} from "../../api/admission/patients";
import GlobalContext, { Info } from "../../../global/context";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import DateFnsUtils from "@date-io/date-fns";

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
const DetailsPatient = ({ currentPatient, thunkModifPatient, thunkDeletePatient, setModalModif, modalModif }) => {
  const global = useContext(GlobalContext);
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

  const CloseModif = () => {
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
    }); setModalModif(false);
  };

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
      <div className="col d-flex justify-content-end align-items-end">
        <IconButton className="mx-2 bg-light" size="small" aria-label="delete" onClick={() => { }}>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton className="mx-2 bg-light" size="small" aria-label="delete" onClick={() => { setModalModif(true) }}>
          <CheckCircleOutlineIcon />
        </IconButton>
      </div>
      <Dialog
        disableBackdropClick
        open={modalModif}
        transitionDuration={0}
        onClose={CloseModif}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
        onEntered={() =>
          setinput({
            nom: currentPatient.nompatient,
            prenoms: currentPatient.prenomspatient,
            civilite: currentPatient.civilitepatient,
            sexe: currentPatient.sexepatient,
            datenaissance: new Date((currentPatient.datenaissancepatient).split('-').reverse().join('-')),
            lieunaissance: currentPatient.lieunaissancepatient,
            nationalite: currentPatient.nationalitepatient,
            habitation: currentPatient.habitationpatient,
            contact: currentPatient.contactpatient,
            situation: currentPatient.situationmatrimonialepatient,
            religion: currentPatient.religionpatient,
            profession: currentPatient.professionpatient,
            nompere: currentPatient.nomperepatient,
            prenomspere: currentPatient.prenomsperepatient,
            contactpere: currentPatient.contactperepatient,
            nommere: currentPatient.nommerepatient,
            prenomsmere: currentPatient.prenomsmerepatient,
            contactmere: currentPatient.contactmerepatient,
            nomtuteur: currentPatient.nomtuteurpatient,
            prenomstuteur: currentPatient.prenomstuteurpatient,
            contacttuteur: currentPatient.contacttuteurpatient,
            nompersonnesure: currentPatient.nompersonnesurepatient,
            prenomspersonnesure: currentPatient.prenomspersonnesurepatient,
            contactpersonnesure: currentPatient.contactpersonnesurepatient,
            qualitepersonnesure: currentPatient.qualitepersonnesurepatient,
          })
        }
      >
        <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
          <b className="font-weight-bold">
            Informations du patient
            </b>
        </DialogTitle>
        <DialogContent>
          <small className="font-weight-bold bg-light">Patient ({currentPatient.ipppatient})</small>
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
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
              <KeyboardDatePicker
                label="Date de naissance"
                id="date-picker-dialog"
                format="dd MMMM yyyy"
                autoOk
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
          <div className="col-12 d-flex justify-content-center text-center mt-2">
            <ReportProblemOutlinedIcon className="bg-warning mr-2" />
            <small className="font-weight-bold">
              1) Veuillez Renseigner tous les champs Obligatoires avant la creation du patient <br />
                2) La suppression est sans confirmation et irreversible
              </small>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="mb-2"
            startIcon={<CancelIcon />}
            onClick={CloseModif}
            style={{ textTransform: "none", fontSize: "11px", }}
          >
            Annuler
            </Button>
          <Button
            variant="contained"
            className="mb-2 bg-danger text-white"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => {
              thunkDeletePatient(currentPatient.ipppatient)
              CloseModif()
            }}
            style={{
              textTransform: "none",
              fontSize: "11px",
            }}
          >
            Supprimer
          </Button>
          <Button
            variant="contained"
            className="mb-2"
            onClick={() => {
              thunkModifPatient(inputs, currentPatient.ipppatient)
              CloseModif()
            }}
            startIcon={<CheckCircleOutlineIcon />}
            style={{
              textTransform: "none",
              backgroundColor: global.theme.primary,
              color: "white",
              fontSize: "11px",
            }}
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { PatientReducer: { currentPatient, modalModif } } = state;
  return { currentPatient, modalModif };
};

const DetailsPatientConnected = connect(mapStateToProps, { thunkModifPatient, thunkDeletePatient, setModalModif, })(DetailsPatient);
export default DetailsPatientConnected;
