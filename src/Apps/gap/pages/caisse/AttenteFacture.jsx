import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import { separate } from "../../../global/functions";
import {
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
  thunkSearchFacture,
  thunkDetailsFacture,
  setShowModal,
} from "../../api/caisse/factures";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
import { ScannerOutlined } from "@material-ui/icons";
import { socket } from "../../../global/apiQuery";
import {
  TextField,
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
  thunkSearchFacture,
  setShowModal,
}) => {
  const [value, setvalue] = useState("")
  const [inputs, setinput] = useState({
    modepaiement: "",
    montantrecu: "",
    numeroTransaction: ""
  });

  const handleClickOpen = (numeroFacture) => { thunkDetailsFacture(numeroFacture); };
  const handleClose = () => {
    setShowModal(false)
    setinput({
      modepaiement: "",
      montantrecu: "",
      numeroTransaction: ""
    })
  };
  function setmode({ target: { value } }) { setinput({ ...inputs, modepaiement: value }); }
  function setmontant({ target: { value } }) { setinput({ ...inputs, montantrecu: value }); }
  function setnumeroTransaction({ target: { value } }) { setinput({ ...inputs, numeroTransaction: value }); }
  function sendData(numeroFacture, patient) {
    thunkEncaisserFactures(numeroFacture, {
      ...inputs,
      compte: currentFacture.numerocompte,
      patient: patient
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
  ]

  const global = useContext(GlobalContext);
  useEffect(() => {
    thunkListFacturesAttentes();
    socket.on("facture_nouvelle", () => {
      thunkListFacturesAttentes();
    });
    socket.on("valid_paiement", (nof, montant) => {
      // thunkEncaisserFactures(nof,
      //   {
      //     modepaiement: "Compte",
      //     montantrecu: montant,
      //     compte: currentFacture.numerocompte,
      //   });
      setinput({ ...inputs, modepaiement: 'Compte', montantrecu: montant.toString() })
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
                .trim()
              setvalue(v)
              thunkSearchFacture(v)
            }}
          />
        </div>
      </div>

      <table className="col-12 table-sm table-sm table-hover table-striped">
        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
          <tr>
            {columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}
            {["Montant Total",
              "Part ASSU",
              "Reste ASSU",
              "Part Patient",
              "Reste Patient",].map((col, i) => (<th className="white-text text-right" key={i}>{col}</th>))}
          </tr>
        </thead>
        <tbody>
          {listFacturesAttentes
            .map(
              ({ civilitepatient, typesejour, numerofacture, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, restepatientfacture, statutfacture }, i) => (
                <tr key={i} style={{ cursor: "pointer" }} onClick={() => handleClickOpen(numerofacture)}>
                  <td className="font-weight-bold">{i + 1}</td>
                  <td className="font-weight-bold">{numerofacture}</td>
                  <td>{datefacture}</td>
                  <td>{heurefacture}</td>
                  <td className="font-weight-bold">{civilitepatient} {nompatient} {prenomspatient}</td>
                  <td>{typesejour}</td>
                  <td>{auteurfacture}</td>
                  <td className="text-right">{separate(montanttotalfacture)}</td>
                  <td className="text-right">{separate(partassurancefacture)}</td>
                  <td className="text-right">{separate(resteassurancefacture)}</td>
                  <td className="text-right">{separate(partpatientfacture)}</td>
                  <td className={`font-weight-bold text-right ${restepatientfacture < 0 && "flash animated infinite red-text font-weight-bold"}`}>
                    {separate(restepatientfacture)}
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
      <Dialog
        disableBackdropClick
        transitionDuration={0}
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
                <div className="col p-0">
                  <small><b>Patient : </b>{currentFacture.civilitepatient}{" "} {currentFacture.nompatient}{" "} {currentFacture.prenomspatient}</small><br />
                  <small>
                    <b>Montant Total</b> :{" "} {separate(currentFacture.montanttotalfacture)} FCFA
                  </small><br />
                  <small>
                    <b>Part du patient</b> :{" "} {separate(currentFacture.partpatientfacture)} FCFA
                  </small><br />
                  <small>
                    <b>Reste à payer</b> :{" "}
                    <span className={currentFacture.restefacture < 0 && "flash animated infinite red-text font-weight-bold"}>
                      {separate(currentFacture.restepatientfacture)} FCFA
                    </span>
                  </small><br />
                  {currentFacture.numerocompte !== null && (
                    <>
                      <hr className="bg-light" />
                      <small><b>N° compte : </b> {currentFacture.numerocompte}</small><br />
                      <small><b>Solde : </b> {separate(currentFacture.montantcompte)} FCFA</small>
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
                      label="Montant recu"
                      value={inputs.montantrecu}
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
                      className="col-12 mt-2"
                      variant="filled"
                      size="small"
                      label="Numero de Transaction"
                      value={inputs.numeroTransaction}
                      disabled={!["Chèque", "Électronique", "Mobile money"].includes(inputs.modepaiement)}
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
          <Button
            variant="contained"
            className="mb-2"
            startIcon={<ScannerOutlined />}
            onClick={() => { socket.emit('project_facture', currentFacture) }}
            style={{
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Projeter
          </Button>
          {currentFacture.restepatientfacture !== 0 && <Button
            variant="contained"
            className="mb-2"
            disabled={
              inputs.modepaiement.trim() === "" ||
              inputs.montantrecu.trim() === "" ||
              parseInt(inputs.montantrecu.trim()) > parseInt(currentFacture.restepatientfacture) ||
              (inputs.modepaiement === 'Compte' && parseInt(inputs.montantrecu.trim()) > parseInt(currentFacture.montantcompte)) ||
              (["Chèque", "Électronique", "Mobile money"].includes(inputs.modepaiement) && inputs.numeroTransaction.trim() === '')
            }
            onClick={() => sendData(currentFacture.numerofacture, currentFacture.nompatient + " " + currentFacture.prenomspatient)}
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

