import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  thunkListPatient,
  thunkSearchPatient,
} from "../../api/admission/listPatients";

import {
  thunkDetailsPatient
} from "../../api/admission/detailsPatient";

const TableListPatient = ({
  thunkListPatient,
  thunkSearchPatient,
  listPatients,
  thunkDetailsPatient
}) => {
  const [columns] = useState([
    "N°",
    "IPP",
    "nom",
    "prenoms",
    "sexe",
    "domicile",
    "date de naissance",
    "lieu de naissance",
    "nationalité",
    "contact",
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
        <div className="row border-bottom py-2">
          <div className="col-6">
            <h6>{listPatients.length} patient(s)</h6>
          </div>
          <div className="col-4 offset-2">
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
                    className="white ombre"
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
                    <td className="text-center">
                      {/* <IconButton aria-label="delete">
                        <DeleteIcon style={{fontSize : "15px"}} />
                      </IconButton> */}
                      <i className="mdi-action-delete mx-2"></i>
                      <i className="mdi-editor-mode-edit mx-2"></i>
                      <i className="mdi-editor-format-align-left mx-2"></i>
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
