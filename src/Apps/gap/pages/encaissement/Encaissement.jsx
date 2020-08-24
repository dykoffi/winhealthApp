import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GlobalContext from "../../../global/context";
import { header } from "../../../global/apiQuery";
import Axios from "axios";

import {
  thunkAddEncaissement,
  thunkListEncaissement
} from "../../api/encaissement/encaissements";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { socket } from "../../../global/apiQuery";

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
import { separate } from "../../../global/functions";

const Encaissement = ({
  listEncaissement,
  thunkAddEncaissement,
  thunkListEncaissement
}) => {
  const global = useContext(GlobalContext);
  const [value, setValue] = useState("");
  const [openEncaissement, setOpenEncaissement] = useState(false);
  const [inputs, setinput] = useState({ mode: "", montant: "", assurance: "", numeroTransaction: "" });
  const [listAssurances, setListAssurance] = useState([]);


  function setmode({ target: { value } }) { setinput({ ...inputs, mode: value }); }
  function setmontant({ target: { value } }) { setinput({ ...inputs, montant: value }); }
  function setnumeroTransaction({ target: { value } }) { setinput({ ...inputs, numeroTransaction: value }); }
  function setassurance(value) { setinput({ ...inputs, assurance: value }); }
  function closeEncaissement() {
    setinput({ mode: "", montant: "", assurance: "", numeroTransaction: "" })
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
  ]);

  useEffect(() => {
    thunkListEncaissement()
    Axios({ url: `${header.url}/gap/list/assurances` }).then(({ data: { rows } }) => {
      const Assurance = [];
      rows.forEach(({ idassurance, nomassurance }) => { Assurance.push({ value: idassurance, label: nomassurance }); });
      setListAssurance(Assurance);
    });
  }, []);
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
                  ({ numeroencaissement, dateencaissement, heureencaissement, modepaiementencaissement, assuranceencaissement, recepteurencaissement, montantencaissement, }, i) => (
                    <>
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td className="font-weight-bold">{numeroencaissement}</td>
                        <td>{assuranceencaissement}</td>
                        <td>{modepaiementencaissement}</td>
                        <td>{dateencaissement}</td>
                        <td>{heureencaissement}</td>
                        <td className="font-weight-bold">{recepteurencaissement}</td>
                        <td className="font-weight-bold">{separate(montantencaissement)}</td>
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
            <div className="col-12">
              <div className='row'>
                <Autocomplete
                  size="small"
                  className="col p-0"
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
                  className="col ml-2"
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

              </div>
              <div className="row my-2">
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
                <TextField
                  className="col ml-2"
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
              </div>
            </div>
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
      </Dialog >
    </div >
  );
};

const mapStateToProps = (state) => {
  const { encaissementReducer: { listEncaissement }, } = state;
  return { listEncaissement };
};

const EncaissementConnected = connect(mapStateToProps, {
  thunkAddEncaissement,
  thunkListEncaissement
})(Encaissement);
export default EncaissementConnected;
