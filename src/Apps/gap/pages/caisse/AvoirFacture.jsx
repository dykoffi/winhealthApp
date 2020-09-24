import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import { separate } from "../../../global/functions";
import {
  thunkListAvoirFactures,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
  thunkSearchFacture,
  thunkDetailsFacture,
  setShowModal,
  setCurrentFacture,
  thunkAddAvoirFacture
} from "../../api/caisse/factures";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
import { header } from "../../../global/apiQuery";
import {
  TextField,
  Avatar,
  Chip,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
  Button,
} from "@material-ui/core";
import Axios from "axios";

const AvoirFacture = ({
  currentFacture,
  showModal,
  thunkListAvoirFactures,
  thunkDetailsFacture,
  thunkSearchFacture,
  setShowModal,
  setCurrentFacture,
  listFactures,
  thunkAddAvoirFacture
}) => {
  const [value, setValue] = useState("");
  const [listImpFactures, setListImpFactures] = useState([])
  const [inputs, setinput] = useState({
    facture: "",
    montant: "",
    commentaire: "",
  });

  const handleClose = () => {
    setShowModal(false)
    setinput({ commentaire: "", montant: "", facture: "" })
    setCurrentFacture({})
  };
  function setmontant(value) { setinput({ ...inputs, montant: value }); }
  function setfacture(value) { setinput({ ...inputs, facture: value }); }
  function setcommentaire({ target: { value } }) { setinput({ ...inputs, commentaire: value }); }

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
    thunkListAvoirFactures();
    setCurrentFacture({})
    Axios({ url: `${header.url}/gap/list/factures`, }).then(({ data: { rows } }) => {
      const Factures = [];
      rows
        .filter(facture => facture.restepatientfacture !== 0 && facture.parentfacture.trim() === "" && facture.typefacture === "original")
        .forEach(({ numerofacture }) => { Factures.push({ numero: numerofacture }); });
      setListImpFactures(Factures);
    });
  }, []);
  return (
    <div className="AvoirFacture row p-2">
      <div className="col-12">
        <div className="row mb-2">
          <TextField
            className="col-2"
            variant="outlined"
            size="small"
            label="Rechercher une facture d'avoir"
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
          <div className="col">
            <Chip
              label={`${listFactures.length} Facture(s)`}
            
            />
          </div>
          <div className="col d-flex justify-content-end p-0">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setShowModal(true);
              }}
              style={{
                textTransform: "none",
                backgroundColor: global.theme.primary,
                color: "white",
                fontSize: "13px",
              }}
            >
              Nouvelle facture d'avoir
            </Button>
          </div>
        </div>
      </div>
      {listFactures
        .filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture))
        .length === 0 ? (
          <div className="col-12 text-secondary text-center">
            <h6 className="text-center lead">Aucune facture d'avoir</h6>
          </div>
        ) : (
          <table className="col-12 table-sm table-sm table-hover table-striped">
            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
              <tr>
                {columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}
                {["Montant Total",
                  "Part ASSU",
                  "Reste ASSU",
                  "Part Patient",
                  "Reste Patient",
                  "Facture parent"].map((col, i) => (<th className="white-text text-right" key={i}>{col}</th>))}
              </tr>
            </thead>
            <tbody>
              {listFactures
                .filter(facture => facture.typefacture === "avoir")
                .map(
                  ({ civilitepatient, typesejour, numerofacture, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, restepatientfacture, parentfacture, commentairefacture }, i) => (
                    <tr key={i} style={{ cursor: "default" }} title={commentairefacture}>
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
                      <td className="font-weight-bold text-info text-right">{parentfacture}</td>
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
        transitionDuration={0}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
          <b>Nouvelle facture d'avoir</b>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row mx-1">
                <div className="col p-0">
                  <small><b>Patient : </b>{currentFacture.nompatient}{" "} {currentFacture.prenomspatient}</small><br />
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

                </div>
              </div>
              {currentFacture.restepatientfacture !== 0 && (
                <>
                  <div className="row my-3 mx-1">
                    <Autocomplete
                      size="small"
                      className="col p-0"
                      id="FactureList"
                      options={listImpFactures}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setfacture(newValue.numero)
                          thunkDetailsFacture(newValue.numero)
                        }
                        else {
                          setCurrentFacture({})
                          setinput({ montant: "", facture: "", commentairefacture: "" })
                        }



                      }}
                      getOptionLabel={(option) => option.numero}
                      filterSelectedOptions
                      renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.numero}</small></>)}
                      renderInput={(params) => (<TextField {...params} variant="filled" label="Facture" placeholder="Selectionner ..." />)}
                    />
                    <TextField
                      className="col-7 ml-2"
                      variant="filled"
                      size="small"
                      type="number"
                      label="Montant"
                      defaultValue={currentFacture.restepatientfacture}
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
                        setmontant(v)
                      }}
                    />
                  </div>
                  <div className="row my-3 mx-1">
                    <TextField
                      style={{ fontSize: "12px" }}
                      className="col-12"
                      variant="outlined"
                      size="small"
                      multiline
                      rows={4}
                      label="Commentaire"
                      // defaultValue={currentFacture.commentairefacture}
                      onChange={setcommentaire}
                    />
                  </div>
                  <div className="col-12 d-flex">
                    <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                    <small className="font-weight-bold">Renseignez tous les champs néccessaires pour la création d'une facture d'avoir</small>
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
            disabled={
              inputs.montant.trim() === "" ||
              parseInt(inputs.montant.trim()) > parseInt(currentFacture.restepatientfacture) ||
              inputs.facture.trim() === ""
            }
            onClick={() => thunkAddAvoirFacture(currentFacture.numerofacture, inputs)}
            startIcon={<CheckCircleOutlineIcon />}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    factureReducer: { listFactures, currentFacture, showModal },
  } = state;
  return { listFactures, currentFacture, showModal };
};

const AvoirFactureConnected = connect(mapStateToProps, {
  thunkListAvoirFactures,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
  thunkSearchFacture,
  thunkDetailsFacture,
  setShowModal,
  setCurrentFacture,
  thunkAddAvoirFacture
})(AvoirFacture);
export default AvoirFactureConnected;

