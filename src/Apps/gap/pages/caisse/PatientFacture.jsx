import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import { TextField, Chip, Avatar } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "axios";
import { header } from "../../../global/apiQuery";


import {
  thunkListFacturesPatient,
  thunkEncaisserFactures,
  thunkDetailsFacture,
  setShowModal,
  setCurrentPatient
} from "../../api/caisse/factures";


const FacturePatient = ({
  currentPatient,
  listFacturesPatient,
  thunkListFacturesPatient,
  thunkEncaisserFactures,
  thunkDetailsFacture,
  setShowModal, }) => {
  const [ipp, setipp] = useState();
  const [listPatients, setListPatients] = useState([]);
  const columns = [
    "N°",
    "Numero de facture",
    "Date",
    "Heure",
    "Patient",
    "Type de sejour",
    "Auteur",
    "Montant Total",
    "Part ASSU",
    "Reste ASSU",
    "Part Patient",
    "Reste Patient",
  ]

  const global = useContext(GlobalContext);

  useEffect(() => {
    Axios({ url: `${header.url}/gap/list/patients`, }).then(({ data: { rows } }) => { setListPatients(rows); });
  }, []);
  return (
    <div className="Dossiers row p-2">
      <div className="col-12">
        <div className="row mb-2">
          <Autocomplete
            size="small"
            className="col-3 p-0"
            id="listpatients"
            options={listPatients}
            onChange={(event, newValue) => { newValue && thunkListFacturesPatient(newValue) }}
            getOptionLabel={(option) => `(${option.ipppatient}) ${option.nompatient.toUpperCase()} ${option.prenomspatient.toUpperCase()}`}
            filterSelectedOptions
            renderOption={(option) => (
              <>
                <small>
                  ({option.ipppatient}) {option.nompatient}{" "}
                  {option.prenomspatient} né le{" "}
                  {option.datenaissancepatient} à{" "}
                  {option.lieunaissancepatient}
                </small>
              </>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selectionnez un patient"
                variant="outlined"
                placeholder="Rechercher le patient ..."
              />
            )}
          />
          <div className="col">
            <Chip
              label="facture(s)"
              avatar={
                <Avatar
                  className="white-text"
                  style={{ backgroundColor: global.theme.primary }}
                >
                  {listFacturesPatient.length}
                </Avatar>
              }
            />
          </div>
        </div>
      </div>

      {listFacturesPatient.length === 0 ? (
        <div className="col-12 text-secondary text-center">
          <h6 className="text-center lead">Aucune Pati en attente</h6>
          <small>
            Les factures sont générées lors de l'ajout d'un séjour
          </small>
        </div>
      ) : (
          <>
            {
              currentPatient.ipppatient && (<div className="col-12 p-0">
                <small><b>Patient : </b> {`(${currentPatient.ipppatient}) ${currentPatient.nompatient.toUpperCase()} ${currentPatient.prenomspatient.toUpperCase()}`}</small>
              </div>)
            }

            <table className="col-12 table-sm table-sm table-hover table-striped">
              <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
              </thead>
              <tbody>
                {listFacturesPatient.map(
                  ({ civilitepatient, typesejour, numerofacture, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, restepatientfacture, }, i) => (
                    <tr key={i} style={{ cursor: "pointer" }}
                    // onClick={() => handleClickOpen(numerofacture)}
                    >
                      <td className="font-weight-bold">{i + 1}</td>
                      <td className="font-weight-bold">{numerofacture}</td>
                      <td>{datefacture}</td>
                      <td>{heurefacture}</td>
                      <td className="font-weight-bold">{civilitepatient} {nompatient} {prenomspatient}</td>
                      <td>{typesejour}</td>
                      <td>{auteurfacture}</td>
                      <td>{montanttotalfacture} FCFA</td>
                      <td>{partassurancefacture} FCFA</td>
                      <td>{resteassurancefacture} FCFA</td>
                      <td className="font-weight-bold">{partpatientfacture} FCFA</td>
                      <td className={restepatientfacture < 0 && "flash animated infinite red-text font-weight-bold"}>
                        {restepatientfacture} FCFA
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    factureReducer: { listFacturesPatient, currentFacture, showModal, currentPatient },
  } = state;
  return { listFacturesPatient, currentFacture, showModal, currentPatient };
};

const FacturePatientConnected = connect(mapStateToProps, {
  thunkListFacturesPatient,
  thunkEncaisserFactures,
  thunkDetailsFacture,
  setShowModal,
})(FacturePatient);

export default FacturePatientConnected;