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
  function closeTransaction() { setinput({}); setShowModal(false); }

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

  function researching({ target: { value } }) { setValue(value); thunkSearchCompte(value.trim()); }
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
    setinput({});
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
            onChange={(ev) => researching(ev)}
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
                fontSize: "11px",
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
                    <td>{numerocompte}</td>
                    <td>{datecompte}</td>
                    <td>{heurecompte}</td>
                    <td>{civilitepatient} {nompatient} {prenomspatient}</td>
                    <td>{montantcompte} FCFA</td>
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
                  onChange={(event, newValue) => {
                    setipp(newValue.ipppatient);
                  }}
                  getOptionLabel={(option) =>
                    `(${
                    option.ipppatient
                    }) ${option.nompatient.toLowerCase()} ${option.prenomspatient.toLowerCase()}`
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
            disableElevation
            disableFocusRipple
            variant="contained"
            className="mb-2 bg-light"
            startIcon={<CancelIcon />}
            onClick={closeNewCompte}
            style={{
              textTransform: "none",
              fontSize: "11px",
            }}
          >
            Annuler
          </Button>
          <Button
            disableElevation
            disableFocusRipple
            variant="contained"
            className="mb-2"
            onClick={createCompte}
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
              <small>
                ({currentCompte.ipppatient}) {currentCompte.nompatient}{" "}
                {currentCompte.prenomspatient}
              </small>

              <div className="row my-3 mx-1">
                <FormControl variant="outlined" size="small" className="col-3">
                  <InputLabel id="typesejour-label">Type</InputLabel>

                  <Select
                    labelId="typesejour-label"
                    id="typesejour"
                    value={inputs.type}
                    onChange={settype}
                    label="Type"
                    style={{ fontSize: "11px" }}
                  >
                    <MenuItem
                      style={{ fontSize: "11px" }}
                      value={"Remboursement"}
                    >
                      Remboursement
                    </MenuItem>
                    <MenuItem style={{ fontSize: "11px" }} value={"Dépot"}>
                      Dépot
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  variant="outlined"
                  size="small"
                  className="col mx-2"
                >
                  <InputLabel id="typesejour-label">
                    Mode de paiement
                  </InputLabel>

                  <Select
                    labelId="typesejour-label"
                    id="typesejour"
                    value={inputs.mode}
                    onChange={setmode}
                    label="Mode de paiement"
                    style={{ fontSize: "11px" }}
                  >
                    <MenuItem style={{ fontSize: "11px" }} value={"Chèque"}>
                      Chèque
                    </MenuItem>
                    <MenuItem style={{ fontSize: "11px" }} value={"Espèces"}>
                      Espèces
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: "11px" }}
                      value={"Électronique"}
                    >
                      Électronique
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: "11px" }}
                      value={"Mobile money"}
                    >
                      Mobile money
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className="col-3"
                  type="number"
                  variant="outlined"
                  size="small"
                  label="Montant"
                  value={inputs.montant}
                  onChange={setmontant}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            disableFocusRipple
            variant="contained"
            className="mb-2 bg-light"
            startIcon={<CancelIcon />}
            onClick={closeTransaction}
            style={{
              textTransform: "none",
              fontSize: "11px",
            }}
          >
            Annuler
          </Button>
          <Button
            disableElevation
            disableFocusRipple
            variant="contained"
            className="mb-2"
            onClick={validTransaction}
            startIcon={<CheckCircleOutlineIcon />}
            style={{
              textTransform: "none",
              backgroundColor: global.theme.primary,
              color: "white",
              fontSize: "11px",
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
})(AttenteFacture);
export default AttenteFactureConnected;
