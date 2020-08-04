import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GlobalContext from "../../../global/context";
import { header } from "../../../global/apiQuery";
import Axios from "axios";

import {
  thunkListComptes,
  thunkAddcompte,
  thunkSetCurrentCompte,
  setShowModal,
  thunkAddTransaction,
  thunkSearchCompte
} from "../../api/caisse/comptes";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { socket } from "../../../global/apiQuery";

import {
  TextField,
  Avatar,
  Chip,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";
import { separate } from "../../../global/functions";

const AttenteFacture = ({
  thunkSearchCompte,
  thunkListComptes,
  thunkAddcompte,
  setShowModal,
  thunkSetCurrentCompte,
  thunkAddTransaction,
  currentCompte,
  listComptes,
  showModal,
}) => {
  const [value, setValue] = useState("");
  const [ipp, setipp] = useState();
  const [openNewCompte, setOpenNewCompte] = useState(false);
  const [listPatients, setListPatients] = useState();
  const [inputs, setinput] = useState({ mode: "", montant: "", type: "", });

  function closeNewCompte() { setOpenNewCompte(false); setipp(""); }
  function createCompte() { thunkAddcompte(ipp); setOpenNewCompte(false); }
  function closeTransaction() { setinput({ mode: "", montant: "", type: "", }); setShowModal(false); }

  function setmode({ target: { value } }) { setinput({ ...inputs, mode: value }); }
  function settype({ target: { value } }) { setinput({ ...inputs, type: value }); }
  function setmontant({ target: { value } }) { setinput({ ...inputs, montant: value }); }

  const [columns] = useState([
    "N°",
    "Numero de compte",
    "Date",
    "Heure",
    "Patient",
    "Montant",
  ]);

  const global = useContext(GlobalContext);
  function validTransaction() {
    thunkAddTransaction(
      {
        ...inputs,
        montant:
          inputs.type === "Remboursement"
            ? -Math.abs(inputs.montant)
            : Math.abs(inputs.montant),
      },
      currentCompte.numerocompte
    );
    setinput({ mode: "", montant: "", type: "", });
  }
  useEffect(() => {
    Axios({
      url: `${header.url}/gap/list/patients_no_compte`,
    }).then(({ data: { rows } }) => {
      setListPatients(rows);
    });

    thunkListComptes();
    socket.on("facture_nouvelle", () => {
      thunkListComptes();
    });
  }, []);
  return (
    <div className="AttenteFacture row p-2">
      <div className="col-12">
        <div className="row mb-2">
          <TextField
            className="col-2"
            variant="outlined"
            size="small"
            label="Rechercher un compte"
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
              thunkSearchCompte(v.trim())
            }}
          />
          <div className="col-2">
            <Chip
              label="Comptes(s)"
              avatar={
                <Avatar
                  className="white-text"
                  style={{ backgroundColor: global.theme.primary }}
                >
                  {listComptes.length}
                </Avatar>
              }
            />
          </div>
          <div className="col d-flex justify-content-end p-0">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenNewCompte(true);
              }}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                color: "white",
                fontSize: "13px",
              }}
            >
              Nouveau compte
            </Button>
          </div>
        </div>
      </div>
      {listComptes.length === 0 ? (
        <div className="col-12 text-secondary text-center">
          <h6 className="text-center lead">Aucun compte existant</h6>
          <small>
            Pour en ajouter un cliquez sur le boutton 'Nouveau compte' puis
            renseignez les informations
          </small>
        </div>
      ) : (
          <table className="table-sm col-12 table-hover table-striped">
            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
              <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
            </thead>
            <tbody>
              {listComptes.map(
                ({ numerocompte, datecompte, heurecompte, nompatient, prenomspatient, civilitepatient, montantcompte, }, i) => (
                  <tr key={i} style={{ cursor: "pointer" }} onClick={() => thunkSetCurrentCompte(numerocompte)} >
                    <td>{i + 1}</td>
                    <td className="font-weight-bold">{numerocompte}</td>
                    <td>{datecompte}</td>
                    <td>{heurecompte}</td>
                    <td className="font-weight-bold">{civilitepatient} {nompatient} {prenomspatient}</td>
                    <td className="font-weight-bold">{separate(montantcompte)} FCFA</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      <Dialog
        open={openNewCompte}
        onClose={closeNewCompte}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        transitionDuration={0}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle
          className="text-center text-secondary"
          id="alert-dialog-title"
        >
          <b>Ajouter un nouveau compte</b>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row mx-1">
                <Autocomplete
                  size="small"
                  className="col-12"
                  id="listpatients"
                  options={listPatients}
                  onChange={(event, newValue) => { newValue ? setipp(newValue.ipppatient) : setipp(null) }}
                  getOptionLabel={(option) =>
                    `(${option.ipppatient}) ${option.nompatient.toLowerCase()} ${option.prenomspatient.toLowerCase()}`
                  }
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
                      label="Patient"
                      variant="outlined"
                      placeholder="Rechercher le patient ..."
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
            className="mb-2"
            startIcon={<CancelIcon />}
            onClick={closeNewCompte}
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
            onClick={createCompte}
            startIcon={<CheckCircleOutlineIcon />}
            disabled={!ipp}
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
        disableBackdropClick
        open={showModal}
        onClose={closeTransaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        transitionDuration={0}
        maxWidth="xs"
      >
        <DialogTitle
          className="text-center text-secondary"
          id="alert-dialog-title"
        >
          <b>Effectuer une transaction</b>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <small> <b>Patient : {" "} </b>{currentCompte.nompatient}{" "}{currentCompte.prenomspatient}</small><br />
              <small> <b>N° compte : {" "} </b>{currentCompte.numerocompte}</small><br />
              <small> <b>Solde : {" "} </b>{separate(currentCompte.montantcompte)} FCFA</small><br />
              <div className="row my-3 mx-1">
                <FormControl variant="outlined" size="small" className="col-12">
                  <InputLabel id="typesejour-label">Type</InputLabel>
                  <Select
                    labelId="typesejour-label"
                    id="typesejour"
                    value={inputs.type}
                    onChange={settype}
                    variant="filled"
                    label="Type"
                    style={{ fontSize: "13px" }}
                  >
                    <MenuItem style={{ fontSize: "13px" }} value={"Remboursement"}>Remboursement</MenuItem>
                    <MenuItem style={{ fontSize: "13px" }} value={"Dépot"}>Dépot</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="row my-3 mx-1">
                <FormControl
                  variant="outlined"
                  size="small"
                  className="col mr-2"
                >
                  <InputLabel id="typesejour-label">
                    Mode de paiement
                  </InputLabel>
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
                  className="col"
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
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="mb-2"
            startIcon={<CancelIcon />}
            onClick={closeTransaction}
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
            onClick={validTransaction}
            startIcon={<CheckCircleOutlineIcon />}
            disabled={inputs.mode.trim() === "" || inputs.type.trim() === "" || inputs.montant.trim() === ""}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    compteReducer: { listComptes, currentCompte, showModal },
  } = state;
  return { listComptes, currentCompte, showModal };
};

const AttenteFactureConnected = connect(mapStateToProps, {
  thunkListComptes,
  thunkAddcompte,
  thunkSetCurrentCompte,
  setShowModal,
  thunkAddTransaction,
  thunkSearchCompte
})(AttenteFacture);
export default AttenteFactureConnected;
