import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import {
  thunkAddAssurance,
  thunkListAssurances,
  thunkDeleteAssurance,
  thunkUpdateAssurance,
  thunkDetailsAssurance,
  thunkSearchAssurance,
  setShowModalDetails
} from "../../api/assurance/assurances";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import AddIcon from '@material-ui/icons/Add'
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


const Assurance = ({
  thunkAddAssurance,
  thunkListAssurances,
  thunkDeleteAssurance,
  thunkUpdateAssurance,
  thunkDetailsAssurance,
  thunkSearchAssurance,
  currentAssurance,
  loading,
  listAssurances,
  showModalDetails,
  setShowModalDetails
}) => {
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const global = useContext(GlobalContext);
  const [columns] = useState([
    "N°",
    "Nom",
    "Code",
    "Type",
    "Adresse",
    "Téléphone",
    "Fax",
    "Mail",
    "Site web",
  ]);

  const [inputs, setinput] = useState({
    nom: "",
    code: "",
    type: "",
    adresse: "",
    telephone: "",
    fax: "",
    mail: "",
    site_web: "",
  });

  const handleClickOpen = (idAssurance) => { thunkDetailsAssurance(idAssurance); };
  const handleClose = () => {
    setShowModal(false); setinput({
      nom: "",
      code: "",
      type: "",
      adresse: "",
      telephone: "",
      fax: "",
      mail: "",
      site_web: "",
    });
  };
  const CloseDetailsModal = () => { setShowModalDetails(false); };
  function sendData(data) { thunkAddAssurance(data); handleClose(); }
  function setnom({ target: { value } }) { setinput({ ...inputs, nom: value }); }
  function setcode({ target: { value } }) { setinput({ ...inputs, code: value }); }
  function settype({ target: { value } }) { setinput({ ...inputs, type: value }); }
  function setadresse({ target: { value } }) { setinput({ ...inputs, adresse: value }); }
  function settelephone({ target: { value } }) { setinput({ ...inputs, telephone: value }); }
  function setfax({ target: { value } }) { setinput({ ...inputs, fax: value }); }
  function setmail({ target: { value } }) { setinput({ ...inputs, mail: value }); }
  function setsite_web({ target: { value } }) { setinput({ ...inputs, site_web: value }); }
  function researching({ target: { value } }) { setValue(value); thunkSearchAssurance(value.trim()); }
  function verify() {
    if (
      inputs.nom.trim() === "" ||
      // inputs.code.trim() === "" ||
      inputs.type.trim() === ""
      // inputs.adresse.trim() === "" ||
      // inputs.telephone.trim() === "" ||
      // inputs.mail.trim() === "" ||
      // inputs.site_web.trim() === "" ||
      // inputs.fax.trim() === ""
    ) { return true } else { return false }
  }

  useEffect(() => { thunkListAssurances(); console.log(listAssurances) }, []);
  return (
    <div className="Assurance row p-2">
      <div className="col-12">
        <div className="row mb-2">
          <TextField
            className="col-2"
            variant="outlined"
            size="small"
            label="Rechercher une assurance"
            onChange={(ev) => researching(ev)}
          />
          <div className="col">
            <Chip
              label="Assurance(s)"
              avatar={
                <Avatar
                  className="white-text"
                  style={{ backgroundColor: global.theme.primary }}
                >
                  {listAssurances.length}
                </Avatar>
              }
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
                fontSize: "11px",
              }}
            >
              Ajouter une assurance
            </Button>
          </div>
        </div>
      </div>
      {listAssurances.length === 0 ? (
        <div className="col-12 text-secondary text-center">
          <h6 className="text-center lead">Aucune assurance existante</h6>
          <small>
            pour en ajouter une cliquez sur le boutton 'Ajouter assurance' puis
            renseignez les informations
          </small>
        </div>
      ) : (
          <table className="table-sm col-12 table-hover table-striped">
            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
              <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
            </thead>
            <tbody>
              {listAssurances.map(
                ({ idassurance, nomassurance, codeassurance, typeassurance, localassurance, telassurance, faxassurance, mailassurance, siteassurance }, i) => (
                  <tr key={i} style={{ cursor: "pointer" }} onClick={() => {
                    thunkDetailsAssurance(idassurance)
                  }}>
                    <td className="font-weight-bold">{i + 1}</td>
                    <td className="font-weight-bold">{nomassurance}</td>
                    <td className="font-weight-bold">{codeassurance}</td>
                    <td>{typeassurance}</td>
                    <td>{localassurance}</td>
                    <td>{telassurance}</td>
                    <td>{faxassurance}</td>
                    <td>{mailassurance}</td>
                    <td>{siteassurance}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      <Dialog
        open={showModal}
        onClose={handleClose}
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
          <b>Ajouter une assurance</b>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="standard"
                  size="small"
                  label="Nom"
                  onChange={setnom}
                />
                <TextField
                  className="col"
                  variant="standard"
                  size="small"
                  label="Code"
                  onChange={setcode}
                />
              </div>
              <div className="row my-3 mx-1">
                <FormControl variant="standard" size="small" className="col">
                  <InputLabel id="typeAssurance-label">
                    Type d'assurance
                  </InputLabel>
                  <Select
                    labelId="typeAssurance-label"
                    id="typeAssurance"
                    onChange={settype}
                    label="Type d'assurance"
                    style={{ fontSize: "11px" }}
                  >
                    <MenuItem
                      style={{ fontSize: "11px" }}
                      value={"Gestionnaire"}
                    >
                      Gestionnaire
                    </MenuItem>
                    <MenuItem style={{ fontSize: "11px" }} value={"Organisme"}>
                      Organisme
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className="col-6 ml-2"
                  variant="standard"
                  size="small"
                  label="Adresse"
                  onChange={setadresse}
                />
              </div>
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="standard"
                  size="small"
                  label="Téléphone"
                  onChange={settelephone}
                />
                <TextField
                  className="col"
                  variant="standard"
                  size="small"
                  label="Fax"
                  onChange={setfax}
                />
              </div>
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="standard"
                  size="small"
                  label="Mail"
                  onChange={setmail}
                />
                <TextField
                  className="col"
                  variant="standard"
                  size="small"
                  label="Site web"
                  onChange={setsite_web}
                />
              </div>
              <div className="col-12 d-flex">
                <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                <small className="font-weight-bold">Renseignez tous les champs néccessaires pour la creation d'assuurance</small>
              </div>
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
              fontSize: "11px",
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            className="mb-2"
            disabled={verify()}
            onClick={() => sendData(inputs)}
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
        open={showModalDetails}
        onClose={CloseDetailsModal}
        onEntered={() =>
          setinput({
            nom: currentAssurance.nomassurance,
            code: currentAssurance.codeassurance,
            type: currentAssurance.typeassurance,
            adresse: currentAssurance.localassurance,
            telephone: currentAssurance.telassurance,
            fax: currentAssurance.faxassurance,
            mail: currentAssurance.mailassurance,
            site_web: currentAssurance.siteassurance,
          })
        }
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
          <b>Effectuer une modification</b>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="standard"
                  size="small"
                  label="Nom"
                  defaultValue={currentAssurance.nomassurance}
                  onChange={setnom}
                />
                <TextField
                  className="col"
                  variant="standard"
                  size="small"
                  label="Code"
                  defaultValue={currentAssurance.codeassurance}
                  onChange={setcode}
                />
              </div>
              <div className="row my-3 mx-1">
                <FormControl variant="standard" size="small" className="col">
                  <InputLabel id="typeAssurance-label">
                    Type d'assurance
                  </InputLabel>
                  <Select
                    labelId="typeAssurance-label"
                    id="typeAssurance"
                    onChange={settype}
                    defaultValue={currentAssurance.typeassurance}
                    label="Type d'assurance"
                    style={{ fontSize: "11px" }}
                  >
                    <MenuItem style={{ fontSize: "11px" }} value={"Gestionnaire"}>Gestionnaire</MenuItem>
                    <MenuItem style={{ fontSize: "11px" }} value={"Organisme"}>Organisme</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className="col-6 ml-2"
                  variant="standard"
                  size="small"
                  label="Adresse"
                  defaultValue={currentAssurance.localassurance}
                  onChange={setadresse}
                />
              </div>
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="standard"
                  size="small"
                  defaultValue={currentAssurance.codeassurance}
                  label="Téléphone"
                  onChange={settelephone}
                />
                <TextField
                  className="col"
                  variant="standard"
                  size="small"
                  label="Fax"
                  defaultValue={currentAssurance.faxassurance}
                  onChange={setfax}
                />
              </div>
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="standard"
                  size="small"
                  label="Mail"
                  defaultValue={currentAssurance.mailassurance}
                  onChange={setmail}
                />
                <TextField
                  className="col"
                  variant="standard"
                  size="small"
                  label="Site web"
                  defaultValue={currentAssurance.siteassurance}
                  onChange={setsite_web}
                />
              </div>
              <div className="col-12 d-flex justify-content-center">
                <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                <small className="font-weight-bold">La suppression est sans confirmation et irréversible</small>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="mb-2"
            startIcon={<CancelIcon />}
            onClick={CloseDetailsModal}
            style={{
              textTransform: "none",
              fontSize: "11px",
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            className="mb-2 bg-danger text-white"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => { thunkDeleteAssurance(currentAssurance.idassurance) }}
            style={{
              textTransform: "none",
              fontSize: "11px",
            }}
          >
            Supprimer
          </Button>
          <Button
            variant="contained"
            className="mb-2"
            onClick={() => thunkUpdateAssurance(currentAssurance.idassurance, inputs)}
            startIcon={<CheckCircleOutlineIcon />}
            style={{
              textTransform: "none",
              backgroundColor: global.theme.primary,
              color: "white",
              fontSize: "11px",
            }}
          >
            Valider la modification
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    assuranceReducer: { listAssurances, showModalDetails, currentAssurance, loading },
  } = state;
  return { listAssurances, showModalDetails, currentAssurance, loading };
};

const AssuranceConnected = connect(mapStateToProps, {
  thunkAddAssurance,
  thunkListAssurances,
  thunkDeleteAssurance,
  thunkUpdateAssurance,
  thunkDetailsAssurance,
  thunkSearchAssurance,
  setShowModalDetails
})(Assurance);
export default AssuranceConnected;
