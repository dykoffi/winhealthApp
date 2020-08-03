import DateFnsUtils from "@date-io/date-fns";
import { Avatar, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Axios from "axios";
import frLocale from "date-fns/locale/fr";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { header } from "../../../global/apiQuery";
import GlobalContext, { Info } from "../../../global/context";
import { thunkAddSejour, thunkDetailsSejour, thunkListSejour } from "../../api/admission/sejour";
import Facture from "../../documents/Facture";
function PaperComponent(props) { return (<div className="row" {...props} ></div>); }
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
  currentPatient,
  listSejour,
  currentSejour,
  currentFacture
}) => {
  moment.locales("fr");
  const global = useContext(GlobalContext);
  const [pdf, setpdf] = useState(false);
  const [urlPDF, seturlPDF] = useState(false);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [openControle, setOpenControle] = useState(false);
  const [listActes, setListActe] = useState([]);
  const [actes, setActes] = useState([]);
  const [listAssurances, setListAssurances] = useState([]);
  const [listActesDef, setListActesDef] = useState([
    [
      "", //codeActe
      0,//prixUnitaire
      0,//plafondAssurance
      1,//quantite
      0//prixTotal
    ]

  ])

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
    taux: 0
  });

  const columns = [
    "N° Séjour",
    "Date et heure de début",
    "Date et heure de fin",
    "Type de séjour",
    "Statut du séjour",
    "Medecin"
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
    setListActesDef([
      [
        "", //codeActe
        0,//prixUnitaire
        0,//plafondAssurance
        1,//quantite
        0//prixTotal
      ]])
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
  function setbeneficiaire({ target: { value } }) {
    if (value === "assuré") {
      setinput({ ...inputs, beneficiaire: value, assurePrinc: `${currentPatient.nompatient} ${currentPatient.prenomspatient}` })
    } else {
      setinput({ ...inputs, beneficiaire: value });
    }
  }
  function setassurePrinc({ target: { value } }) { setinput({ ...inputs, assurePrinc: value }); }
  function setmatriculeAssure({ target: { value } }) { setinput({ ...inputs, matriculeAssure: value }); }
  function setnumeroPEC({ target: { value } }) { setinput({ ...inputs, numeroPEC: value }); }
  function settaux({ target: { value } }) { setinput({ ...inputs, taux: value }); }
  function showPDF(url) { seturlPDF(url); setpdf(true) }
  function sendDTata() {
    thunkAddSejour({ ...inputs, actes: listActesDef }, currentPatient.iddossier);
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
    setListActesDef([
      [
        "", //codeActe
        0,//prixUnitaire
        0,//plafondAssurance
        1,//quantite
        0//prixTotal
      ]])
    setOpen(false);
  }
  useEffect(() => {
    Axios({ url: `${header.url}/gap/list/actes` }).then(({ data: { rows } }) => {
      const actes = [];
      rows.forEach(({ codeacte, libelleacte }) => { actes.push({ value: codeacte, label: libelleacte }); });
      setListActe(rows);
    });
    Axios({ url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => {
      const assurances = [];
      rows.forEach(({ idassurance, nomassurance }) => { assurances.push({ value: idassurance, label: nomassurance }); });
      setListAssurances(assurances);
    });
  }, []);
  useEffect(() => {
    thunkListSejour(currentPatient.iddossier);
  },
    [currentPatient.iddossier]);
  return (
    <div className="DossiersPatient row px-3">
      {currentSejour !== null && (
        <div className="col-12 white text-secondary mb-2">
          <div className="row">
            <div className="col-12">
              <div className="row" style={{ fontSize: "14.5px" }}>
                <div className="col-3">
                  <h6>Sejour</h6>
                  <small><b>N° du séjour :</b> {currentSejour.numerosejour}</small><br />
                  <small><b>Date de debut :</b> {currentSejour.datedebutsejour}{" "}{currentSejour.heuredebutsejour}</small><br />
                  <small><b>Date de fin :</b> {currentSejour.datefinsejour}{" "}{currentSejour.heurefinsejour}</small><br />
                  <small><b>Type du séjour :</b> {currentSejour.typesejour}</small>
                </div>
                <div className="col">
                  <h6>Facture ({currentSejour.numerofacture})</h6>
                  <small><b>Date de création :</b> {currentSejour.datefacture}{" "}{currentSejour.heurefacture}</small><br />
                  <small><b>Montant Total :</b> {currentSejour.montanttotalfacture}{" "}FCFA</small><br />
                  <small><b>Part Assu :</b> {currentSejour.partassurancefacture}{" "}FCFA, <b>Reste</b> : {currentSejour.resteassurancefacture} FCFA</small><br />
                  <small><b>Part Patient :</b> {currentSejour.partpatientfacture}{" "}FCFA, <b>Reste</b> : {currentSejour.restepatientfacture} FCFA</small><br />
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
                <div className="col d-flex align-items-end justify-content-end">
                  <div className="row">
                    <Facture facture={currentFacture} showPDF={showPDF} code={`WINHEALTH`} />
                    {/* {2 - currentSejour.nbcontrole > 0 && (
                      <Button
                        variant="contained"
                        startIcon={<BallotIcon />}
                        onClick={() => setOpenControle(true)}
                        style={{
                          textTransform: "none",
                          fontSize: "11px",
                        }}
                      >Contrôle ({2 - currentSejour.nbcontrole})</Button>
                    )} */}
                  </div>
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
            label="Rechercher un séjour"
          />
          <Chip
            className="mx-1"
            label="sejours(s)"
            avatar={
              <Avatar
                className="white-text"
                style={{ backgroundColor: global.theme.primary }}
              >{listSejour.length}</Avatar>
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
            >Nouveau séjour</Button>
          </div>
        </div>
      </div>
      <table className="col-12 table-sm table-hover table-striped">
        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
          <tr>{columns.map((col, i) => (<th className="white-text" key={i} >{col}</th>))}</tr>
        </thead>
        <tbody>
          {listSejour.map(({ datedebutsejour, datefinsejour, heuredebutsejour, heurefinsejour, typesejour, statussejour, idsejour, numerosejour, medecinsejour }, i) => (
            <tr
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => thunkDetailsSejour(numerosejour)}
              className={currentSejour && currentSejour.idsejour === idsejour ? "bgcolor-primary font-weight-bold white-text" : ""}
            >
              <td>{numerosejour}</td>
              <td>{datedebutsejour} {heuredebutsejour}</td>
              <td>{datefinsejour} {heurefinsejour}</td>
              <td>{typesejour}</td>
              <td>{statussejour}</td>
              <td>{medecinsejour}</td>
            </tr>
          ))}
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
          transitionDuration={0}
          maxWidth="md"
        >
          <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
            <b>Ajouter un nouveau séjour</b>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12">
                <div className="row mx-1 my-2">
                  <div className="col">
                    <small className="font-weight-bold">Debut du séjour</small>
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
                  <div className="col">
                    <small className="font-weight-bold">Fin du séjour</small>
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
                  <div className="col">
                    <small className="font-weight-bold">Informations du séjour</small>
                    <FormControl variant="outlined" size="small" className="col-12 mt-3 mb-1">
                      <InputLabel id="typesejour-label">Type de séjour</InputLabel>
                      <Select
                        labelId="typesejour-label"
                        id="typesejour"
                        onChange={settype}
                        label="Type de séjour"
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
                      className="col-12 mt-2"
                    >
                      <InputLabel id="typesejour-label">Médecin</InputLabel>
                      <Select
                        required
                        labelId="typesejour-label"
                        id="typesejour"
                        onChange={setmedecin}
                        label="Type de séjour"
                        style={{ fontSize: "12px" }}
                      >
                        <MenuItem style={{ fontSize: "12px" }} value={"KOFFI Edy"}>KOFFI Edy</MenuItem>
                        <MenuItem style={{ fontSize: "12px" }} value={"N'DONGO Abdoulaye"}>N'DONGO Abdoulaye</MenuItem>
                        <MenuItem style={{ fontSize: "12px" }} value={"GBADJE Wilfried"}>GBADJE Wilfried</MenuItem>
                        <MenuItem style={{ fontSize: "12px" }} value={"ZAKI Audrey"}>ZAKI Audrey</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <small className="font-weight-bold">Informations pour patient assuré</small>
                <div className="row mx-1 my-3">
                  <Autocomplete
                    size="small"
                    className="col p-0"
                    id="assurancesList"
                    options={listAssurances}
                    onChange={(event, newValue) => { newValue ? setgestionnaire(newValue.label) : setgestionnaire("") }}
                    getOptionLabel={(option) => option.label}
                    filterSelectedOptions
                    renderOption={(option) => (<>
                      <small style={{ fontSize: "12px" }}>{option.label}</small>
                    </>)}
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
                    className="col p-0 mx-2"
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
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="col-3"
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
                    className="col-4 ml-2"
                    variant="outlined"
                    size="small"
                    defaultValue=" "
                    label="Identité de l'Assuré"
                    value={inputs.assurePrinc}
                    onChange={setassurePrinc}
                  />
                  <Input
                    className="col mx-2"
                    variant="outlined"
                    size="small"
                    label="Matricule"
                    onChange={setmatriculeAssure}
                    disabled={inputs.assurePrinc.trim() === ""}
                  />
                  <Input
                    className="col"
                    variant="outlined"
                    size="small"
                    label="N° PEC"
                    onChange={setnumeroPEC}
                    disabled={inputs.assurePrinc.trim() === ""}
                  />
                </div>
                <table className="col-12 table-sm mx-1 mt-2">
                  <thead className="p-2" style={{ backgroundColor: global.theme.primary }}>
                    <tr className="p-2">{[
                      "Code",
                      "Prix U",
                      "Plafond Assu",
                      "Qte",
                      "Prix T",
                      ""
                    ].map((col, i) => (<th className="white-text" key={i} >{col}</th>))}</tr>
                  </thead>
                  <tbody>
                    {listActesDef.map((actes, i) =>
                      <tr key={i} >
                        <td className="col-7">
                          <Autocomplete
                            size="small"
                            className="col p-0"
                            id="actesList"
                            options={listActes}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                let listTemp = [...listActesDef]
                                listTemp[i] =
                                  [
                                    newValue.codeacte, //codeActe
                                    newValue.prixacte,//prixUnitaire
                                    newValue.prixacte,//plafondAssurance
                                    1,//quantite
                                    newValue.prixacte//prixTotal
                                  ]
                                setListActesDef(listTemp)
                              }
                            }}
                            getOptionLabel={(acte) => `(${acte.codeacte}) ${acte.libelleacte}`}
                            filterSelectedOptions
                            renderOption={(acte) => (<>
                              <small style={{ fontSize: "12px" }}>{acte.libelleacte}</small>
                            </>)}
                            renderInput={(params) => (
                              <Input
                                className="col"
                                {...params}
                                placeholder="acte ..."
                              />
                            )}
                          />
                        </td>
                        <td> <Input type="number" value={listActesDef[i][1]} disabled size="small" /></td>
                        <td> <Input type="number" value={listActesDef[i][2]} onChange={({ target: { value } }) => {
                          let listTemp = [...listActesDef]
                          listTemp[i][2] = value
                          setListActesDef(listTemp)
                        }} size="small" /></td>
                        <td> <Input type="number" value={listActesDef[i][3]} onChange={({ target: { value } }) => {
                          let listTemp = [...listActesDef]
                          listTemp[i][3] = value
                          listTemp[i][4] = value * listActesDef[i][1]
                          setListActesDef(listTemp)
                        }} size="small" /></td>
                        <td> <Input disabled value={listActesDef[i][4]} size="small" /></td>
                        <td>
                          {i === listActesDef.length - 1 &&
                            (<IconButton size="small" aria-label="delete" title={i} onClick={() => {
                              let listTemp = [...listActesDef]
                              listTemp.splice(i, 1)
                              setListActesDef(listTemp)
                            }}>
                              <DeleteOutlineIcon />
                            </IconButton>)
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="col-12 d-flex p-0 mt-2 justify-content-end">
                  <Button
                    size="small"
                    variant="contained"
                    className="mb-2"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setListActesDef(
                        [...listActesDef, [
                          "", //codeActe
                          0,//prixUnitaire
                          0,//plafondAssurance
                          1,//quantite
                          0//prixTotal
                        ]]
                      )
                    }}
                    style={{
                      textTransform: "none", fontSize: "11px", backgroundColor: global.theme.primary,
                      fontSize: "11px",
                      color: "white",
                    }}
                  >Ajouter</Button></div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="mb-2"
              startIcon={<CancelIcon />}
              onClick={handleClose}
              style={{ textTransform: "none", fontSize: "11px", }}
            >Annuler</Button>
            <Button
              variant="contained"
              className="mb-2"
              onClick={() => {
                console.log(listActesDef)
                setDisabled(true);
                sendDTata();
              }}
              disabled={
                disabled ||
                inputs.type.trim() === "" ||
                inputs.medecin === "" ||
                listActesDef.filter(acte => acte[4] === 0).length !== 0 ||
                (inputs.gestionnaire.trim() !== "" && (
                  inputs.organisme.trim() === "" ||
                  inputs.taux.toString().trim() === "" ||
                  inputs.beneficiaire.trim() === "" ||
                  inputs.assurePrinc.trim() === "" ||
                  inputs.numeroPEC.trim() === ""
                ))

              }
              startIcon={<ChromeReaderModeIcon />}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                fontSize: "11px",
                color: "white",
              }}
            >Generer la facture</Button>
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
        <Dialog
          open={pdf}
          onClose={() => setpdf(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          style={{ overflowX: 'hidden' }}
          maxWidth="md"
          scroll={'body'}
          PaperComponent={PaperComponent}
        >
          <object data={urlPDF} className="col-12" height={700} type="application/pdf"></object>
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
    sejourReducer: { listSejour, currentSejour, currentFacture },
  } = state;
  return { currentPatient, listSejour, currentSejour, currentFacture };
};
const DossiersPatientConnected = connect(mapStatetoProps, {
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
})(DossiersPatient);

export default DossiersPatientConnected;
