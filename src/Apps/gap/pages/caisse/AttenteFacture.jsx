import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import {
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
  thunkSearchFacture,
  thunkDetailsFacture,
  setShowModal,
} from "../../api/caisse/factures";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
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
  listFacturesAttentes,
  currentFacture,
  showModal,
  thunkListFacturesAttentes,
  thunkDetailsFacture,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
  thunkSearchFacture,
  setShowModal,
}) => {
  const [value, setValue] = useState("");
  const [inputs, setinput] = useState({
    modepaiement: "",
    montantrecu: "",
  });

  const handleClickOpen = (numeroFacture) => {
    thunkDetailsFacture(numeroFacture);
  };
  const handleClose = () => {
    setShowModal(false);
    setinput({});
  };
  function sendData(numeroFacture) {
    thunkEncaisserFactures(numeroFacture, {
      ...inputs,
      compte: currentFacture.numerocompte,
    });
    handleClose();
  }
  function setmode({ target: { value } }) {
    setinput({ ...inputs, modepaiement: value });
  }
  function setmontant({ target: { value } }) {
    setinput({ ...inputs, montantrecu: value });
  }

  const [columns] = useState([
    "N°",
    "Numero de facture",
    "Date",
    "Heure",
    "Patient",
    "Auteur",
    "Montant Total",
    "Part ASSU",
    "Reste ASSU",
    "Part Patient",
    "Reste Patient",
  ]);

  const global = useContext(GlobalContext);

  function researching({ target: { value } }) {
    setValue(value);
    thunkSearchFacture(value.trim());
  }

  useEffect(() => {
    thunkListFacturesAttentes();
    socket.on("facture_nouvelle", () => {
      thunkListFacturesAttentes();
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
            label="Rechercher une facture"
            value={value}
            onChange={(ev) => researching(ev)}
          />
          <div className="col">
            <Chip
              label="facture(s)"
              avatar={
                <Avatar
                  className="white-text"
                  style={{ backgroundColor: global.theme.primary }}
                >
                  {listFacturesAttentes.length}
                </Avatar>
              }
            />
          </div>
        </div>
      </div>
      {listFacturesAttentes.length === 0 ? (
        <div className="col-12 text-secondary text-center">
          <h6 className="text-center lead">Aucune facture en attente</h6>
          <small>
           Les factures sont générées lors de l'ajout d'un séjour
          </small>
        </div>
      ) : (
        <>
          <div className="col-12">
            <div className="row">
              <TableContainer component={Paper} elevation={0}>
                <Table aria-label="simple table" size="small">
                  <TableHead style={{ backgroundColor: global.theme.secondaryDark }}>
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
                    {listFacturesAttentes.map(
                      (
                        {
                          civilitepatient,
                          numerofacture,
                          datefacture,
                          heurefacture,
                          auteurfacture,
                          nompatient,
                          prenomspatient,
                          montanttotalfacture,
                          partassurancefacture,
                          resteassurancefacture,
                          partpatientfacture,
                          restepatientfacture,
                        },
                        i
                      ) => (
                        <TableRow
                          key={i}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClickOpen(numerofacture)}
                        >
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                            component="th"
                            scope="row"
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {numerofacture}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {datefacture}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {heurefacture}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {civilitepatient} {nompatient} {prenomspatient}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {auteurfacture}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {montanttotalfacture} FCFA
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {partassurancefacture} FCFA
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {resteassurancefacture} FCFA
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {partpatientfacture} FCFA
                          </TableCell>
                          <TableCell
                            className={
                              restepatientfacture < 0 &&
                              "flash animated infinite red-text font-weight-bold"
                            }
                            align="center"
                            style={{ fontSize: "11px" }}
                          >
                            {restepatientfacture} FCFA
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle className="text-center" id="alert-dialog-title">
          <b>Facture N° {currentFacture.numerofacture}</b>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row mx-1">
                <div className="col-12">
                  <h2 className="lead text-center">
                    {currentFacture.civilitepatient} {currentFacture.nompatient}{" "}
                    {currentFacture.prenomspatient}
                  </h2>
                </div>
                <div className="col-6 p-0">
                 
                  <small>
                    <b>Reste à payer</b> :{" "}
                    <span
                      className={
                        currentFacture.restefacture < 0 &&
                        "flash animated infinite red-text font-weight-bold"
                      }
                    >
                      {currentFacture.restepatientfacture} FCFA
                    </span>
                  </small>
                  <br />
                  {currentFacture.numerocompte !== null && (
                    <>
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
                <div className="col-6 text-right"></div>
              </div>
              {currentFacture.restefacture !== 0 && (
                <div className="row my-3 mx-1">
                  <FormControl variant="outlined" size="small" className="col">
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
                    variant="outlined"
                    size="small"
                    type="number"
                    max={10}
                    label="Montant recu"
                    value={inputs.montantrecu}
                    onChange={setmontant}
                  />
                </div>
              )}
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
              fontSize: "13px",
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            className="mb-2"
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
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    factureReducer: { listFacturesAttentes, currentFacture, showModal },
  } = state;
  return { listFacturesAttentes, currentFacture, showModal };
};

const AttenteFactureConnected = connect(mapStateToProps, {
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
  thunkSearchFacture,
  thunkDetailsFacture,
  setShowModal,
})(AttenteFacture);
export default AttenteFactureConnected;
