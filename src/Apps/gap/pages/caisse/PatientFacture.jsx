import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import { TextField, Chip, Avatar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Button, DialogActions } from "@material-ui/core";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';

import Axios from "axios";
import { header } from "../../../global/apiQuery";

import QrReader from 'react-qr-scanner'

import {
  thunkListFacturesPayeesPatient,
  thunkListFacturesImpayeesPatient,
  thunkListFacturesPatient,
  thunkEncaisserFactures,
  thunkDetailsFacture,
  thunkEncaisserAllFactures,
  setShowModal,
  setCurrentPatient
} from "../../api/caisse/factures";


const FacturePatient = ({
  currentPatient,
  currentFacture,
  categorieFactures,
  listFacturesPatient,
  thunkListFacturesPatient,
  thunkListFacturesPayeesPatient,
  thunkListFacturesImpayeesPatient,
  thunkEncaisserAllFactures,
  thunkEncaisserFactures,
  showModal,
  thunkDetailsFacture,
  setShowModal, }) => {
  const [stats, setstats] = useState({
    nbpaye: 0,
    nbimppaye: 0,
    nbTotal: 0,
    montantTotal: 0,
    reste: 0,
    factureImpaye: []
  })
  const [ipp, setipp] = useState();
  const [listPatients, setListPatients] = useState([]);
  const [modalAllfacture, setModalAllfacture] = useState(false)
  const [compte, setcompte] = useState({ numerocompte: "", solde: "" })
  const [fg, setfg] = useState([])
  const [inputs, setinput] = useState({
    modepaiement: "",
    montantrecu: "",
  });

  const columns = [
    "N°",
    "Numero de facture",
    "Date",
    "Heure",
    "Patient",
    "Type de sejour",
    "Auteur",
    "Montant Total",
    "Part ASSU",
    "Reste ASSU",
    "Part Patient",
    "Reste Patient",
  ]

  const global = useContext(GlobalContext);
  const handleClickOpen = (numeroFacture) => { thunkDetailsFacture(numeroFacture); };
  const handleClose = () => { setShowModal(false); setinput({ modepaiement: "", montantrecu: "", }); };
  function setmode({ target: { value } }) { setinput({ ...inputs, modepaiement: value }); }
  function setmontant({ target: { value } }) { setinput({ ...inputs, montantrecu: value }); }

  function sendGlobalData() {
    fg.push(compte.numerocompte)
    thunkEncaisserAllFactures(fg)
    setModalAllfacture(false)
    setinput({
      modepaiement: "",
      montantrecu: "",
    })
  }
  function sendData(numeroFacture) {
    thunkEncaisserFactures(numeroFacture, {
      ...inputs,
      compte: currentFacture.numerocompte,
    });
    setinput({
      modepaiement: "",
      montantrecu: "",
    })
  }
  useEffect(() => {
    Axios({ url: `${header.url}/gap/list/patients`, }).then(({ data: { rows } }) => {
      setListPatients(rows);
    });
  }, []);

  useEffect(() => {
    Axios({ url: `${header.url}/gap/verify/compte/${currentPatient.ipppatient}`, }).then(({ data: { rows } }) => {
      rows[0] && setcompte({ numerocompte: rows[0].numerocompte, solde: rows[0].montantcompte });
    });
  }, [currentPatient, listFacturesPatient]);

  useEffect(() => {
    categorieFactures === 'tous' ? thunkListFacturesPatient(currentPatient) : categorieFactures === 'payé' ? thunkListFacturesPayeesPatient(currentPatient) : thunkListFacturesImpayeesPatient(currentPatient)
  }, [])

  useEffect(() => {
    Axios({ url: `${header.url}/gap/list/factures_patient/${currentPatient.ipppatient}`, }).then(({ data: { rows } }) => {
      setstats({
        nbTotal: rows.length,
        nbpaye: rows.filter(elt => elt.restepatientfacture === 0).length,
        nbimppaye: rows.filter(elt => elt.restepatientfacture > 0).length,
        reste: rows.length !== 0 ? rows.map(elt => elt.restepatientfacture).reduce((acc, curval) => acc + curval) : 0,
        montantTotal: rows.length !== 0 ? rows.map(elt => elt.montanttotalfacture).reduce((acc, curval) => acc + curval) : 0,
        factureImpaye: rows.filter(elt => elt.restepatientfacture > 0)
      })
      setfg(rows.length !== 0 ? rows.filter(elt => elt.restepatientfacture > 0).map(elt => [inputs.modepaiement, 'Patient', elt.restepatientfacture, elt.numerofacture]) : [])
    });
  }, [currentPatient, categorieFactures, listFacturesPatient, inputs.modepaiement])
  return (
    <div className="Dossiers row p-3">
      <div className="col-12">
        <div className="row mb-2">
          <Autocomplete
            size="small"
            className="col-3 p-0"
            id="listpatients"
            options={listPatients}
            onChange={(event, newValue) => { newValue && thunkListFacturesPatient(newValue) }}
            getOptionLabel={(option) => `(${option.ipppatient}) ${option.nompatient.toUpperCase()} ${option.prenomspatient.toUpperCase()}`}
            filterSelectedOptions
            renderOption={(option) => (
              <>
                <small>
                  ({option.ipppatient}) {option.nompatient}{" "}
                  {option.prenomspatient} né le{" "}
                  {option.datenaissancepatient} à{" "}
                  {option.lieunaissancepatient}
                </small>
              </>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selectionnez un patient"
                variant="outlined"
                placeholder="Rechercher le patient ..."
              />
            )}
          />
        </div>
      </div>

      {currentPatient.ipppatient && (
        <>
          <div className="col-12 p-0 mb-3">
            <small><b>Patient : </b> {`(${currentPatient.ipppatient}) ${currentPatient.nompatient.toUpperCase()} ${currentPatient.prenomspatient.toUpperCase()}`}</small>
          </div>
          <div className="col-2 pr-3 p-0">
            <div className="row">
              <div className="col-12">
                <ul className="list-group rounded-0" id="list-tab" role="tablist">
                  <li style={{ cursor: stats.nbTotal === 0 ? "default" : "pointer" }} className={`list-group-item d-flex justify-content-between align-items-center 
                ${categorieFactures === "tous" ? "bgcolor-primary text-white" : "text-secondary"} `}
                    onClick={() => { stats.nbTotal !== 0 && thunkListFacturesPatient(currentPatient) }}
                  >
                    <small>Toutes les factures</small>
                    <span className={`badge ${categorieFactures === "tous" ? "textcolor-primary white" : stats.nbTotal !== 0 ? "bgcolor-primary text-white" : "badge-light"}  badge-pill`}>{stats.nbTotal}</span>
                  </li>
                  <li style={{ cursor: stats.nbpaye === 0 ? "default" : "pointer" }} href="#FacturesPayées" className={`list-group-item d-flex justify-content-between align-items-center 
                ${categorieFactures === "payé" ? "bgcolor-primary text-white" : "text-secondary"} `}
                    onClick={() => { stats.nbpaye !== 0 && thunkListFacturesPayeesPatient(currentPatient) }}>
                    <small>Factures payées</small>
                    <span className={`badge ${categorieFactures === "payé" ? "textcolor-primary white" : stats.nbpaye !== 0 ? "bgcolor-primary text-white" : "badge-light"}  badge-pill`}>{stats.nbpaye}</span>
                  </li>
                  <li style={{ cursor: stats.nbimppaye === 0 ? "default" : "pointer" }} href="#FacturesImpayées" className={`list-group-item d-flex justify-content-between align-items-center 
                ${categorieFactures === "impayé" ? "bgcolor-primary text-white" : "text-secondary"} `}
                    onClick={() => { stats.nbimppaye !== 0 && thunkListFacturesImpayeesPatient(currentPatient) }}
                  >
                    <small>Factures impayées</small>
                    <span className={`badge ${categorieFactures === "impayé" ? "textcolor-primary white" : stats.nbimppaye !== 0 ? "bgcolor-primary text-white" : "badge-light"}  badge-pill`}>{stats.nbimppaye}</span>
                  </li>
                  <li style={{ cursor: "default" }} href="#FacturesAnnulées" className={`list-group-item d-flex justify-content-between align-items-center 
                ${categorieFactures === "annulé" ? "bgcolor-primary text-white" : "text-secondary"} `}>
                    <small>Factures Annulées</small>
                    <span className={`badge ${categorieFactures === "annulé" ? "textcolor-primary white" : "badge-light"}  badge-pill`}>0</span>
                  </li>
                </ul>
              </div>
              <div className="col-12 mt-2">
                <ul className="list-group rounded-0" id="list-tab" role="tablist">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <small className="font-weight-bold">Montant total</small>
                    <span className="badge badge-pill badge-success">{stats.montantTotal} FCFA</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <small className="font-weight-bold">Reste à payer</small>
                    <span className="badge badge-danger badge-pill">{stats.reste} FCFA</span>
                  </li>
                </ul>
                {
                  stats.reste !== 0 && (
                    <Button
                      variant="contained"
                      className="mt-2 col"
                      disabled={stats.reste === 0}
                      startIcon={<FeaturedPlayListIcon />}
                      onClick={() => {
                        setModalAllfacture(true);
                      }}
                      style={{
                        textTransform: "none",
                        backgroundColor: global.theme.secondaryDark,
                        color: "white",
                        fontSize: "11px",
                      }}
                    >
                      Régler toutes les factures
                    </Button>
                  )
                }

                {/* <QrReader
                  delay={500}
                  style={{ height: 400, width: 400 }}
                  onError={(err) => { console.log(err) }}
                  onScan={(result) => { console.log("result :" + result) }}
                /> */}
              </div>
            </div>
          </div>
        </>)
      }
      {listFacturesPatient.length === 0 ? (
        <div className="col-12 text-secondary text-center">
          <h6 className="text-center lead">Aucune Patient sélectionné</h6>
          <small>Veuillez en sélectionner un dans la liste déroulante</small>
        </div>
      ) : (
          <>
            <table className="col-10 table-sm table-sm table-hover table-striped">
              <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
              </thead>
              <tbody>
                {listFacturesPatient.map(
                  ({ civilitepatient, typesejour, numerofacture, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, restepatientfacture, }, i) => (
                    <tr key={i} style={{ cursor: "pointer" }}
                      onClick={() => handleClickOpen(numerofacture)}
                    >
                      <td className="font-weight-bold">{i + 1}</td>
                      <td className="font-weight-bold">{numerofacture}</td>
                      <td>{datefacture}</td>
                      <td>{heurefacture}</td>
                      <td className="font-weight-bold">{civilitepatient} {nompatient} {prenomspatient}</td>
                      <td>{typesejour}</td>
                      <td>{auteurfacture}</td>
                      <td>{montanttotalfacture} FCFA</td>
                      <td>{partassurancefacture} FCFA</td>
                      <td>{resteassurancefacture} FCFA</td>
                      <td >{partpatientfacture} FCFA</td>
                      <td className={`font-weight-bold ${restepatientfacture < 0 && "flash animated infinite red-text font-weight-bold"}`}>{restepatientfacture} FCFA</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )
      }
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
          <b>Facture N° {currentFacture.numerofacture}</b>
          {currentFacture.restepatientfacture === 0 && <><br /><small className="green-text font-weight-bold">(déjà payée)</small></>}
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row mx-1">
                <div className="col-12 p-0">
                  <small><b>Patient : </b>{currentFacture.civilitepatient}{" "} {currentFacture.nompatient}{" "} {currentFacture.prenomspatient}<br /></small>
                  <small>
                    <b>Reste à payer</b> :{" "}
                    <span
                      className={
                        currentFacture.restepatientfacture < 0 &&
                        "flash animated infinite red-text font-weight-bold"
                      }
                    >
                      {currentFacture.restepatientfacture} FCFA
                    </span>
                  </small>
                  <br />
                  {currentFacture.numerocompte !== null && (
                    <>
                      <hr className="bg-light" />
                      <small>
                        <b>N° compte : </b> {currentFacture.numerocompte}{" "}
                      </small>
                      <br />
                      <small>
                        <b>Solde : </b> {currentFacture.montantcompte}
                        {" FCFA"}
                      </small>{" "}
                    </>
                  )}
                </div>
              </div>
              {currentFacture.restepatientfacture !== 0 && (
                <>
                  <div className="row my-3 mx-1">
                    <FormControl variant="filled" size="small" className="col">
                      <InputLabel id="typesejour-label">
                        Mode de paiement
                    </InputLabel>
                      {currentFacture.montantcompte > 0 ? (
                        <Select
                          labelId="typesejour-label"
                          id="typesejour"
                          value={inputs.modepaiment}
                          onChange={setmode}
                          label="Mode de paiement"
                          style={{ fontSize: "13px" }}
                        >
                          <MenuItem style={{ fontSize: "13px" }} value={"Compte"}>Compte</MenuItem>
                          <MenuItem style={{ fontSize: "13px" }} value={"Chèque"}>Chèque</MenuItem>
                          <MenuItem style={{ fontSize: "13px" }} value={"Espèces"}>Espèces</MenuItem>
                          <MenuItem style={{ fontSize: "13px" }} value={"Électronique"}>Électronique</MenuItem>
                          <MenuItem style={{ fontSize: "13px" }} value={"Mobile money"}>Mobile money</MenuItem>
                        </Select>
                      ) : (
                          <Select
                            labelId="typesejour-label"
                            id="typesejour"
                            value={inputs.modepaiment}
                            onChange={setmode}
                            label="Mode de paiement"
                            style={{ fontSize: "13px" }}
                          >
                            <MenuItem style={{ fontSize: "13px" }} value={"Chèque"}>Chèque</MenuItem>
                            <MenuItem style={{ fontSize: "13px" }} value={"Espèces"}>Espèces</MenuItem>
                            <MenuItem style={{ fontSize: "13px" }} value={"Électronique"}>Électronique</MenuItem>
                            <MenuItem style={{ fontSize: "13px" }} value={"Mobile money"}>Mobile money</MenuItem>
                          </Select>
                        )}
                    </FormControl>
                    <TextField
                      className="col-5 ml-2"
                      variant="filled"
                      size="small"
                      type="number"
                      max={10}
                      label="Montant recu"
                      value={inputs.montantrecu}
                      onChange={setmontant}
                    />
                  </div>
                  <div className="col-12 d-flex">
                    <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                    <small className="font-weight-bold">Renseignez tous les champs néccessaires pour le paiement d'une facture</small>
                  </div>
                </>
              )}

            </div>
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
              fontSize: "13px",
            }}
          >
            Annuler
          </Button>
          {currentFacture.restepatientfacture !== 0 && <Button
            variant="contained"
            className="mb-2"
            disabled={inputs.modepaiement.trim() === "" || inputs.montantrecu.trim() === ""}
            onClick={() => sendData(currentFacture.numerofacture)}
            startIcon={<CheckCircleOutlineIcon />}
            style={{
              textTransform: "none",
              backgroundColor: global.theme.primary,
              color: "white",
              fontSize: "13px",
            }}
          >
            Valider la transaction
          </Button>}
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalAllfacture}
        onClose={() => { setModalAllfacture(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
          <b>Ventilation globale</b>
          {currentFacture.restepatientfacture === 0 && <><br /><small className="green-text font-weight-bold">(déjà payée)</small></>}
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row mx-1">
                <div className="col-12 p-0">
                  <small><b>Patient : </b>{currentPatient.civilitepatient}{" "} {currentPatient.nompatient}{" "} {currentPatient.prenomspatient}</small><br />
                  <small>
                    <b>Reste à payer</b> :{" "}
                    <span
                      className={
                        stats.reste < 0 &&
                        "flash animated infinite red-text font-weight-bold"
                      }
                    >
                      {stats.reste} FCFA
                    </span>
                  </small>
                  {compte.numerocompte !== null && (
                    <>
                      <div className="col-12 p-0 mb-2">
                        <small><b>N° compte : </b> {compte.numerocompte}{" "}</small><br />
                        <small><b>Solde : </b> {compte.solde}{" FCFA"}</small>{" "}
                      </div>
                    </>
                  )}
                </div>
                <br />
                <table className="col-12 table-sm table-sm table-hover table-active">
                  <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                    <tr>{["N°", "N° facture", "Date", "Part patient", "Montant restant"].map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                  </thead>
                  <tbody>
                    {stats.factureImpaye.map(({ numerofacture, datefacture, heurefacture, partpatientfacture, restepatientfacture }, i) => (
                      <tr key={numerofacture} >
                        <td>{i + 1}</td>
                        <td>{numerofacture}</td>
                        <td>{datefacture} {heurefacture}</td>
                        <td>{partpatientfacture}</td>
                        <td className="font-weight-bold">{restepatientfacture}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {stats.reste !== 0 && (
                <>
                  <div className="row my-3 mx-1">
                    <FormControl variant="filled" size="small" className="col">
                      <InputLabel id="typesejour-label">
                        Mode de paiement
                    </InputLabel>
                      {compte.solde > 0 ? (
                        <Select
                          labelId="typesejour-label"
                          id="typesejour"
                          value={inputs.modepaiment}
                          onChange={setmode}
                          label="Mode de paiement"
                          style={{ fontSize: "13px" }}
                        >
                          <MenuItem style={{ fontSize: "13px" }} value={"Compte"}>
                            Compte
                        </MenuItem>
                          <MenuItem style={{ fontSize: "13px" }} value={"Chèque"}>
                            Chèque
                        </MenuItem>
                          <MenuItem
                            style={{ fontSize: "13px" }}
                            value={"Espèces"}
                          >
                            Espèces
                        </MenuItem>
                          <MenuItem
                            style={{ fontSize: "13px" }}
                            value={"Électronique"}
                          >
                            Électronique
                        </MenuItem>
                          <MenuItem
                            style={{ fontSize: "13px" }}
                            value={"Mobile money"}
                          >
                            Mobile money
                        </MenuItem>
                        </Select>
                      ) : (
                          <Select
                            labelId="typesejour-label"
                            id="typesejour"
                            value={inputs.modepaiment}
                            onChange={setmode}
                            label="Mode de paiement"
                            style={{ fontSize: "13px" }}
                          >
                            <MenuItem style={{ fontSize: "13px" }} value={"Chèque"}>
                              Chèque
                        </MenuItem>
                            <MenuItem
                              style={{ fontSize: "13px" }}
                              value={"Espèces"}
                            >
                              Espèces
                        </MenuItem>
                            <MenuItem
                              style={{ fontSize: "13px" }}
                              value={"Électronique"}
                            >
                              Électronique
                        </MenuItem>
                            <MenuItem
                              style={{ fontSize: "13px" }}
                              value={"Mobile money"}
                            >
                              Mobile money
                        </MenuItem>
                          </Select>
                        )}
                    </FormControl>
                    <TextField
                      className="col-5 ml-2"
                      variant="filled"
                      size="small"
                      type="number"
                      label="Montant"
                      disabled
                      defaultValue={stats.reste}
                    />
                  </div>
                  <div className="col-12 d-flex">
                    <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                    <small className="font-weight-bold">Renseignez tous les champs néccessaires pour le paiement d'une facture</small>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="mb-2"
            startIcon={<CancelIcon />}
            onClick={() => { setModalAllfacture(false); setinput({ modepaiement: "", montantrecu: "", }) }}
            style={{
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            disabled={inputs.modepaiement.trim() === ""}
            className="mb-2"
            onClick={() => sendGlobalData()}
            startIcon={<CheckCircleOutlineIcon />}
            style={{
              textTransform: "none",
              backgroundColor: global.theme.primary,
              color: "white",
              fontSize: "13px",
            }}
          >
            Valider la transaction
          </Button>
        </DialogActions>
      </Dialog>
    </div >

  );
};

const mapStateToProps = (state) => {
  const {
    factureReducer: { listFacturesPatient, showModal, currentPatient, currentFacture, categorieFactures },
  } = state;
  return { listFacturesPatient, showModal, currentPatient, currentFacture, categorieFactures };
};

const FacturePatientConnected = connect(mapStateToProps, {
  thunkListFacturesPayeesPatient,
  thunkListFacturesImpayeesPatient,
  thunkListFacturesPatient,
  thunkEncaisserFactures,
  thunkDetailsFacture,
  thunkEncaisserAllFactures,
  setShowModal,
})(FacturePatient);

export default FacturePatientConnected;