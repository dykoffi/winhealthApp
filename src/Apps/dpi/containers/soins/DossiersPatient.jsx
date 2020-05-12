import React, { useState, useEffect } from "react";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Folder from "../../../../components/Folder";
import {
  TextField,
  Select,
  TextFieldAutoComplete,
} from "../../../../components/InputCustom";
import Facture from "../../documents/Facture";
import {
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
} from "../../api/soins/sejour";
import { connect } from "react-redux";
import Axios from "axios";

const DossiersPatient = ({
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
  currentPatient,
  listSejour,
  currentSejour,
}) => {
  moment.locales("fr");
  const [open, setOpen] = useState(false);
  const [inputs, setinput] = useState({});
  const [listActes, setListActe] = useState([]);

  function setdebutDate({ target: { value } }) {
    setinput({ ...inputs, debutDate: value });
  }
  function setfinDate({ target: { value } }) {
    setinput({ ...inputs, finDate: value });
  }

  function setDebutHeure({ target: { value } }) {
    setinput({ ...inputs, DebutHeure: value });
  }
  function setfinHeure({ target: { value } }) {
    setinput({ ...inputs, finHeure: value });
  }

  function settype({ target: { value } }) {
    setinput({ ...inputs, type: value });
  }
  function setspecialite({ target: { value } }) {
    setinput({ ...inputs, specialite: value });
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
    thunkAddSejour(inputs, currentPatient.iddossier);
  }
  useEffect(() => {
    Axios({
      url: "http://localhost:8000/gap/list/actes",
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
  }, [currentPatient.iddossier]);
  return (
    <div className="DossiersPatient row">
      <input
        type="text"
        placeholder="rechercher un sejour"
        className="col-4 offset-5"
      />
      <button
        onClick={handleClickOpen}
        className="btn btn-info text-white col-3 rounded-0"
      >
        Ajouter sejour
      </button>
      {/* <Facture /> */}

      {/* <div className="col-12"><b>3 sejours</b></div> */}
      <div className="col-12 mt-4">
        <div className="row d-flex  justify-content-end">
          {listSejour.map(
            ({
              datedebutsejour,
              datefinsejour,
              heuredebutsejour,
              heurefinsejour,
              typesejour,
              statussejour,
            }) => (
              <div className="col-3">
                <Folder
                  title={
                    datedebutsejour === datefinsejour
                      ? `${datedebutsejour}`
                      : `${datedebutsejour} au  ${datefinsejour}`
                  }
                >
                  <span>
                    de {heuredebutsejour} à {heurefinsejour}{" "}
                  </span>
                  <span>{typesejour}</span>
                </Folder>
              </div>
            )
          )}
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">
            {"Ajouter un nouveau sejour"}
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12">
                <div className="row my-3">
                  <TextField
                    value={inputs.debutDate}
                    onChange={setdebutDate}
                    type="date"
                    className="col-7"
                    label="Date de debut"
                  />
                  <TextField
                    value={inputs.DebutHeure}
                    onChange={setDebutHeure}
                    type="time"
                    className="col-5"
                    label="Heure de debut"
                  />
                </div>
                <div className="row my-3">
                  <TextField
                    value={inputs.finDate}
                    onChange={setfinDate}
                    type="date"
                    className="col-7"
                    min={inputs.debutDate}
                    label="Date de fin"
                  />
                  <TextField
                    value={inputs.finHeure}
                    onChange={setfinHeure}
                    type="time"
                    className="col-5"
                    label="Heure de fin"
                  />
                </div>
                <div className="row my-3">
                  <Select
                    value={inputs.type}
                    onChange={settype}
                    label="Type de sejour"
                    className="col-12"
                    options={[
                      { value: "Consultation", label: "Consultation" },
                      { value: "Soins", label: "Soins" },
                      { value: "Hospitalisation", label: "Hospitalisation" },
                    ]}
                  />
                  <Select
                    value={inputs.specialite}
                    onChange={setspecialite}
                    label="Specialité"
                    className="col-12"
                    options={[...listActes]}
                  />
                  <Select
                    value={inputs.medecin}
                    onChange={setmedecin}
                    label="Medecin"
                    className="col-12"
                    options={[
                      { value: 1, label: "Dr KOFFI EDy" },
                      { value: 2, label: "Dr Audrey Zaki" },
                      { value: 3, label: "Dr Abdoul N'DONGO" },
                    ]}
                  />
                  {/* <TextFieldAutoComplete
                    value={inputs.specialite}
                    onChange={setspecialite}
                    className="col-12 my-2"
                    label="liste des actes"
                    idList="listactes"
                    id="actes"
                    list={[
                      "consultation externe",
                      "auto medication",
                      "chirurgie",
                    ]}
                  />
                  <button
                    className="btn btn-outline-primary offset-5 col-2"
                    onClick={() => {
                      setListActe([...listActes, inputs.specialite])
                      // setinput({...inputs, specialite:""})
                    }}
                  >
                    +
                  </button> */}
                </div>
              </div>
              {/* <div className="col-6">
                <div className="col-12">
                  {listActes.map((acte, i) => (
                    <div key={i}>
                      <small>{acte} {i}</small>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </DialogContent>
          <DialogActions>
            <button className="btn btn-light" onClick={handleClose}>
              Annuler
            </button>
            <button className="btn btn-success" onClick={sendDTata} autoFocus>
              Generer la facture
            </button>
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
})(DossiersPatient);

export default DossiersPatientConnected;
