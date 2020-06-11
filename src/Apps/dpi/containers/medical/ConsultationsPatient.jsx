import React, { useState, useEffect } from "react";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "../../../../components/InputCustom";
import {
  thunkAddConstantes,
  thunkSetCurrentConstante,
  thunkListConstantes,
} from "../../api/soins/constantes";
import { connect } from "react-redux";

const ConstantesPatient = ({
  thunkListConstantes,
  thunkAddConstantes,
  thunkSetCurrentConstante,
  currentConstante,
  listConstantes,
  currentPatient,
  currentSejour,
}) => {
  moment.locales("fr");
  const [columns] = useState([
    "Date",
    "Heure",
    "Poids",
    "Taille",
    "Temp.",
    "Pouls",
    "T.A",
    "F. Res",
    "Per Omb.",
    "Per. Tho",
    "Per. Bra",
    "Per. Cra",
  ]);
  const [open, setOpen] = useState(false);
  const [inputs, setinput] = useState({
    poids: "",
    taille: "",
    temperature: "",
    pouls: "",
    tensionarterielle: "",
    frequencerespiratoire: "",
    perimetreombilical: "",
    perimetrethoracique: "",
    perimetrebrachial: "",
    perimetrecranien: "",
  });

  useEffect(() => {
    thunkListConstantes(currentPatient.iddossier);
    thunkSetCurrentConstante(currentPatient.iddossier);
  }, [currentPatient.iddossier]);

  function setpoids({ target: { value } }) {
    setinput({ ...inputs, poids: value });
  }
  function settaille({ target: { value } }) {
    setinput({ ...inputs, taille: value });
  }
  function settemperature({ target: { value } }) {
    setinput({ ...inputs, temperature: value });
  }
  function settensionArterielle({ target: { value } }) {
    setinput({ ...inputs, tensionArterielle: value });
  }
  function setpouls({ target: { value } }) {
    setinput({ ...inputs, pouls: value });
  }
  function setfrequenceRespiratoire({ target: { value } }) {
    setinput({ ...inputs, frequenceRespiratoire: value });
  }

  function setperimetreBrachial({ target: { value } }) {
    setinput({ ...inputs, perimetreBrachial: value });
  }
  function setperimetreCranien({ target: { value } }) {
    setinput({ ...inputs, perimetreCranien: value });
  }
  function setperimetreThoracique({ target: { value } }) {
    setinput({ ...inputs, perimetreThoracique: value });
  }
  function setperimetreOmbrilical({ target: { value } }) {
    setinput({ ...inputs, perimetreOmbrilical: value });
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="ConstantesPatient row">
      {currentConstante ? (
        <div className="col-12 my-2 p-3 shadow-sm white text-secondary">
          <div className="row">
            <div className="col-3 text-center">
              <i className="mdi-action-accessibility mdi-5x"></i>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-4">
                  <small>
                    <b>Poids :</b> {currentConstante.poids} kg
                  </small>
                  <br />
                  <small>
                    <b>Temp. :</b> {currentConstante.temperature} °C
                  </small>
                  <br />
                  <small>
                    <b>T.A :</b> {currentConstante.tensionarterielle} kg
                  </small>
                  <br />
                  <small>
                    <b>Taille :</b> {currentConstante.taille} cm
                  </small>
                  <br />
                  <small>
                    <b>Freq. Resp. :</b>{" "}
                    {currentConstante.frequencerespiratoire}
                  </small>
                  <br />
                </div>
                <div className="col-5">
                  <small>
                    <b>Per. Ombrilical :</b>{" "}
                    {currentConstante.perimetreombrilical} cm
                  </small>
                  <br />
                  <small>
                    <b>Per. Brachial :</b> {currentConstante.perimetrebrachial}{" "}
                    cm
                  </small>
                  <br />
                  <small>
                    <b>Per. Cranien :</b> {currentConstante.perimetrecranien} cm
                  </small>
                  <br />
                  <small>
                    <b>Per. Thoracique :</b>{" "}
                    {currentConstante.perimetrethoracique} cm
                  </small>
                  <br />
                  <button
                    className="btn btn-sm btn-primary text-white right mx-2 mt-2"
                    onClick={() => setOpen(true)}
                  >
                    Nouvelles constantes +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-sm btn-primary text-white right col-3 offset-9"
          onClick={() => setOpen(true)}
        >
          Nouvelles constantes +
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
          {listConstantes.map(
            (
              {
                idconstante,
                dateconstante,
                heureconstante,
                poids,
                taille,
                temperature,
                pouls,
                tensionarterielle,
                frequencerespiratoire,
                perimetreombrilical,
                perimetrethoracique,
                perimetrebrachial,
                perimetrecranien,
              },
              i
            ) => (
              <tr key={i} className="white ombre">
                <td>
                  <small>{dateconstante}</small>
                </td>
                <td>
                  <small>{heureconstante}</small>
                </td>
                <td>
                  <small>{poids}</small>
                </td>
                <td>
                  <small>{taille}</small>
                </td>
                <td>
                  <small>{temperature}</small>
                </td>
                <td>
                  <small>{pouls}</small>
                </td>
                <td>
                  <small>{tensionarterielle}</small>
                </td>
                <td>
                  <small>{frequencerespiratoire}</small>
                </td>
                <td>
                  <small>{perimetreombrilical}</small>
                </td>
                <td>
                  <small>{perimetrethoracique}</small>
                </td>
                <td>
                  <small>{perimetrebrachial}</small>
                </td>
                <td>
                  <small>{perimetrecranien}</small>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="col-12 mt-1">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">
            <h6 className="text-secondary">
              <i className="mdi-action-accessibility mr-2"></i>Prise de
              constantes
            </h6>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12">
                <div className="row my-3">
                  <TextField
                    className="col"
                    onChange={setpoids}
                    value={inputs.poids}
                    label="Poids (kg)"
                  />
                  <TextField
                    className="col"
                    onChange={settaille}
                    value={inputs.taille}
                    label="Taille (cm)"
                  />
                  <TextField
                    className="col"
                    onChange={settemperature}
                    value={inputs.temperature}
                    label="Temp (°)"
                  />
                </div>
                <div className="row my-3">
                  <TextField
                    className="col"
                    onChange={setpouls}
                    value={inputs.pouls}
                    label="Pouls (kg)"
                  />
                  <TextField
                    className="col"
                    onChange={settensionArterielle}
                    value={inputs.tensionArterielle}
                    label="Tension A."
                  />
                  <TextField
                    className="col"
                    onChange={setfrequenceRespiratoire}
                    value={inputs.frequenceRespiratoire}
                    label="Freq.respiratoire"
                  />
                </div>
                <div className="row my-3">
                  <TextField
                    className="col"
                    onChange={setperimetreOmbrilical}
                    value={inputs.perimetreOmbrilical}
                    label="Pér. ombrilical"
                  />
                  <TextField
                    className="col"
                    onChange={setperimetreThoracique}
                    value={inputs.perimetreThoracique}
                    label="Pér. thoracique"
                  />
                </div>
                <div className="row my-3">
                  <TextField
                    className="col"
                    onChange={setperimetreBrachial}
                    value={inputs.perimetreBrachial}
                    label="Pér. brachial"
                  />
                  <TextField
                    className="col"
                    onChange={setperimetreCranien}
                    value={inputs.perimetreCranien}
                    label="Pér. Cranien"
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button className="btn btn-light btn-sm" onClick={handleClose}>
              Annuler
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                thunkAddConstantes(
                  currentSejour,
                  inputs,
                  currentPatient.iddossier
                );
                setOpen(false);
              }}
            >
              Valider
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
const mapStatetoProps = (state) => {
  const {
    patientsReducer: { currentPatient, currentSejour },
    constantesReducer: { listConstantes, currentConstante },
  } = state;

  return { currentPatient, currentSejour, listConstantes, currentConstante };
};
const ConstantesPatientConnected = connect(mapStatetoProps, {
  thunkListConstantes,
  thunkAddConstantes,
  thunkSetCurrentConstante,
})(ConstantesPatient);

export default ConstantesPatientConnected;
