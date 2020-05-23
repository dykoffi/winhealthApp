import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import Facture from '../../documents/Facture'
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
import GlobalContext from "../../../global/context";

import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setinput({});
    setOpen(false);
  };
  function sendDTata() {
    thunkAddSejour({ ...inputs, actes: actes }, currentPatient.iddossier);
    setinput({});
    setOpen(false);
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
            <div className="col-7">
              <div className="row">
                <div className="col-6">
                  <small>
                    <b>Numero du sejour:</b> {currentSejour.numerosejour}
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
                <div className="col-6">
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
                    <b>Montant Total:</b> {currentSejour.montanttotalfacture} FCFA
                  </small>
                  <br />
                  <small>
                    <b>Reste à payer :</b> {currentSejour.restefacture} FCFA
                  </small>
                  <br />
                </div>
              </div>
            </div>
            <div className="col-2 offset-3">
              <QR
                value={`${header.url}/gap/verify/facture/${currentSejour.idfacture}`}
                id="img"
                fgColor="#696969"
                includeMargin={true}
              />
            </div>
          </div>
          <div className="row mt-2">
            <Button
              variant="contained"
              className="mr-2"
              onClick={handleClickOpen}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                color: "white",
              }}
            >
              Nouveau séjour
            </Button>
            <div className="col-3">
               <Facture
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
              />
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="contained"
          className="mb-2"
          onClick={handleClickOpen}
          style={{
            textTransform: "none",
            backgroundColor: global.theme.primary,
            color: "white",
          }}
        >
          Nouveau séjour
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead style={{ backgroundColor: global.theme.secondaryDark }}>
            <TableRow>
              {columns.map((col, i) => (
                <TableCell align="center" style={{ fontSize: "14px", color: "white" }} key={i}>
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
                },
                i
              ) => (
                <TableRow
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => thunkDetailsSejour(idsejour)}
                  className={
                    currentSejour &&
                    currentSejour.idsejour === idsejour &&
                    "grey lighten-4"
                  }
                >
                  <TableCell align="center"
                    style={{ fontSize: "13px" }}
                    component="th"
                    scope="row"
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "13px" }}>
                    {datedebutsejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "13px" }}>
                    {datefinsejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "13px" }}>
                    {heuredebutsejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "13px" }}>
                    {heurefinsejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "13px" }}>
                    {typesejour}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "13px" }}>
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
          <DialogTitle
            className="text-center text-secondary"
            id="alert-dialog-title"
          >
            <b>Ajouter un nouveau sejour</b>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12">
                <div className="row mx-1 my-3">
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
                <div className="row mx-1 my-3">
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
                <div className="row mx-1 my-3">
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
                      style={{ fontSize: "13px" }}
                    >
                      <MenuItem
                        style={{ fontSize: "13px" }}
                        value={"consultation"}
                      >
                        Consultation
                      </MenuItem>
                      <MenuItem style={{ fontSize: "13px" }} value={"urgence"}>
                        Urgence
                      </MenuItem>
                      <MenuItem style={{ fontSize: "13px" }} value={"biologie"}>
                        Biologie
                      </MenuItem>
                      <MenuItem style={{ fontSize: "13px" }} value={"imagerie"}>
                        Imagerie
                      </MenuItem>
                      <MenuItem
                        style={{ fontSize: "13px" }}
                        value={"hospitalisation"}
                      >
                        Hospitalisation
                      </MenuItem>
                      <MenuItem style={{ fontSize: "13px" }} value={"soins"}>
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
                      style={{ fontSize: "13px" }}
                    >
                      <MenuItem style={{ fontSize: "13px" }} value={1}>
                        KOFFI Edy
                      </MenuItem>
                      <MenuItem style={{ fontSize: "13px" }} value={2}>
                        N'DONGO Abdoulaye
                      </MenuItem>
                      <MenuItem style={{ fontSize: "13px" }} value={3}>
                        GBADJE Wilfried
                      </MenuItem>
                      <MenuItem style={{ fontSize: "13px" }} value={4}>
                        ZAKI Audrey
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="row my-3">
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
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="mb-2 bg-light"
              onClick={handleClose}
              style={{
                textTransform: "none",
              }}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              className="mb-2"
              onClick={sendDTata}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                color: "white",
              }}
            >
              Generer la facture
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
