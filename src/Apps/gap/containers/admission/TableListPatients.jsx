import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {
  thunkListPatient,
  thunkSearchPatient,
} from "../../api/admission/listPatients";

import moment from "moment";

import { thunkDetailsPatient } from "../../api/admission/detailsPatient";
import { TextField, Avatar, Chip } from "@material-ui/core";
import ThemeContext from "../../../global/context";

const TableListPatient = ({
  thunkListPatient,
  thunkSearchPatient,
  listPatients,
  thunkDetailsPatient,
}) => {
  const theme = useContext(ThemeContext);
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
  moment.locale("fr");
  // const [search, setsearch] = useState()
  const [value, setvalue] = useState("");
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
          <TextField
            className="col-2"
            variant="outlined"
            size="small"
            label="Rechercher"
            value={value}
            onChange={(ev) => researching(ev)}
            autoFocus
          />
          <div className="col text-right">
            <Chip
              label="patient(s)"
              avatar={
                <Avatar
                  className="white-text"
                  style={{ backgroundColor: theme.primary }}
                >
                  {listPatients.length}
                </Avatar>
              }
            />
          </div>
        </div>
        <div className="row">
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead style={{ backgroundColor: theme.secondaryDark }}>
                <TableRow>
                  {columns.map((col, i) => (
                    <TableCell
                      style={{ fontSize: "14px", color: "white" }}
                      key={i}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
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
                    <TableRow key={i}>
                      <TableCell
                        style={{ fontSize: "13px" }}
                        component="th"
                        scope="row"
                      >
                        {i}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {ipppatient}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {nompatient}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {prenomspatient}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {sexepatient}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {habitationpatient}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {datenaissancepatient}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {lieunaissancepatient}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {nationalitepatient}
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        {contactpatient}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
