import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  thunkListAttentePatients,
  thunkSearchPatient,
} from "../../api/soins/patients";

import { thunkDetailsPatient } from "../../api/soins/patients";
import { socket } from "../../../global/apiQuery";

const TableListPatient = ({
  thunkListAttentePatients,
  thunkSearchPatient,
  listAttentePatients,
  thunkDetailsPatient,
}) => {
  const [columns] = useState([
    "Ordre",
    "IPP",
    "nom",
    "prenoms",
    "sexe",
    "domicile",
    "date de naissance",
    "lieu de naissance",
    "nationalité",
    "contact",
    "motif",
  ]);

  // const [search, setsearch] = useState()
  const [value, setvalue] = useState();
  function researching({ target: { value } }) {
    setvalue(value);
    thunkSearchPatient(value.trim());
  }
  useEffect(() => {
    thunkListAttentePatients();
    socket.on("facture_encaisser", () => {
      thunkListAttentePatients();
    });
  }, []);

  // useEffect(() => {
  //   const son = new Audio("../../../../static/son.mp3");
  //   son.play();
  // }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="row border-bottom py-2">
          <div className="col-6">
            <small>{listAttentePatients.length} patient(s)</small>
          </div>
          <div className="col-3 offset-3">
            <input
              value={value}
              type="text"
              className="col-12"
              placeholder="rechercher un patient"
              onChange={(ev) => researching(ev)}
            />
          </div>
        </div>
        <div className="table-head row">
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
              {listAttentePatients.map(
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
                    typesejour,
                    idsejour,
                  },
                  i
                ) => (
                  <tr
                    key={i}
                    className="white ombre"
                    style={{ cursor: "pointer" }}
                    onClick={() => thunkDetailsPatient(iddossier, idsejour)}
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
                    <td>
                      <small>{typesejour}</small>
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
    patientsReducer: { listAttentePatients },
  } = state;
  return { listAttentePatients };
};

const TableListPatientConnected = connect(mapStateToProp, {
  thunkListAttentePatients,
  thunkSearchPatient,
  thunkDetailsPatient,
})(TableListPatient);
export default TableListPatientConnected;
