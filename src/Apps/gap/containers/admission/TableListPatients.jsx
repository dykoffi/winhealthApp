import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  thunkListPatient,
  thunkSearchPatient,
} from "../../api/admission/listPatients";

import { thunkDetailsPatient } from "../../api/admission/detailsPatient";

const TableListPatient = ({
  thunkListPatient,
  thunkSearchPatient,
  listPatients,
  thunkDetailsPatient,
}) => {
  const [columns] = useState([
    "N°",
    "IPP",
    "Nom",
    "Prenoms",
    "Sexe",
    "Domicile",
    "Date de naissance",
    "Lieu de naissance",
    "Nationalité",
    "Contact",
  ]);

  // const [search, setsearch] = useState()
  const [value, setvalue] = useState();
  function researching({ target: { value } }) {
    setvalue(value);
    thunkSearchPatient(value.trim());
  }
  useEffect(() => {
    thunkListPatient();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="row mb-2">
          <input
            value={value}
            type="text"
            className="col-2"
            placeholder="rechercher un patient"
            onChange={(ev) => researching(ev)}
            style={{fontSize:'13px'}}
            autoFocus
          />
          <div className="col text-right">
            <small>{listPatients.length} patient(s)</small>
          </div>
        </div>
        <div className="table-head row">
          <table className="table grey lighten-5 table-sm col-12 table-hover">
            <thead
              style={{
                borderBottomColor: "#97bf0f !important",
                borderBottomStyle:'solid',
                borderBottomWidth : '2px',
                fontSize:'14px'
              }}
            >
              <tr>
                {columns.map((col, i) => (
                  <th key={i}>
                    <small className="font-weight-bold">{col}</small>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="white">
              {listPatients.map(
                (
                  {
                    iddossier,
                    ipppatient,
                    nompatient,
                    prenomspatient,
                    sexepatient,
                    habitationpatient,
                    datenaissancepatient,
                    lieunaissancepatient,
                    nationalitepatient,
                    contactpatient,
                  },
                  i
                ) => (
                  <tr
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => thunkDetailsPatient(iddossier)}
                  >
                    <td>
                      <small>{i + 1}</small>
                    </td>
                    <td>
                      <small>{ipppatient}</small>
                    </td>
                    <td>
                      <small>{nompatient}</small>
                    </td>
                    <td>
                      <small>{prenomspatient}</small>
                    </td>
                    <td>
                      <small>{sexepatient}</small>
                    </td>
                    <td>
                      <small>{habitationpatient}</small>
                    </td>
                    <td>
                      <small>{datenaissancepatient}</small>
                    </td>
                    <td>
                      <small>{lieunaissancepatient}</small>
                    </td>
                    <td>
                      <small>{nationalitepatient}</small>
                    </td>
                    <td>
                      <small>{contactpatient}</small>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  const {
    listPatientsReducer: { listPatients },
  } = state;
  return { listPatients };
};

const TableListPatientConnected = connect(mapStateToProp, {
  thunkListPatient,
  thunkSearchPatient,
  thunkDetailsPatient,
})(TableListPatient);
export default TableListPatientConnected;
