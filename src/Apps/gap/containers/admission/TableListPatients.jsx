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
import { withStyles } from "@material-ui/core/styles";
import GlobalContext, {Info} from "../../../global/context";

const Input = withStyles({
  root: {
    "& label.Mui-focused": {
      color: Info.theme.primary,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: Info.theme.primary,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: Info.theme.primary,
      },
    },
  },
})(TextField);

const TableListPatient = ({
  thunkListPatient,
  thunkSearchPatient,
  listPatients,
  thunkDetailsPatient,
}) => {
  const global = useContext(GlobalContext);
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
          <Input
            className="col-2"
            variant="outlined"
            size="small"
            label="Rechercher un patient"
            value={value}
            onChange={(ev) => researching(ev)}
          />
          <div className="col">
            <Chip
            label="patient(s)"
              avatar={
                <Avatar
                  className="white-text"
                  style={{ backgroundColor: global.theme.primary }}
                >
                  {listPatients.length}
                </Avatar>
              }
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          {listPatients.length === 0 ? (
            <div className="col-12 text-secondary text-center">
              <h3 className="text-center lead">Aucun patient</h3>
              <small>
                Pour en créer un, rendez-vous dans 'ajouter un patient' puis
                rerenseignez les informations
              </small>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="simple table" size="small">
                <TableHead
                  style={{ backgroundColor: global.theme.secondaryDark }}
                >
                  <TableRow>
                    {columns.map((col, i) => (
                      <TableCell
                        style={{ fontSize: "12px", color: "white" }}
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
                      <TableRow
                        key={i}
                        style={{ cursor: "pointer" }}
                        onClick={() => thunkDetailsPatient(iddossier)}
                      >
                        <TableCell
                          style={{ fontSize: "11px" }}
                          component="th"
                          scope="row"
                        >
                          {i + 1}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {ipppatient}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {nompatient}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {prenomspatient}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {sexepatient}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {habitationpatient}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {datenaissancepatient}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {lieunaissancepatient}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {nationalitepatient}
                        </TableCell>
                        <TableCell style={{ fontSize: "11px" }}>
                          {contactpatient}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
