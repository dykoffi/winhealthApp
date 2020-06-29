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
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
import { socket, header } from "../../../global/apiQuery";
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
  const [projection, setprojection] = useState(false)
  const [value, setValue] = useState("");
  const [inputs, setinput] = useState({
    modepaiement: "",
    montantrecu: "",
  });

  const handleClickOpen = (numeroFacture) => { thunkDetailsFacture(numeroFacture); };
  const handleClose = () => {
    setprojection(false)
    setShowModal(false)
    setinput({ modepaiement: "", montantrecu: "", })
  };
  function setmode({ target: { value } }) { setinput({ ...inputs, modepaiement: value }); }
  function setmontant({ target: { value } }) { setinput({ ...inputs, montantrecu: value }); }
  function project() {
    socket.emit("project_facture", currentFacture)
    projection ? setprojection(false) : setprojection(true);
  }
  function sendData(numeroFacture) {
    thunkEncaisserFactures(numeroFacture, {
      ...inputs,
      compte: currentFacture.numerocompte,
    });
    handleClose();
  }
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
  function researching({ target: { value } }) { setValue(value); thunkSearchFacture(value.trim()); }

  useEffect(() => {
    thunkListFacturesAttentes();
    socket.on("facture_nouvelle", () => {
      thunkListFacturesAttentes();
    });
    socket.on("valid_paiement", (nof, montant) => {
      thunkEncaisserFactures(nof,
        {
          modepaiement: "Compte",
          montantrecu: montant,
          compte: currentFacture.numerocompte,
        });
      handleClose();
    })
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
          <table className="col-12 table-sm table-sm table-hover table-striped">
            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
              <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
            </thead>
            <tbody>
              {listFacturesAttentes.map(
                ({ civilitepatient, typesejour, numerofacture, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, restepatientfacture, }, i) => (
                  <tr key={i} style={{ cursor: "pointer" }} onClick={() => handleClickOpen(numerofacture)}>
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
                    <td className={`font-weight-bold ${restepatientfacture < 0 && "flash animated infinite red-text font-weight-bold"}`}>
                      {restepatientfacture} FCFA
                      </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      <Dialog
        open={showModal}
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
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
                <div className="col-6 p-0">
                  <small><b>Patient : </b>{currentFacture.civilitepatient}{" "} {currentFacture.nompatient}{" "} {currentFacture.prenomspatient}<br /></small>
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
                <div className="col-6 text-right"></div>
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
            className={`mb-2 ${projection && "red text-white"}`}
            startIcon={<DesktopWindowsIcon />}
            onClick={() => {
              project();
            }}
            style={{
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            projeter
          </Button>
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

