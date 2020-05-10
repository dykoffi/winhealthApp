import React, { useState, useEffect } from "react";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Folder from "../../../../components/Folder";
import { TextField, Select } from "../../../../components/InputCustom";
import Facture from "../../documents/Facture";
import {
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
} from "../../api/admission/sejour";
import { connect } from "react-redux";

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

  useEffect(()=>{
    thunkListSejour(currentPatient.iddossier)
  },[currentPatient.iddossier])
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
                  <span>de {heuredebutsejour} à {heurefinsejour}</span>
                  <span>
                    {statussejour} pour {typesejour}
                  </span>
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
          maxWidth="sm"
          // className="col-4"
        >
          <DialogTitle id="alert-dialog-title">
            {"Ajouter un nouveau sejour"}
          </DialogTitle>
          <DialogContent>
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
                className="col"
                options={[
                  { value: "CS", label: "Consultation" },
                  { value: "S", label: "Soins" },
                  { value: "Hospit", label: "Hospitalisation" },
                ]}
              />
              <Select
                value={inputs.specialite}
                onChange={setspecialite}
                label="Specialité"
                className="col"
                options={[
                  { value: "C", label: "Generaliste" },
                  { value: "CS", label: "Specialiste" },
                  { value: "CD", label: "Dentiste" },
                  { value: "CNPSY", label: "psychiatre" },
                  { value: "CSF", label: "Gynecologie" },
                ]}
              />
              <Select
                value={inputs.medecin}
                onChange={setmedecin}
                label="Medecin"
                className="col"
                options={[
                  { value: 1, label: "Dr Audrey Zaki" },
                  { value: 2, label: "Dr Edy KOFFI" },
                  { value: 3, label: "Dr Wilfried GBADJE" },
                ]}
              />
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
