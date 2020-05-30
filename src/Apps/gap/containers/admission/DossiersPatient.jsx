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
import {
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
  thunkCurrentFacture,
} from "../../api/admission/sejour";
import { connect } from "react-redux";
import Axios from "axios";
import QR from "qrcode.react";
import Facture from "../../documents/Facture";
import {
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import GlobalContext, { Info } from "../../../global/context";
import { withStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";

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
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [openControle, setOpenControle] = useState(false);
  const [inputs, setinput] = useState({
    debutDate: new Date(),
    finDate: new Date(),
    DebutHeure: new Date(),
    finHeure: new Date(),
  });
  const [listActes, setListActe] = useState([]);
  const [actes, setActes] = useState([]);

  const global = useContext(GlobalContext);

  function setdebutDate(value) {
    setinput({ ...inputs, debutDate: value });
  }
  function setfinDate(value) {
    setinput({ ...inputs, finDate: value });
  }

  function setDebutHeure(value) {
    setinput({ ...inputs, DebutHeure: value });
  }
  function setfinHeure(value) {
    setinput({ ...inputs, finHeure: value });
  }
  function settype({ target: { value } }) {
    setinput({ ...inputs, type: value });
  }
  function setmedecin({ target: { value } }) {
    setinput({ ...inputs, medecin: value });
  }

  function setgestionnaireAssure({ target: { value } }) {
    setinput({ ...inputs, gestionnaireAssure: value });
  }
  function setgarantAssure({ target: { value } }) {
    setinput({ ...inputs, garantAssure: value });
  }
  function setbeneficiaireAssure({ target: { value } }) {
    setinput({ ...inputs, beneficiaireAssure: value });
  }
  function setidentiteAssure({ target: { value } }) {
    setinput({ ...inputs, identiteAssure: value });
  }
  function setmatriculeAssure({ target: { value } }) {
    setinput({ ...inputs, matriculeAssure: value });
  }
  function setnumeroPECAssure({ target: { value } }) {
    setinput({ ...inputs, numeroPECAssure: value });
  }
  function settauxAssure({ target: { value } }) {
    setinput({ ...inputs, tauxAssure: value });
  }

  const handleClickOpen = () => {
    setDisabled(false);
    setOpen(true);
  };

  const handleClose = () => {
    setinput({});
    setOpen(false);
  };
  const closeControle = () => {
    setOpenControle(false);
  };
  function sendDTata() {
    setOpen(false);
    thunkAddSejour({ ...inputs, actes: actes }, currentPatient.iddossier);
    setinput({});
  }

  useEffect(() => {
    Axios({
      url: `${header.url}/gap/list/actes`,
    }).then(({ data: { rows } }) => {
      const actes = [];
      rows.forEach(({ codeacte, libelleacte }) => {
        actes.push({ value: codeacte, label: libelleacte });
      });
      setListActe(actes);
    });
  }, []);

  useEffect(() => {
    thunkListSejour(currentPatient.iddossier);
    thunkCurrentFacture(currentPatient.iddossier);
  }, [currentPatient.iddossier]);
  const [columns] = useState([
    "N°",
    "Date de début",
    "Date de fin",
    "Heure de début",
    "Heure de fin",
    "Type de séjour",
    "Statut du séjour",
  ]);
  return (
    <div className="DossiersPatient row p-3">
      {currentSejour !== null ? (
        <div className="col-12 white text-secondary mb-2">
          <div className="row">
            <div className="col-10 p-0">
              <div className="row" style={{ fontSize: "14px" }}>
                <div className="col-4">
                  <small>
                    <b>Numero du sejour :</b> {currentSejour.numerosejour}
                  </small>
                  <br />
                  <small>
                    <b>Date de debut :</b> {currentSejour.datedebutsejour}
                  </small>
                  <br />
                  <small>
                    <b>Heure de debut :</b> {currentSejour.heuredebutsejour}
                  </small>
                  <br />
                  <small>
                    <b>Date de fin :</b> {currentSejour.datefinsejour}
                  </small>
                  <br />
                  <small>
                    <b>Heure de fin :</b> {currentSejour.heurefinsejour}
                  </small>
                  <br />
                  <small>
                    <b>Type du séjour :</b> {currentSejour.typesejour}
                  </small>
                </div>
                <div className="col-4">
                  <small>
                    <b>Gestionnaire :</b> ASCOMA
                  </small>
                  <br />
                  <small>
                    <b>Garant :</b> ALIANZ
                  </small>
                  <br />
                  <small>
                    <b>Béneficiaire :</b> L'assuré
                  </small>
                  <br />
                  <small>
                    <b>Assuré Principal :</b> KOFFI EDY
                  </small>
                  <br />
                  <small>
                    <b>N° Matricule :</b> mp859moh
                  </small>
                  <br />
                  <small>
                    <b>N° Prise en charge :</b> 154m
                  </small>
                </div>
                <div className="col-4">
                  <small>
                    <b>N° Facture :</b> {currentSejour.numerofacture}
                  </small>
                  <br />
                  <small>
                    <b>Date :</b> {currentSejour.datefacture}
                  </small>
                  <br />
                  <small>
                    <b>Heure :</b> {currentSejour.heurefacture}
                  </small>
                  <br />
                  <small>
                    <b>Montant Total :</b> {currentSejour.montanttotalfacture}{" "}
                    FCFA
                  </small>
                  <br />
                  <small>
                    <b>Taux d'exoneration :</b> 80%
                  </small>
                  <br />
                  <small>
                    <b>Reste à payer :</b>{" "}
                    <span
                      className={
                        currentSejour.restefacture < 0 &&
                        "flash animated infinite red-text font-weight-bold"
                      }
                    >
                      {" "}
                      {currentSejour.restefacture} FCFA
                    </span>
                  </small>
                </div>
              </div>
            </div>
            <div className="col-2">
              <QR
                value={`${header.url}/gap/verify/facture/${currentSejour.idfacture}`}
                id="img"
                fgColor="#696969"
                style={{transform:'scale(0.8)'}}
                includeMargin={true}
              />
            </div>
          </div>
          <div className="row mt-2">
            <Button disableElevation
              variant="contained"
              className="mr-2"
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
            {2 - currentSejour.nbcontrole > 0 && (
              <Button disableElevation
                variant="contained"
                className="mr-2"
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

            <div className="col-3">
              {/* <Facture
                //patient
                nompatient={currentSejour.nompatient}
                prenomspatient={currentSejour.prenomspatient}
                datenaissancepatient={currentSejour.datenaissancepatient}
                lieunaissancepatient={currentSejour.lieunaissancepatient}
                ipppatient={currentSejour.ipppatient}
                lieunaissance={currentSejour.lieunaissance}
                habitationpatient={currentSejour.habitationpatient}
                //facture
                numerofacture={currentSejour.numerofacture}
                datefacture={currentSejour.datefacture}
                heurefacture={currentSejour.heurefacture}
                auteurfacture={currentSejour.auteurfacture}
                code={`${header.url}/gap/verify/facture/${currentSejour.idfacture}`}
                //sejour
                datedebutsejour={currentSejour.datedebutsejour}
                datefinsejour={currentSejour.datefinsejour}
                heuredebutsejour={currentSejour.heuredebutsejour}
                heurefinsejour={currentSejour.heurefinsejour}
                typesejour={currentSejour.typesejour}
                //acte
                libelleacte={currentSejour.libelleacte}
                prixacte={currentSejour.montanttotalfacture}
              /> */}
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="contained"
          className="mb-2"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
          style={{
            textTransform: "none",
            backgroundColor: global.theme.primary,
            color: "white",
            fontSize: "11px",
          }}
        >
          Nouveau séjour
        </Button>
      )}
      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="simple table" size="small">
          <TableHead style={{ backgroundColor: global.theme.primary }}>
            <TableRow>
              {columns.map((col, i) => (
                <TableCell
                  align="center"
                  style={{ fontSize: "11px", color: "white" }}
                  key={i}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listSejour.map(
              (
                {
                  datedebutsejour,
                  datefinsejour,
                  heuredebutsejour,
                  heurefinsejour,
                  typesejour,
                  statussejour,
                  idsejour,
                  numerosejour,
                },
                i
              ) => (
                <TableRow
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => thunkDetailsSejour(idsejour, numerosejour)}
                  className={
                    currentSejour &&
                    currentSejour.idsejour === idsejour &&
                    "grey lighten-3"
                  }
                >
                  <TableCell
                    align="center"
                    style={{ fontSize: "11px" }}
                    component="th"
                    scope="row"
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "11px" }}>
                    {datedebutsejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "11px" }}>
                    {datefinsejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "11px" }}>
                    {heuredebutsejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "11px" }}>
                    {heurefinsejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "11px" }}>
                    {typesejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "11px" }}>
                    {statussejour}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="col-12 mt-4">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogTitle className="text-center" id="alert-dialog-title">
            <small className="font-weight-bold">
              Ajouter un nouveau sejour
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
                      onChange={setfinHeure}
                      className="m-1 col"
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="row mx-1 my-2">
                  <FormControl variant="outlined" size="small" className="col">
                    <InputLabel id="typesejour-label">
                      Type de sejour
                    </InputLabel>
                    <Select
                      labelId="typesejour-label"
                      id="typesejour"
                      value={inputs.type}
                      onChange={settype}
                      label="Type de sejour"
                      style={{ fontSize: "11px" }}
                    >
                      <MenuItem
                        style={{ fontSize: "11px" }}
                        value={"consultation"}
                      >
                        Consultation
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={"urgence"}>
                        Urgence
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={"biologie"}>
                        Biologie
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={"imagerie"}>
                        Imagerie
                      </MenuItem>
                      <MenuItem
                        style={{ fontSize: "11px" }}
                        value={"hospitalisation"}
                      >
                        Hospitalisation
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={"soins"}>
                        Soins
                      </MenuItem>
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
                      style={{ fontSize: "11px" }}
                    >
                      <MenuItem style={{ fontSize: "11px" }} value={1}>
                        KOFFI Edy
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={2}>
                        N'DONGO Abdoulaye
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={3}>
                        GBADJE Wilfried
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={4}>
                        ZAKI Audrey
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="row my-3 mx-1">
                  <Autocomplete
                    multiple
                    size="small"
                    className="col-12"
                    id="actesList"
                    options={listActes}
                    onChange={(event, newValue) => {
                      setActes(newValue.map((elt) => elt.value));
                    }}
                    getOptionLabel={(option) => option.label}
                    filterSelectedOptions
                    renderOption={(option) => (
                      <>
                        <small>{option.label}</small>
                      </>
                    )}
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
                <div className="row mx-1 my-2">
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="m-1 col"
                  >
                    <InputLabel id="assurance-label">Gestionnaire</InputLabel>
                    <Select
                      labelId="assurance-label"
                      id="assurance"
                      label="Gestionnaire"
                      value={inputs.assurance}
                      onChange={setgestionnaireAssure}
                      style={{ fontSize: "11px" }}
                    >
                      <MenuItem style={{ fontSize: "11px" }} value={"sgbci"}>
                        SGBCI
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={"nsia"}>
                        NSIA
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="m-1 col"
                  >
                    <InputLabel id="assurance-label">Garant</InputLabel>
                    <Select
                      labelId="assurance-label"
                      id="assurance"
                      label="Garant"
                      value={inputs.assurance}
                      onChange={setgarantAssure}
                      style={{ fontSize: "11px" }}
                    >
                      <MenuItem style={{ fontSize: "11px" }} value={"sgbci"}>
                        SGBCI
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={"nsia"}>
                        NSIA
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="row mx-1 my-2">
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="m-1 col"
                  >
                    <InputLabel id="assurance-label">Bénéficiaire</InputLabel>
                    <Select
                      labelId="assurance-label"
                      id="assurance"
                      label="Bénéficiaire"
                      value={inputs.beneficiaire}
                      onChange={setbeneficiaireAssure}
                      style={{ fontSize: "11px" }}
                    >
                      <MenuItem style={{ fontSize: "11px" }} value={"assuré"}>
                        L'assuré
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={"enfant"}>
                        L'enfant
                      </MenuItem>
                      <MenuItem
                        style={{ fontSize: "11px" }}
                        value={"conjoint(e)"}
                      >
                        Le/La conjoint(e)
                      </MenuItem>
                      <MenuItem
                        style={{ fontSize: "11px" }}
                        value={"ayant droit"}
                      >
                        L'ayant droit
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Input
                    className="m-1 col-7"
                    variant="outlined"
                    size="small"
                    label="Identité de l'Assuré"
                    value={inputs.identiteAssure}
                    onChange={setidentiteAssure}
                  />
                </div>
                <div className="row mx-1 my-2">
                  <Input
                    className="m-1 col-4"
                    variant="outlined"
                    size="small"
                    label="Matricule"
                    value={inputs.matriculeAssure}
                    onChange={setmatriculeAssure}
                  />
                  <Input
                    className="m-1 col-4"
                    variant="outlined"
                    size="small"
                    label="N° PEC"
                    value={inputs.numeroPECAssure}
                    onChange={setnumeroPECAssure}
                  />
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="m-1 col"
                  >
                    <InputLabel id="assurance-label">Taux</InputLabel>
                    <Select
                      labelId="assurance-label"
                      id="assurance"
                      label="Taux"
                      value={inputs.tauxAssurance}
                      onChange={settauxAssure}
                      style={{ fontSize: "11px" }}
                    >
                      <MenuItem style={{ fontSize: "11px" }} value={70}>
                        70%
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={80}>
                        80%
                      </MenuItem>
                      <MenuItem style={{ fontSize: "11px" }} value={100}>
                        100%
                      </MenuItem>
                    </Select>
                  </FormControl>
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
              onClick={() => {
                setDisabled(true);
                sendDTata();
              }}
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
    </div>
  );
};
const mapStatetoProps = (state) => {
  const {
    detailsPatientReducer: { currentPatient },
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
