import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GlobalContext from "../../../global/context";
import { header } from "../../../global/apiQuery";
import Axios from "axios";
import moment from 'moment'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import {
  thunkAddEncaissement,
  thunkListEncaissement,
  thunkDetailsEncaissement,
  thunkListFacturesByAssurances,
  thunkDetailsFacture,
  thunkEncaisserFactures,
  setListFacturesByAssurance,
  setListFacturesVentiles,
  setModal,
  setModalFacture
} from "../../api/encaissement/encaissements";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AssignmentTurnedInTwo from '@material-ui/icons/AssignmentTurnedInOutlined';
import AssignmentLateTwo from '@material-ui/icons/AssignmentLateOutlined';
import {
  TextField,
  Avatar,
  Chip,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  Slide,
  Button,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { separate } from "../../../global/functions";

const Transition = React.forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });
const Encaissement = ({
  listEncaissement,
  listFacturesVentiles,
  listFacturesByAssurance,
  currentEncaissement,
  currentFacture,
  showModal,
  modalFacture,
  thunkAddEncaissement,
  thunkDetailsEncaissement,
  thunkListEncaissement,
  thunkListFacturesByAssurances,
  thunkDetailsFacture,
  thunkEncaisserFactures,
  setListFacturesByAssurance,
  setListFacturesVentiles,
  setModal,
  setModalFacture
}) => {
  const global = useContext(GlobalContext);
  const [value, setValue] = useState("");
  const [openEncaissement, setOpenEncaissement] = useState(false);
  const [inputs, setinput] = useState({ mode: "", montant: "", assurance: "", numeroTransaction: "", comentaire: "" });
  const [listAssurances, setListAssurance] = useState([]);
  const [valueFacture, setValueFacture] = useState("");
  const [tousSelectionner, settousSelectionner] = useState("");
  const [inputsearch, setinputsearch] = useState({
    nomassurance: "Tous",
    nomgarant: "Tous",
    typeSejour: "Tous",
    debutDateString: moment("2020-01-01").format('DD-MM-YYYY'),
    finDateString: moment("2020-12-31").format('DD-MM-YYYY'),
    debutDate: new Date("2020-01-01"),
    finDate: new Date("2020-12-31"),
  });
  const [inputFacture, setinputFacture] = useState({
    modepaiement: "",
    montantrecu: "",
  });
  function setmodefacture({ target: { value } }) { setinputFacture({ ...inputFacture, modepaiement: value }); }
  function setmontantfacture({ target: { value } }) { setinputFacture({ ...inputFacture, montantrecu: value }); }
  const handlecloseFacture = () => {
    setModalFacture(false)
    setinputFacture({
      modepaiement: "",
      montantrecu: "",
    })
  };
  function sendData(numeroFacture) {
    thunkEncaisserFactures(numeroFacture, {
      ...inputFacture,
      encaissement: currentEncaissement.numeroencaissement
    });
  }
  const handleClose = () => {
    setModal(false);
    setinputsearch({
      nomassurance: "Tous",
      nomgarant: "Tous",
      typeSejour: "Tous",
      debutDateString: moment("2020-01-01").format('DD-MM-YYYY'),
      finDateString: moment("2020-12-31").format('DD-MM-YYYY'),
      debutDate: new Date("2020-01-01"),
      finDate: new Date("2020-12-31"),
    });
    setListFacturesVentiles([])
    setListFacturesByAssurance([])
    settousSelectionner(false)
  };
  function setdebutDate(value) { setinputsearch({ ...inputsearch, debutDate: value, debutDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
  function setfinDate(value) { setinputsearch({ ...inputsearch, finDate: value, finDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
  function settype(value) { setinputsearch({ ...inputsearch, typeSejour: value }) }
  function setassurance(value) { setinputsearch({ ...inputsearch, nomassurance: value }) }
  function setgarant(value) { setinputsearch({ ...inputsearch, nomgarant: value }) }


  function setmode({ target: { value } }) { setinput({ ...inputs, mode: value }); }
  function setmontant({ target: { value } }) { setinput({ ...inputs, montant: value }); }
  function setnumeroTransaction({ target: { value } }) { setinput({ ...inputs, numeroTransaction: value }); }
  function setcommentaire({ target: { value } }) { setinput({ ...inputs, commentaire: value }); }
  function setassurance(value) { setinput({ ...inputs, assurance: value }); }
  function closeEncaissement() {
    setinput({ mode: "", montant: "", assurance: "", numeroTransaction: "", commentaire: "" })
    setOpenEncaissement(false)
  }
  const [columns] = useState([
    "N°",
    "Numero d'encaissement",
    "Assurance",
    "Mode de paiement",
    "Date",
    "Heure",
    "Recepteur",
    "Montant",
    "Reste"
  ]);
  const columnsFactures = [
    "N°",
    "N°facture",
    "Date",
    "Heure",
    "Gestionnaire",
    "Organisme",
    "Type de sejour",
    "N° PEC",
    "Matricule Assuré",
    "Taux",
    "Patient",
    "Assuré Princ",
  ]
  useEffect(() => {
    thunkListEncaissement()
    Axios({ url: `${header.url}/gap/list/assurances` }).then(({ data: { rows } }) => {
      const Assurance = [];
      rows.forEach(({ idassurance, nomassurance }) => { Assurance.push({ value: idassurance, label: nomassurance }); });
      setListAssurance(Assurance);
    });
  }, []);
  useEffect(() => {
    settousSelectionner(false)
    setListFacturesVentiles([])
  }, [listFacturesByAssurance, valueFacture])
  return (
    <div className="Encaissement row p-2">
      <div className="col-12">
        <div className="row mb-2">
          <TextField
            className="col-2"
            variant="outlined"
            size="small"
            label="Rechercher un encaissement"
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
              setValue(v)
            }}
          />
          <div className="col-2">
            <Chip
              label="Encaissements(s)"
              avatar={
                <Avatar
                  className="white-text"
                  style={{ backgroundColor: global.theme.primary }}
                >
                  {listEncaissement.length}
                </Avatar>
              }
            />
          </div>
          <div className="col d-flex justify-content-end p-0">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenEncaissement(true);
              }}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                color: "white",
                fontSize: "13px",
              }}
            >
              Nouvel encaissement
            </Button>
          </div>
        </div>
      </div>
      {listEncaissement.length === 0 ? (
        <div className="col-12 text-secondary text-center">
          <h6 className="text-center lead">Aucun Encaissement existant</h6>
          <small>
            Pour en ajouter un cliquez sur le boutton 'Nouvel encaissement' puis
            renseignez les informations
          </small>
        </div>
      ) : (
          <table className="table-sm col-12 table-hover table-striped">
            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
              <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
            </thead>
            <tbody>
              {listEncaissement
                .filter(encaissement => value.trim() === "" || RegExp(value, 'i').test(encaissement.numeroencaissement))
                .map(
                  ({ numeroencaissement, dateencaissement, heureencaissement, modepaiementencaissement, assuranceencaissement, recepteurencaissement, montantencaissement, commentaireencaissement, resteencaissement }, i) => (
                    <>
                      <tr style={{ cursor: 'pointer' }} key={i} onClick={() => thunkDetailsEncaissement(numeroencaissement)}>
                        <td>{i + 1}</td>
                        <td className="font-weight-bold">{numeroencaissement}</td>
                        <td>{assuranceencaissement}</td>
                        <td>{modepaiementencaissement}</td>
                        <td>{moment(dateencaissement).format('DD/MM/YYYY')}</td>
                        <td>{heureencaissement}</td>
                        <td className="font-weight-bold">{recepteurencaissement}</td>
                        <td className="font-weight-bold">{separate(montantencaissement)}</td>
                        <td className="font-weight-bold">{separate(resteencaissement)}</td>
                      </tr>

                    </>
                  )
                )}
              <tr className='white'>
                <td colSpan={7}></td>
                <td className="font-weight-bold white-text " style={{ backgroundColor: global.theme.primary }}>
                  {separate(listEncaissement
                    .filter(encaissement => value.trim() === "" || RegExp(value, 'i').test(encaissement.numeroencaissement))
                    .map(encaissement => encaissement.montantencaissement).reduce((acc, curv) => acc + curv))}</td>
                <td className="font-weight-bold white-text " style={{ backgroundColor: global.theme.primary }}>
                  {separate(listEncaissement
                    .filter(encaissement => value.trim() === "" || RegExp(value, 'i').test(encaissement.numeroencaissement))
                    .map(encaissement => encaissement.resteencaissement).reduce((acc, curv) => acc + curv))}</td>
              </tr>

            </tbody>
          </table>
        )}
      <Dialog
        disableBackdropClick
        open={openEncaissement}
        onClose={closeEncaissement}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        transitionDuration={0}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
          <b>Ajouter un nouvel encaissement</b>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <Autocomplete
              size="small"
              className="col-12 p-0"
              id="AssuranceList1"
              options={listAssurances}
              onChange={(event, newValue) => {
                newValue && setassurance(newValue.label)
              }}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
              renderInput={(params) => (<TextField {...params} variant="filled" label="Gestionnaire" placeholder="Ajouter ..." />)}
            />
            <FormControl
              variant="filled"
              size="small"
              className="col-12 my-2"
            >
              <InputLabel id="typesejour-label">Mode de paiement</InputLabel>
              <Select
                labelId="typesejour-label"
                id="typesejour"
                variant="filled"
                value={inputs.mode}
                onChange={setmode}
                label="Mode de paiement"
                style={{ fontSize: "13px" }}
              >
                <MenuItem style={{ fontSize: "13px" }} value={"Chèque"}>Chèque</MenuItem>
                <MenuItem style={{ fontSize: "13px" }} value={"Espèces"}>Espèces</MenuItem>
                <MenuItem style={{ fontSize: "13px" }} value={"Électronique"}>Électronique</MenuItem>
                <MenuItem style={{ fontSize: "13px" }} value={"Mobile money"}>Mobile money</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className="col-12 "
              type="number"
              variant="filled"
              size="small"
              label="Montant"
              value={inputs.montant}
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
                setmontant({ target: { value: v } })
              }}
            />
            <TextField
              className="col-12 my-2"
              variant="filled"
              size="small"
              label="Numero de Transaction"
              value={inputs.numeroTransaction}
              disabled={!["Chèque", "Électronique", "Mobile money"].includes(inputs.mode)}
              onChange={({ target: { value } }) => {
                let v = value
                  .replace("*", "")
                  .replace("+", "")
                  .replace("/", "")
                  .replace("~", "")
                  .replace("~", "")
                  .replace(")", "")
                  .replace("(", "")
                  .replace("=", "")
                setnumeroTransaction({ target: { value: v } })
              }}
            />
            <TextField
              className="col-12"
              variant="filled"
              size="small"
              label="Commentaire"
              value={inputs.commentaire}
              onChange={({ target: { value } }) => {
                let v = value
                  .replace("*", "")
                  .replace("+", "")
                  .replace("/", "")
                  .replace("~", "")
                  .replace("~", "")
                  .replace(")", "")
                  .replace("(", "")
                  .replace("=", "")
                setcommentaire({ target: { value: v } })
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="mb-2"
            startIcon={<CancelIcon />}
            onClick={closeEncaissement}
            style={{
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            className="mb-2"
            onClick={() => {
              thunkAddEncaissement(inputs)
              closeEncaissement()
            }}
            startIcon={<CheckCircleOutlineIcon />}
            disabled={
              inputs.assurance.trim() === "" ||
              inputs.mode.trim() == "" ||
              inputs.montant.trim() === "" ||
              (["Chèque", "Électronique", "Mobile money"].includes(inputs.mode) && inputs.numeroTransaction.trim() === "")
            }
            style={{
              textTransform: "none",
              backgroundColor: global.theme.primary,
              color: "white",
              fontSize: "13px",
            }}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        TransitionComponent={Transition}
        open={showModal}
        disableBackdropClick
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        transitionDuration={350}
        fullWidth={true}
        style={{ minHeight: "60vh" }}
        maxWidth="lg"
        onEnter={() => {
          thunkListFacturesByAssurances({ ...inputsearch, nomassurance: currentEncaissement.assuranceencaissement })
        }}
      >
        <DialogTitle
          className="text-center text-secondary"
          id="alert-dialog-title"
        >
          <b>Ventilation d'encaissement</b>
        </DialogTitle>
        <DialogContent>
          <div className="col-12 mb-2">
            <div className="row">
              <div className="col-auto p-0">
                <small><b>N°  : </b>{currentEncaissement.numeroencaissement}</small><br />
                <small><b>Date d'encaissement : </b>{moment(currentEncaissement.dateencaissement).format('DD/MM/YYYY')} </small><br />
                <small><b>Heure d'encaissement : </b>{currentEncaissement.heureencaissement}</small><br />
                <small><b>Type d'encaissement : </b>{currentEncaissement.modepaiementencaissement}</small><br />
              </div>
              <div className="col-auto">
                <small><b>Gestionnaire : </b> {currentEncaissement.assuranceencaissement}</small><br />
                <small><b>Recepteur : </b> {currentEncaissement.recepteurencaissement}</small><br />
                <small><b>Montant Encaissement : </b> {separate(currentEncaissement.montantencaissement)} FCFA</small><br />
                <small><b>Reste : </b> {separate(currentEncaissement.resteencaissement)} FCFA</small><br />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row mb-2 d-flex justify-content-center">
              <TextField className="col mr-2" variant="filled" label="numero de bordereau" size="small" value={valueFacture}
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
                  setValueFacture(v)
                }} />
              <Autocomplete
                size="small"
                className="col p-0"
                id="AssuranceList1"
                defaultValue={{ value: currentEncaissement.assuranceencaissement, label: currentEncaissement.assuranceencaissement }}
                options={[{ value: "Tous", label: "Tous" }, ...listAssurances]}
                onChange={(event, newValue) => {
                  newValue && setassurance(newValue.label)
                  newValue && inputsearch.typeSejour.trim() !== "" &&
                    inputsearch.nomgarant.trim() !== "" &&
                    thunkListFacturesByAssurances({ ...inputsearch, nomassurance: newValue.label })
                }}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                renderInput={(params) => (<TextField {...params} variant="filled" label="Gestionnaire" placeholder="Ajouter ..." />)}
              />
              <Autocomplete
                size="small"
                id="AssuranceList2"
                className="col p-0 mx-2"
                defaultValue={{ value: "Tous", label: "Tous" }}
                options={[{ value: "Tous", label: "Tous" }, ...listAssurances]}
                onChange={(event, newValue) => {
                  newValue && setgarant(newValue.label)
                  newValue && inputsearch.typeSejour.trim() !== "" &&
                    inputsearch.nomassurance.trim() !== "" &&
                    thunkListFacturesByAssurances({ ...inputsearch, nomgarant: newValue.label })
                }}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                renderInput={(params) => (<TextField {...params} variant="filled" label="Garant" placeholder="Selectionner ..." />)}
              />
              <FormControl variant="filled" size="small" className="col">
                <InputLabel id="typesejour-label">Type de sejour </InputLabel>
                <Select
                  defaultValue="Tous"
                  labelId="typesejour-label"
                  id="typesejour"
                  onChange={({ target: { value } }) => {
                    settype(value)
                    inputsearch.nomassurance.trim() !== "" &&
                      inputsearch.nomgarant.trim() !== "" &&
                      thunkListFacturesByAssurances({ ...inputsearch, typeSejour: value })
                  }}
                  label="Type de sejour "
                  style={{ fontSize: "12px" }}
                >
                  <MenuItem style={{ fontSize: "12px" }} value={"Tous"}>Tous</MenuItem>
                  <MenuItem style={{ fontSize: "12px" }} value={"Consultation"}>Consultation</MenuItem>
                  <MenuItem style={{ fontSize: "12px" }} value={"Urgence"}>Urgence</MenuItem>
                  <MenuItem style={{ fontSize: "12px" }} value={"Biologie"}>Biologie</MenuItem>
                  <MenuItem style={{ fontSize: "12px" }} value={"Imagerie"}>Imagerie</MenuItem>
                  <MenuItem style={{ fontSize: "12px" }} value={"hospitalisation"}>Hospitalisation</MenuItem>
                  <MenuItem style={{ fontSize: "12px" }} value={"Soins"}>Soins</MenuItem>
                </Select>
              </FormControl>
              <div className="col">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                  <KeyboardDatePicker label='Du' id="datedebut" value={inputsearch.debutDate} defaultValue={new Date("2020-01-01")} format="dd/MM/yyyy" onChange={
                    (date) => {
                      setdebutDate(date)
                      thunkListFacturesByAssurances({
                        ...inputsearch,
                        debutDate: date,
                        debutDateString: moment(date.toString()).format('DD-MM-YYYY')
                      })
                    }
                  } />
                </MuiPickersUtilsProvider>
              </div>
              <div className="col">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                  <KeyboardDatePicker label='Au' id="datefin" value={inputsearch.finDate} defaultValue={new Date("2020-12-31")} format="dd/MM/yyyy" onChange={
                    (date) => {
                      setfinDate(date)
                      thunkListFacturesByAssurances({
                        ...inputsearch,
                        finDate: date,
                        finDateString: moment(date.toString()).format('DD-MM-YYYY')
                      })
                    }} />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>
          <table className="table-sm col-12 table-hover table-striped my-3">
            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
              <tr>
                {columnsFactures.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}
                {["Montant Total",
                  "Part Assu",
                  "Reste assurance",
                  "Part patient",].map((col, i) => (<th className="white-text text-right" key={i}>{col}</th>))}
              </tr>
            </thead>
            <tbody>
              {listFacturesByAssurance
                .filter(facture => facture.statutfacture === 'bordereau')
                .filter(facture => facture.resteassurancefacture > 0)
                .filter(facture => valueFacture.trim() === "" || RegExp(valueFacture, 'i').test(facture.numerobordereau))
                .map(({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour }, i) => (
                  <tr
                    key={i}
                    className={listFacturesVentiles.includes(numerofacture) ? "bgcolor-primary white-text" : ""}
                  >
                    <td>{i + 1}</td>
                    <td>{numerofacture}</td>
                    <td>{datefacture}</td>
                    <td>{heurefacture}</td>
                    <td className="font-weight-bold">{gestionnaire}</td>
                    <td className="font-weight-bold">{organisme}</td>
                    <td className="font-weight-bold">{typesejour}</td>
                    <td className="font-weight-bold">{numeropec}</td>
                    <td className="font-weight-bold">{matriculeassure}</td>
                    <td className="font-weight-bold">{taux}%</td>
                    <td className="font-weight-bold">{nompatient} {prenomspatient}</td>
                    <td className="font-weight-bold">{assureprinc}</td>
                    <td className="text-right">{separate(montanttotalfacture)}</td>
                    <td className="font-weight-bold text-right">{separate(partassurancefacture)}</td>
                    <td className="font-weight-bold text-right">{separate(resteassurancefacture)}</td>
                    <td className="text-right">{separate(partpatientfacture)}</td>
                    <td className={listFacturesVentiles.includes(numerofacture) ? "bgcolor-primary" : ""}>
                      <IconButton className={listFacturesVentiles.includes(numerofacture) ? "white-text" : ""} size="small" onClick={() => {
                        if (listFacturesVentiles.includes(numerofacture)) {
                          listFacturesVentiles.splice(listFacturesVentiles.indexOf(numerofacture), 1)
                          setListFacturesVentiles([...listFacturesVentiles])
                          settousSelectionner(false)
                        } else {
                          if ([...listFacturesVentiles, numerofacture].length === listFacturesByAssurance.filter(facture => facture.statutfacture === 'bordereau').length) {
                            settousSelectionner(true)
                          }
                          setListFacturesVentiles([...listFacturesVentiles, numerofacture])
                        }
                      }}>
                        <AssignmentTurnedInTwo />
                      </IconButton>
                    </td>
                    <td className="bg-warning">
                      <IconButton size="small" onClick={() => {
                        thunkDetailsFacture(numerofacture)
                      }}>
                        <AssignmentLateTwo />
                      </IconButton>
                    </td>
                  </tr>
                )
                )}
            </tbody>
          </table>
          {listFacturesByAssurance.filter(facture => facture.statutfacture === 'bordereau').length !== 0 &&
            <>
              <div onClick={() => {
                if (tousSelectionner) {
                  setListFacturesVentiles([])
                  settousSelectionner(false)
                } else {
                  setListFacturesVentiles(
                    listFacturesByAssurance
                      .filter(facture => facture.statutfacture === 'bordereau')
                      .map(facture => facture.numerofacture)
                  )
                  settousSelectionner(true)
                }
              }} style={{ display: "inline" }}>
                <Chip
                  className={`${tousSelectionner ? "bgcolor-secondaryDark text-white" : ""}`}
                  style={{ cursor: "pointer" }}
                  label="Tous selectionner"
                />
              </div>
              <Chip
                className="mx-2"
                label={`
                ${listFacturesVentiles.length} / ${listFacturesByAssurance
                    .filter(facture => facture.resteassurancefacture > 0)
                    .filter(facture => facture.statutfacture === 'bordereau')
                    .filter(facture => valueFacture.trim() === "" || RegExp(valueFacture, 'i').test(facture.numerobordereau)).length} Sélectionnée(s)`}
              />
              <Chip
                label={`${listFacturesVentiles.length !== 0 ?
                  listFacturesByAssurance
                    .filter(facture => facture.resteassurancefacture > 0)
                    .filter(facture => facture.statutfacture === 'bordereau')
                    .filter(facture => listFacturesVentiles.includes(facture.numerofacture))
                    .map(facture => facture.partassurancefacture)
                    .reduce((prev, cur) => prev + cur) : 0
                  } FCFA`}
              />
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            startIcon={<CancelIcon />}
            style={{
              textTransform: "none",
              fontSize: "12px",
            }}
          >
            Fermer
           </Button>
          <Button
            variant="contained"
            onClick={() => {
              //thunkSendFacturesRecues(listFacturesVentiles)
              handleClose()
            }}
            disabled={listFacturesVentiles.length === 0}
            startIcon={<AssignmentTurnedInIcon />}
            style={{
              textTransform: "none",
              backgroundColor: global.theme.primary,
              color: "white",
              fontSize: "12px",
            }}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        disableBackdropClick
        transitionDuration={0}
        open={modalFacture}
        onEntering={() => {
          setmodefacture({ target: { value: `Encaissement N° ${currentEncaissement.numeroencaissement}` } })
        }}
        onExited={() => {
          thunkListFacturesByAssurances({ ...inputsearch, nomassurance: currentEncaissement.assuranceencaissement })
        }}
        onClose={handlecloseFacture}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
          <b>Facture N° {currentFacture.numerofacture}</b>
          {currentFacture.resteassurancefacture === 0 && <><br /><small className="green-text font-weight-bold">(déjà payée)</small></>}
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row mx-1">
                <div className="col p-0">
                  <small><b>Patient : </b>{currentFacture.civilitepatient}{" "} {currentFacture.nompatient}{" "} {currentFacture.prenomspatient}</small><br />
                  <small>
                    <b>Montant Total</b> :{" "} {separate(currentFacture.montanttotalfacture)} FCFA
                  </small><br />
                  <small>
                    <b>Part Assurance</b> :{" "} {separate(currentFacture.partassurancefacture)} FCFA
                  </small><br />
                  <small>
                    <b>Reste à payer</b> :{" "}
                    <span className={currentFacture.restefacture < 0 && "flash animated infinite red-text font-weight-bold"}>
                      {separate(currentFacture.resteassurancefacture)} FCFA
                    </span>
                  </small><br />
                  <hr />
                  <small><b>Montant Encaissement : </b> {separate(currentEncaissement.montantencaissement)} FCFA</small><br />
                </div>
              </div>
              {currentFacture.resteassurancefacture !== 0 && (
                <>
                  <div className="row my-3 mx-1">
                    <TextField
                      className="col-12"
                      variant="filled"
                      size="small"
                      disabled={true}
                      label="Mode de paiement"
                      defaultValue={inputFacture.modepaiement}
                      value={inputFacture.modepaiement}
                    />
                    <TextField
                      className="col-12 mt-2"
                      variant="filled"
                      size="small"
                      type="number"
                      label="Montant recu"
                      value={inputFacture.montantrecu}
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
                        setmontantfacture({ target: { value: v } })
                      }}
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
            onClick={handlecloseFacture}
            style={{
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Annuler
          </Button>
          {currentFacture.resteassurancefacture !== 0 && <Button
            variant="contained"
            className="mb-2"
            disabled={
              inputFacture.modepaiement.trim() === "" ||
              inputFacture.montantrecu.trim() === "" ||
              parseInt(inputFacture.montantrecu.trim()) > parseInt(currentFacture.resteassurancefacture) ||
              (inputFacture.modepaiement === 'Compte' && parseInt(inputFacture.montantrecu.trim()) > parseInt(currentFacture.montantcompte)) ||
              (["Chèque", "Électronique", "Mobile money"].includes(inputFacture.modepaiement) && inputFacture.numeroTransaction.trim() === '')
            }
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const { encaissementReducer: { listEncaissement, listFacturesVentiles, listFacturesByAssurance, currentEncaissement, currentFacture, showModal, modalFacture }, } = state;
  return { listEncaissement, listFacturesVentiles, listFacturesByAssurance, currentEncaissement, currentFacture, showModal, modalFacture };
};

const EncaissementConnected = connect(mapStateToProps, {
  thunkAddEncaissement,
  thunkListEncaissement,
  thunkDetailsEncaissement,
  thunkDetailsFacture,
  thunkEncaisserFactures,
  thunkListFacturesByAssurances,
  setListFacturesByAssurance,
  setListFacturesVentiles,
  setModal,
  setModalFacture
})(Encaissement);
export default EncaissementConnected;
