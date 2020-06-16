import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import moment from "moment";
import { thunkListPatient, thunkSearchPatient, } from "../../api/admission/listPatients";
import { thunkDetailsPatient } from "../../api/admission/detailsPatient";
import { TextField, Avatar, Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import GlobalContext, { Info } from "../../../global/context";

const Input = withStyles({
  root: {
    "& label.Mui-focused": { color: Info.theme.primary, },
    "& .MuiInput-underline:after": { borderBottomColor: Info.theme.primary, },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": { borderColor: Info.theme.primary, },
    },
  },
})(TextField);

const TableListPatient = ({ thunkListPatient, thunkSearchPatient, listPatients, thunkDetailsPatient, }) => {
  const global = useContext(GlobalContext);
  const [columns] = useState([
    "N°",
    "IPP",
    "Nom & prenoms",
    "Sexe",
    "Domicile",
    "Date de naissance",
    "Lieu de naissance",
    "Nationalité",
    "Contact",
  ]);
  moment.locale("fr");
  // const [search, setsearch] = useState()
  const [value, setvalue] = useState("");
  function researching({ target: { value } }) { setvalue(value); thunkSearchPatient(value.trim()); }
  useEffect(() => { thunkListPatient(); }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="row mb-2">
          <Input
            className="col-2"
            variant="outlined"
            size="small"
            label="Rechercher un patient"
            onChange={(ev) => researching(ev)}
          />
          <div className="col">
            <Chip
              label="patient(s)"
              avatar={<Avatar className="white-text" style={{ backgroundColor: global.theme.primary }} > {listPatients.length}</Avatar>}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          {listPatients.length === 0 ? (
            <div className="col-12 text-secondary text-center">
              <h3 className="text-center lead">Aucun patient</h3>
              <small> Pour en créer un, rendez-vous dans 'ajouter un patient' puis rerenseignez les informations </small>
            </div>
          ) : (
              <table className="table-sm table-hover col-12 table-striped">
                <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                  <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                </thead>
                <tbody>
                  {listPatients.map(({ iddossier, ipppatient, nompatient, prenomspatient, sexepatient, habitationpatient, datenaissancepatient, lieunaissancepatient, nationalitepatient, contactpatient, civilitepatient, }, i) => (
                    <tr
                      key={i}
                      style={{ cursor: "pointer" }}
                      onClick={() => thunkDetailsPatient(iddossier)}
                    >
                      <td>{i + 1}</td>
                      <td><b>{ipppatient}</b></td>
                      <td><b>{civilitepatient} {nompatient} {prenomspatient}</b></td>
                      <td>{sexepatient}</td>
                      <td>{habitationpatient}</td>
                      <td>{datenaissancepatient}</td>
                      <td>{lieunaissancepatient}</td>
                      <td>{nationalitepatient}</td>
                      <td>{contactpatient}</td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => { const { listPatientsReducer: { listPatients }, } = state; return { listPatients }; };
const TableListPatientConnected = connect(mapStateToProp, { thunkListPatient, thunkSearchPatient, thunkDetailsPatient, })(TableListPatient);
export default TableListPatientConnected;
