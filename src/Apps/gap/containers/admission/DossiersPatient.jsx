import React, { useState, useEffect } from "react";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { header } from "../../constants/apiQuery";
import Facture from "../../documents/Facture";
import { TextField, Select } from "../../../../components/InputCustom";
import {
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
  thunkCurrentFacture,
} from "../../api/admission/sejour";
import { connect } from "react-redux";
import Axios from "axios";
import QR from "qrcode.react";

const DossiersPatient = ({
  thunkListSejour,
  thunkAddSejour,
  thunkDetailsSejour,
  thunkCurrentFacture,
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
    setinput({});
    setOpen(false);
  }
  useEffect(() => {
    Axios({
      url: `${header.url}/gap/list/actes`,
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
    thunkCurrentFacture(currentPatient.iddossier);
  }, [currentPatient.iddossier]);

  const [columns] = useState([
    "N°",
    "Date de debut",
    "Date de fin",
    "heure de debut",
    "heure de fin",
    "Tpye de sejour",
    "Status du sejour",
  ]);
  return (
    <div className="DossiersPatient row">
      {currentSejour !== null ? (
        <div className="col-12 p-3 white shadow-sm text-secondary mb-2">
          <div className="row">
            <div className="col-2">
              <i className="mdi-communication-business mdi-5x"></i>
            </div>
            <div className="col-7">
              <div className="row">
                <div className="col-6">
                  <small>
                    <b>Date de debut :</b> {currentSejour.datedebutsejour}
                  </small>
                  <br />
                  <small>
                    <b>Heure de debut :</b> {currentSejour.heuredebutsejour}
                  </small>
                  <br />
                  <small>
                    <b>Date de fin :</b> {currentSejour.datefinsejour}
                  </small>
                  <br />
                  <small>
                    <b>Heure de fin :</b> {currentSejour.heurefinsejour}
                  </small>
                  <br />
                  <small>
                    <b>Motif:</b> {currentSejour.typesejour}
                  </small>
                </div>
                <div className="col-6">
                  <small>
                    <b>N° Facture :</b> {currentSejour.numerofacture}
                  </small>
                  <br />
                  <small>
                    <b>Date :</b> {currentSejour.datefacture}
                  </small>
                  <br />
                  <small>
                    <b>Heure:</b> {currentSejour.heurefacture}
                  </small>
                  <br />
                  <small>
                    <b>Montant:</b> {currentSejour.prixacte}
                  </small>
                  <br />
                  <Facture
                    //patient
                    nompatient={currentSejour.nompatient}
                    prenomspatient={currentSejour.prenomspatient}
                    datenaissancepatient={currentSejour.datenaissancepatient}
                    lieunaissancepatient={currentSejour.lieunaissancepatient}
                    ipppatient={currentSejour.ipppatient}
                    lieunaissance={currentSejour.lieunaissance}
                    habitationpatient={currentSejour.habitationpatient}
                    //facture
                    numerofacture={currentSejour.numerofacture}
                    datefacture={currentSejour.datefacture}
                    heurefacture={currentSejour.heurefacture}
                    auteurfacture={currentSejour.auteurfacture}
                    code={`${header.url}/gap/verify/facture/${currentSejour.idfacture}`}
                    //sejour
                    datedebutsejour={currentSejour.datedebutsejour}
                    datefinsejour={currentSejour.datefinsejour}
                    heuredebutsejour={currentSejour.heuredebutsejour}
                    heurefinsejour={currentSejour.heurefinsejour}
                    typesejour={currentSejour.typesejour}
                    //acte
                    libelleacte={currentSejour.libelleacte}
                    prixacte={currentSejour.prixacte}
                  />
                </div>
              </div>
            </div>
            <div className="col-3">
              <QR
                value={`${header.url}/gap/verify/facture/${currentSejour.idfacture}`}
                id="img"
                fgColor="#696969"
                includeMargin={true}
              />
            </div>
          </div>
          <button
            onClick={handleClickOpen}
            className="btn btn-sm btn-primary text-white col-3 offset-9"
          >
            Nouveau sejour
          </button>
        </div>
      ) : (
        <button
          onClick={handleClickOpen}
          className="btn btn-sm btn-primary text-white col-3 offset-9"
        >
          Nouveau sejour
        </button>
      )}

      <table className="table table-borderless table-active table-sm col-12 table-hover">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>
                <small className="font-weight-bold">{col}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listSejour.map(
            (
              {
                datedebutsejour,
                datefinsejour,
                heuredebutsejour,
                heurefinsejour,
                typesejour,
                statussejour,
                idsejour,
              },
              i
            ) => (
              <tr
                key={i}
                className="white ombre"
                style={{ cursor: "pointer" }}
                onClick={() => thunkDetailsSejour(idsejour)}
              >
                <td>
                  <small>{i + 1}</small>
                </td>
                <td>
                  <small>{datedebutsejour}</small>
                </td>
                <td>
                  <small>{datefinsejour}</small>
                </td>
                <td>
                  <small>{heuredebutsejour}</small>
                </td>
                <td>
                  <small>{heurefinsejour}</small>
                </td>
                <td>
                  <small>{typesejour}</small>
                </td>

                <td>
                  <small>{statussejour}</small>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="col-12 mt-4">
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
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button className="btn btn-sm btn-light" onClick={handleClose}>
              Annuler
            </button>
            <button className="btn btn-sm btn-success" onClick={sendDTata}>
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
  thunkCurrentFacture,
})(DossiersPatient);

export default DossiersPatientConnected;
