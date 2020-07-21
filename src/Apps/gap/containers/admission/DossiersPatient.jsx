import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from "@material-ui/icons/Add";
import BallotIcon from "@material-ui/icons/Ballot";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { header } from "../../../global/apiQuery";


import { thunkListSejour, thunkAddSejour, thunkDetailsSejour, thunkCurrentFacture } from "../../api/admission/sejour";
import { connect } from "react-redux";
import Axios from "axios";
import QR from "qrcode.react";
import Facture from "../../documents/Facture";
import { TextField, FormControl, InputLabel, MenuItem, Select, Button, Chip, Avatar, IconButton } from "@material-ui/core";
import GlobalContext, { Info } from "../../../global/context";
import { withStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";

const Input = withStyles({
  root: {
    "& label.Mui-focused": {
      color: Info.theme.primary,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: Info.theme.primary,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: Info.theme.primary,
      },
    },
  },
})(TextField);
const DossiersPatient = ({
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
  thunkCurrentFacture,
  currentPatient,
  listSejour,
  currentSejour,
}) => {
  moment.locales("fr");
  const global = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [assure, setassure] = useState(false);
  const [openControle, setOpenControle] = useState(false);
  const [listActesDef, setListActesDef] = useState([])
  const [listActes, setListActe] = useState([]);
  const [actes, setActes] = useState([]);
  const [listAssurances, setListAssurances] = useState([]);
  const [inputs, setinput] = useState({
    debutDate: new Date(),
    finDate: new Date(),
    DebutHeure: new Date(),
    finHeure: new Date(),
    type: "",
    medecin: "",
    gestionnaire: "",
    organisme: "",
    beneficiaire: "",
    assurePrinc: "",
    matriculeAssure: "",
    numeroPEC: "",
    taux: ""
  });

  const columns = [
    "N° Sejour",
    "Date et heure de début",
    "Date et heure de fin",
    "Type de séjour",
    "Statut du séjour",
  ]
  const columnsDetails = [
    "Code",
    "Prix U",
    "Plafond Assu",
    "Qte",
    "Prix T",
    "Part Assu",
    "Part Patient",
    "3ème Tiers"
  ]

  const handleClickOpen = () => { setDisabled(false); setOpen(true); }
  const handleClose = () => {
    setinput({
      debutDate: new Date(),
      finDate: new Date(),
      DebutHeure: new Date(),
      finHeure: new Date(),
      type: "",
      medecin: "",
      gestionnaire: "",
      organisme: "",
      beneficiaire: "",
      assurePrinc: "",
      matriculeAssure: "",
      numeroPEC: "",
      taux: 0
    });
    setListActesDef([])
    setOpen(false);
  };
  const closeControle = () => { setOpenControle(false); };
  function setdebutDate(value) { setinput({ ...inputs, debutDate: value }); }
  function setfinDate(value) { setinput({ ...inputs, finDate: value }); }
  function setDebutHeure(value) { setinput({ ...inputs, DebutHeure: value }); }
  function setfinHeure(value) { setinput({ ...inputs, finHeure: value }); }
  function settype({ target: { value } }) { setinput({ ...inputs, type: value }); }
  function setmedecin({ target: { value } }) { setinput({ ...inputs, medecin: value }); }
  function setgestionnaire(value) { setinput({ ...inputs, gestionnaire: value }); }
  function setorganisme(value) { setinput({ ...inputs, organisme: value }); }
  function setbeneficiaire({ target: { value } }) { setinput({ ...inputs, beneficiaire: value }); }
  function setassurePrinc({ target: { value } }) { setinput({ ...inputs, assurePrinc: value }); }
  function setmatriculeAssure({ target: { value } }) { setinput({ ...inputs, matriculeAssure: value }); }
  function setnumeroPEC({ target: { value } }) { setinput({ ...inputs, numeroPEC: value }); }
  function settaux({ target: { value } }) { setinput({ ...inputs, taux: value }); }
  function sendDTata() {
    thunkAddSejour({ ...inputs, actes: actes }, currentPatient.iddossier);
    setinput({
      debutDate: new Date(),
      finDate: new Date(),
      DebutHeure: new Date(),
      finHeure: new Date(),
      type: "",
      medecin: "",
      gestionnaire: "",
      organisme: "",
      beneficiaire: "",
      assurePrinc: "",
      matriculeAssure: "",
      numeroPEC: "",
      taux: 0
    })
    setOpen(false);
  }
  useEffect(() => {
    Axios({ url: `${header.url}/gap/list/actes` }).then(({ data: { rows } }) => {
      const actes = [];
      rows.forEach(({ codeacte, libelleacte }) => { actes.push({ value: codeacte, label: libelleacte }); });
      setListActe(actes);
    });
    Axios({ url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => {
      const assurances = [];
      rows.forEach(({ idassurance, nomassurance }) => { assurances.push({ value: idassurance, label: nomassurance }); });
      setListAssurances(assurances);
    });
    showActesSejour()
  }, []);

  function showActesSejour(actesList) {
    Axios({
      url: `${header.url}/gap/list/actesSejour`,
      method: 'post',
      headers: { "content-type": "application/x-www-form-urlencoded", },
      data: { actesList: actesList }
    }).then(({ data: { rows } }) => {
      const actesDef = rows.map(({ codeacte, prixacte, idacte }, i) => (
        {
          idActe: idacte,
          codeActe: codeacte,
          prixU: prixacte,
          plafondAssu: prixacte,
          qte: 1,
          prixT: prixacte,
          partAssu: "",
          partPatient: "",
          partTiers: 0
        }))
      setListActesDef(actesDef)
    });
  }

  useEffect(() => {
    thunkListSejour(currentPatient.iddossier);
    thunkCurrentFacture(currentPatient.iddossier)
  },
    [currentPatient.iddossier]);

  return (
    <div className="DossiersPatient row px-3">
      {currentSejour !== null && (
        <div className="col-12 white text-secondary mb-2">
          <div className="row">
            <div className="col-10 p-0">
              <div className="row" style={{ fontSize: "14.5px" }}>
                <div className="col-3">
                  <h6>Sejour</h6>
                  <small><b>N° du sejour :</b> {currentSejour.numerosejour}</small><br />
                  <small><b>Date de debut :</b> {currentSejour.datedebutsejour}{" "}{currentSejour.heuredebutsejour}</small><br />
                  <small><b>Date de fin :</b> {currentSejour.datefinsejour}{" "}{currentSejour.heurefinsejour}</small><br />
                  <small><b>Type du séjour :</b> {currentSejour.typesejour}</small>
                </div>
                <div className="col">
                  <h6>Facture ({currentSejour.numerofacture})</h6>
                  <small><b>Date de création :</b> {currentSejour.datefacture}{" "}{currentSejour.heurefacture}</small><br />
                  <small><b>Montant Total :</b> {currentSejour.montanttotalfacture}{" "}FCFA</small><br />
                  <small><b>Part Assu :</b> {currentSejour.partassurancefacture}{" "}FCFA, <b>Reste</b> : {currentSejour.resteassurancefacture} FCFA</small><br />
                  <small><b>Part Patiient :</b> {currentSejour.partpatientfacture}{" "}FCFA, <b>Reste</b> : {currentSejour.restepatientfacture} FCFA</small><br />
                </div>
                {
                  currentSejour.gestionnaire.trim() !== "" && <div className="col">
                    <h6>Assurance ({currentSejour.gestionnaire})</h6>
                    <small><b>Béneficiaire :</b> {currentSejour.beneficiaire}</small><br />
                    <small><b>Assuré Principal :</b> {currentSejour.assureprinc}</small><br />
                    <small><b>N° Mat.:</b> {currentSejour.matriculeassure}</small>, <small><b>N° PEC :</b> {currentSejour.numeropec}</small><br />
                    <small><b>Taux :</b> {currentSejour.taux}%</small><br />
                  </div>
                }

                <div className="col-auto d-flex align-items-end">
                  {2 - currentSejour.nbcontrole > 0 && (
                    <Button
                      variant="contained"
                      className="mx-1"
                      startIcon={<BallotIcon />}
                      onClick={() => setOpenControle(true)}
                      style={{
                        textTransform: "none",
                        fontSize: "11px",
                      }}
                    >
                      Contrôle (reste {2 - currentSejour.nbcontrole})
                    </Button>
                  )}
                  <Facture
                    sejour={currentSejour}
                    code={`${header.url}/gap/verify/facture/${currentSejour.idfacture}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="bg-light" />
        </div>
      )}
      <div className="col-12">
        <div className="row mb-1">
          <TextField
            className="col-2 mr-1"
            variant="outlined"
            size="small"
            label="Rechercher un sejour"
          />
          <Chip
            className="mx-1"
            label="sejours(s)"
            avatar={
              <Avatar
                className="white-text"
                style={{ backgroundColor: global.theme.primary }}
              >
                {listSejour.length}
              </Avatar>
            }
          />
          <div className="col d-flex justify-content-end p-0">
            <Button
              variant="contained"
              className="mx-1"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                color: "white",
                fontSize: "11px",
              }}
            >
              Nouveau séjour
            </Button>
          </div>
        </div>
      </div>
      <table className="col-12 table-sm table-hover table-striped">
        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
          <tr>{columns.map((col, i) => (<th className="white-text" key={i} >{col}</th>))}</tr>
        </thead>
        <tbody>
          {listSejour.map(({ datedebutsejour, datefinsejour, heuredebutsejour, heurefinsejour, typesejour, statussejour, idsejour, numerosejour, }, i) => (
            <tr
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => thunkDetailsSejour(numerosejour)}
              className={currentSejour && currentSejour.idsejour === idsejour && "bgcolor-primary font-weight-bold white-text"}
            >
              <td>{numerosejour}</td>
              <td>{datedebutsejour} {heuredebutsejour}</td>
              <td>{datefinsejour} {heurefinsejour}</td>
              <td>{typesejour}</td>
              <td>{statussejour}</td>
            </tr>
          )
          )}
        </tbody>
      </table>
      <div className="col-12 mt-4">
        <Dialog
          disableBackdropClick
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          style={{ maxHeight: "100vh" }}
          maxWidth="sm"
        >
          <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
            <b>Ajouter un nouveau sejour</b>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12">
                <small className="font-weight-bold">Debut du sejour</small>
                <div className="row mx-1 my-2">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={frLocale}
                  >
                    <KeyboardDatePicker
                      label="Date de début"
                      id="datedebut"
                      format="dd MMMM yyyy"
                      autoOk
                      value={inputs.debutDate}
                      onChange={setdebutDate}
                      className="m-1 col"
                    />
                    <KeyboardTimePicker
                      id="heuredebut"
                      label="Heure de début"
                      ampm={false}
                      autoOk
                      value={inputs.DebutHeure}
                      onChange={setDebutHeure}
                      className="m-1 col"
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <small className="font-weight-bold">Fin du sejour</small>
                <div className="row mx-1 my-2">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={frLocale}
                  >
                    <KeyboardDatePicker
                      id="datefin"
                      label="Date de fin"
                      format="dd MMMM yyyy"
                      autoOk
                      value={inputs.finDate}
                      onChange={setfinDate}
                      className="m-1 col"
                    />
                    <KeyboardTimePicker
                      label="Heure de fin"
                      autoOk
                      ampm={false}
                      id="heurefin"
                      value={inputs.finHeure}
                      onChange={setfinHeure}
                      className="m-1 col"
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="row mx-1 my-3">
                  <FormControl variant="outlined" size="small" className="col">
                    <InputLabel id="typesejour-label">Type de sejour</InputLabel>
                    <Select
                      labelId="typesejour-label"
                      id="typesejour"
                      value={inputs.type}
                      onChange={settype}
                      label="Type de sejour"
                      style={{ fontSize: "12px" }}
                    >
                      <MenuItem style={{ fontSize: "12px" }} value={"Consultation"}>Consultation</MenuItem>
                      <MenuItem style={{ fontSize: "12px" }} value={"Urgence"}>Urgence</MenuItem>
                      <MenuItem style={{ fontSize: "12px" }} value={"Biologie"}>Biologie</MenuItem>
                      <MenuItem style={{ fontSize: "12px" }} value={"Imagerie"}>Imagerie</MenuItem>
                      <MenuItem style={{ fontSize: "12px" }} value={"hospitalisation"}>Hospitalisation</MenuItem>
                      <MenuItem style={{ fontSize: "12px" }} value={"Soins"}>Soins</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="col-7 ml-2"
                  >
                    <InputLabel id="typesejour-label">Médecin</InputLabel>
                    <Select
                      required
                      labelId="typesejour-label"
                      id="typesejour"
                      value={inputs.medecin}
                      onChange={setmedecin}
                      label="Type de sejour"
                      style={{ fontSize: "12px" }}
                    >
                      <MenuItem style={{ fontSize: "12px" }} value={1}>KOFFI Edy</MenuItem>
                      <MenuItem style={{ fontSize: "12px" }} value={2}>N'DONGO Abdoulaye</MenuItem>
                      <MenuItem style={{ fontSize: "12px" }} value={3}>GBADJE Wilfried</MenuItem>
                      <MenuItem style={{ fontSize: "12px" }} value={4}>ZAKI Audrey</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="row my-3 mx-1">
                  <Autocomplete
                    multiple
                    size="small"
                    className="col-12 p-0"
                    id="actesList"
                    options={listActes}
                    onChange={(event, newValue) => {
                      newValue && setActes(newValue.map((elt) => elt.value));
                      newValue && showActesSejour(newValue.map((elt) => elt.value))
                    }}
                    getOptionLabel={(option) => `(${option.value}) ${option.label}`}
                    filterSelectedOptions
                    renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Actes"
                        placeholder="Ajouter ..."
                      />
                    )}
                  />
                </div>
                <div style={{ display: "inline" }} onClick={() => {
                  if (assure) {
                    setassure(false)
                  } else {
                    setassure(true)
                  }
                }}>
                  <Chip
                    className={`mr-2 ${assure ? "bgcolor-secondaryDark text-white font-weight-bold" : ""}`}
                    style={{ cursor: "pointer" }}
                    label="Patient assuré"
                  />
                </div>
                {assure &&
                  <>
                    <div className="row mx-1 my-3">
                      <Autocomplete
                        size="small"
                        className="col p-0"
                        id="assurancesList"
                        options={listAssurances}
                        onChange={(event, newValue) => { newValue ? setgestionnaire(newValue.label) : setgestionnaire("") }}
                        getOptionLabel={(option) => option.label}
                        filterSelectedOptions
                        renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Gestionnaire"
                            placeholder="Ajouter ..."
                          />
                        )}
                      />
                      <Autocomplete
                        size="small"
                        className="col p-0 ml-2"
                        id="assurancesList"
                        options={listAssurances}
                        disabled={inputs.gestionnaire.trim() === ""}
                        onChange={(event, newValue) => { newValue ? setorganisme(newValue.label) : setorganisme("") }}
                        getOptionLabel={(option) => option.label}
                        filterSelectedOptions
                        renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Organisme"
                            placeholder="Ajouter ..."
                          />
                        )}
                      />
                    </div>
                    <div className="row mx-1 my-3">
                      <FormControl
                        variant="outlined"
                        size="small"
                        className="col"
                      >
                        <InputLabel id="assurance-label">Bénéficiaire</InputLabel>
                        <Select
                          disabled={inputs.organisme.trim() === ""}
                          labelId="assurance-label"
                          id="assurance"
                          label="Bénéficiaire"
                          onChange={setbeneficiaire}
                          style={{ fontSize: "12px" }}
                        >
                          <MenuItem style={{ fontSize: "12px" }} value={"assuré"}>L'assuré</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={"enfant"}>L'enfant</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={"conjoint(e)"}>Le/La conjoint(e)</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={"ayant droit"}>L'ayant droit</MenuItem>
                        </Select>
                      </FormControl>
                      <Input
                        disabled={inputs.beneficiaire.trim() === ""}
                        className="col-7 ml-2"
                        variant="outlined"
                        size="small"
                        defaultValue=" "
                        label="Identité de l'Assuré"
                        value={inputs.beneficiaire === 'assuré' ? currentSejour.nompatient + " " + currentSejour.prenomspatient : inputs.assurePrinc}
                        onChange={setassurePrinc}
                      />
                    </div>
                    <div className="row mx-1 my-2">
                      <Input
                        className="col-4"
                        variant="outlined"
                        size="small"
                        label="Matricule"
                        onChange={setmatriculeAssure}
                        disabled={inputs.assurePrinc.trim() === ""}
                      />
                      <Input
                        className="col-4 mx-2"
                        variant="outlined"
                        size="small"
                        label="N° PEC"
                        onChange={setnumeroPEC}
                        disabled={inputs.gestionnaire.trim() === ""}
                      />
                      <FormControl
                        variant="outlined"
                        size="small"
                        className="col"
                      >
                        <InputLabel id="assurance-label">Taux</InputLabel>
                        <Select
                          labelId="assurance-label"
                          id="assurance"
                          label="Taux"
                          disabled={inputs.gestionnaire.trim() === ""}
                          onChange={settaux}
                          style={{ fontSize: "11px" }}
                        >
                          <MenuItem style={{ fontSize: "12px" }} value={0}>0%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={10}>10%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={20}>20%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={30}>30%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={40}>40%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={50}>50%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={60}>60%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={70}>70%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={75}>75%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={80}>80%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={85}>85%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={90}>90%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={95}>95%</MenuItem>
                          <MenuItem style={{ fontSize: "12px" }} value={100}>100%</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </>
                }
              </div>
              <table className="col-12 table-sm mx-1 my-2">
                <thead className="p-2" style={{ backgroundColor: global.theme.primary }}>
                  <tr className="p-2">{columnsDetails.map((col, i) => (<th className="white-text" key={i} >{col}</th>))}</tr>
                </thead>
                <tbody>
                  {
                    listActesDef.map(({
                      idActe,
                      codeActe,
                      prixU,
                      plafondAssu,
                      qte,
                      prixT,
                      tauxAssu,
                      partAssu,
                      partPatient,
                      partTiers }, i) => (
                        <tr key={codeActe} id={codeActe}>
                          <td> <Input size="small" disabled value={listActesDef[i].codeActe} /></td>
                          <td> <Input size="small" disabled value={listActesDef[i].prixU} /></td>
                          <td> <Input size="small" defaultValue={listActesDef[i].plafondAssu} onChange={(ev) => { }} /></td>
                          <td> <Input size="small" defaultValue={listActesDef[i].qte} onChange={(ev) => {
                            listActesDef[i].qte = ev.target.value
                            listActesDef[i].prixT = ev.target.value * listActesDef[i].prixU
                            setListActesDef(listActesDef)
                          }} /></td>
                          <td><Input size="small" value={listActesDef[i].prixT} /></td>
                          <td> <Input size="small" disabled defaultValue="15000" /></td>
                          <td> <Input className="text-center" size="small" disabled defaultValue="15000" /></td>
                          <td> <Input size="small" /></td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="mb-2 bg-light"
              startIcon={<CancelIcon />}
              onClick={handleClose}
              style={{ textTransform: "none", fontSize: "11px", }}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              className="mb-2"
              onClick={() => { setDisabled(true); sendDTata(); }}
              disabled={disabled}
              startIcon={<ChromeReaderModeIcon />}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                fontSize: "11px",
                color: "white",
              }}
            >
              Generer la facture
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openControle}
          onClose={closeControle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogTitle className="text-center" id="alert-dialog-title">
            <small className="font-weight-bold">
              Ajouter un nouveau Controle
            </small>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12">
                <div className="row mx-1 my-2">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={frLocale}
                  >
                    <KeyboardDatePicker
                      id="datedebut"
                      format="dd/MM/yyyy"
                      value={inputs.debutDate}
                      onChange={setdebutDate}
                      className="m-1 col"
                    />
                    <KeyboardTimePicker
                      id="heuredebut"
                      ampm={false}
                      value={inputs.DebutHeure}
                      onChange={setDebutHeure}
                      className="m-1 col"
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="row mx-1 my-2">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={frLocale}
                  >
                    <KeyboardDatePicker
                      id="datefin"
                      format="dd/MM/yyyy"
                      value={inputs.finDate}
                      onChange={setfinDate}
                      className="m-1 col"
                    />
                    <KeyboardTimePicker
                      id="heurefin"
                      value={inputs.finHeure}
                      ampm={false}
                      onChange={setfinHeure}
                      className="m-1 col"
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="mb-2 bg-light"
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
              onClick={sendDTata}
              startIcon={<CheckCircleOutlineIcon />}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                color: "white",
                fontSize: "11px",
              }}
            >
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div >
  );
};
const mapStatetoProps = (state) => {
  const {
    PatientReducer: { currentPatient },
  } = state;
  const {
    sejourReducer: { listSejour, currentSejour },
  } = state;
  return { currentPatient, listSejour, currentSejour };
};
const DossiersPatientConnected = connect(mapStatetoProps, {
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
  thunkCurrentFacture,
})(DossiersPatient);

export default DossiersPatientConnected;
