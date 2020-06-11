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
} from "../../api/assurance/assurances";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
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
}) => {
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const handleClickOpen = (idAssurance) => {
    thunkDetailsAssurance(idAssurance);
  };
  const handleClose = () => {
    setShowModal(false);
    setinput({});
  };
  function sendData(data) {
    thunkAddAssurance(data);
    handleClose();
  }
  function setnom({ target: { value } }) {
    setinput({ ...inputs, nom: value });
  }
  function setcode({ target: { value } }) {
    setinput({ ...inputs, code: value });
  }
  function settype({ target: { value } }) {
    setinput({ ...inputs, type: value });
  }
  function setadresse({ target: { value } }) {
    setinput({ ...inputs, adresse: value });
  }
  function settelephone({ target: { value } }) {
    setinput({ ...inputs, telephone: value });
  }
  function setfax({ target: { value } }) {
    setinput({ ...inputs, fax: value });
  }
  function setmail({ target: { value } }) {
    setinput({ ...inputs, mail: value });
  }
  function setsite_web({ target: { value } }) {
    setinput({ ...inputs, site_web: value });
  }

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

  const global = useContext(GlobalContext);

  function researching({ target: { value } }) {
    setValue(value);
    thunkSearchAssurance(value.trim());
  }

  useEffect(() => {
    thunkListAssurances();
    console.log(listAssurances)
  }, []);
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
            <button className="btn btn-sm rounded-0 btn-light"
              // style={{ backgroundColor: global.theme.primary, color:'white' }}
              onClick={() => { setShowModal(true); }}>
              <i className="mdi-content-add mr-2"></i>
                Ajouter une assurance
                </button>
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
          <table className="table-sm col-12 table-hover">
            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
              <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
            </thead>
            <tbody>
              {listAssurances.map(
                ({ nomassurance, codeassurance, typeassurance, localassurance, telassurance, faxassurance, mailassurance, siteassurance }, i) => (
                  <tr key={i} style={{ cursor: "pointer" }} onClick={() => handleClickOpen(nomassurance)}>
                    <td>{i + 1}</td>
                    <td className="font-weight-bold">{nomassurance}</td>
                    <td>{codeassurance}</td>
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
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle
          className="text-center text-secondary"
          id="alert-dialog-title"
        >
          <small>Ajouter une assurance</small>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="outlined"
                  size="small"
                  label="Nom"
                  onChange={setnom}
                />
                <TextField
                  className="col"
                  variant="outlined"
                  size="small"
                  label="Code"
                  onChange={setcode}
                />
              </div>
              <div className="row my-3 mx-1">
                <FormControl variant="outlined" size="small" className="col">
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
                  className="col-7 ml-2"
                  variant="outlined"
                  size="small"
                  label="Adresse"
                  onChange={setadresse}
                />
              </div>
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="outlined"
                  size="small"
                  label="Téléphone"
                  onChange={settelephone}
                />
                <TextField
                  className="col"
                  variant="outlined"
                  size="small"
                  label="Fax"
                  onChange={setfax}
                />
              </div>
              <div className="row my-3 mx-1">
                <TextField
                  className="col mr-2"
                  variant="outlined"
                  size="small"
                  label="Mail"
                  onChange={setmail}
                />
                <TextField
                  className="col"
                  variant="outlined"
                  size="small"
                  label="Site web"
                  onChange={setsite_web}
                />
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    assuranceReducer: { listAssurances, currentAssurance, loading },
  } = state;
  return { listAssurances, currentAssurance, loading };
};

const AssuranceConnected = connect(mapStateToProps, {
  thunkAddAssurance,
  thunkListAssurances,
  thunkDeleteAssurance,
  thunkUpdateAssurance,
  thunkDetailsAssurance,
  thunkSearchAssurance,
})(Assurance);
export default AssuranceConnected;
