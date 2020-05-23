import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import {
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
} from "../../api/caisse/factures";
import { socket } from "../../../global/apiQuery";
import {
  TextField,
  Avatar,
  Chip,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";

const AttenteFacture = ({
  listFacturesAttentes,
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
}) => {
  const [value] = useState("");
  const [open, setOpen] = useState(false);
  const [inputs, setinput] = useState({
    modepaiement: "",
    montantrecu: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  function setmode() {
    setinput({ ...inputs, modepaiement: value });
  }
  function setmontant(value) {
    setinput({ ...inputs, montantrecu: value });
  }

  const handleClose = () => {
    setinput({});
    setOpen(false);
  };
  const [columns] = useState([
    "N°",
    "Numero",
    "Date",
    "Heure",
    "Patient",
    "Auteur",
    "Montant",
    "Reste à payer",
  ]);
  const global = useContext(GlobalContext);
  function researching({ target: { value } }) {
    setmontant(value);
    // thunkSearchPatient(value.trim());
  }

  useEffect(() => {
    thunkListFacturesAttentes();
    socket.on("facture_nouvelle", () => {
      thunkListFacturesAttentes();
    });
  }, []);
  return (
    <div className="AttenteFacture row p-2">
      {listFacturesAttentes.length === 0 ? (
        <div className="col-12 text-secondary text-center">
          <h3 className="text-center lead">Aucune facture en attente</h3>
        </div>
      ) : (
        <>
          <div className="col-12">
            <div className="row mb-2">
              <TextField
                className="col-2"
                variant="outlined"
                size="small"
                label="Rechercher une facture"
                value={value}
                onChange={(ev) => researching(ev)}
              />
              <div className="col text-right">
                <Chip
                  label="facture(s)"
                  avatar={
                    <Avatar
                      className="white-text"
                      style={{ backgroundColor: global.theme.primary }}
                    >
                      {listFacturesAttentes.length}
                    </Avatar>
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                  <TableHead
                    style={{ backgroundColor: global.theme.secondaryDark }}
                  >
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
                    {listFacturesAttentes.map(
                      (
                        {
                          numerofacture,
                          datefacture,
                          heurefacture,
                          auteurfacture,
                          nompatient,
                          prenomspatient,
                          prixacte,
                        },
                        i
                      ) => (
                        <TableRow
                          key={i}
                          style={{ cursor: "pointer" }}
                          onClick={handleClickOpen}
                        >
                          <TableCell
                            style={{ fontSize: "13px" }}
                            component="th"
                            scope="row"
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {numerofacture}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {datefacture}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {heurefacture}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {nompatient} {prenomspatient}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {auteurfacture}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {prixacte} FCFA
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {prixacte} FCFA
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle className="text-center" id="alert-dialog-title">
          <b>Facture N° 85df54</b>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="row my-3 mx-1 d-flex flex-column">
                <small>
                  <b>(2020135 -006)</b> Koffi edy
                </small>
                <small>
                  <b>Montant total</b> : 15 000 FCFA
                </small>
                <small>
                  <b>Reste à payer</b> : 2500 FCFA
                </small>
              </div>
              <div className="row my-3 mx-1">
                <FormControl variant="outlined" size="small" className="col">
                  <InputLabel id="typesejour-label">
                    Mode de paiement
                  </InputLabel>
                  <Select
                    labelId="typesejour-label"
                    id="typesejour"
                    value={inputs.modepaiment}
                    onChange={setmode}
                    label="Mode de paiement"
                    style={{ fontSize: "13px" }}
                  >
                    <MenuItem
                      style={{ fontSize: "13px" }}
                      value={"consultation"}
                    >
                      Chèque
                    </MenuItem>
                    <MenuItem style={{ fontSize: "13px" }} value={"urgence"}>
                      Espèces
                    </MenuItem>
                    <MenuItem style={{ fontSize: "13px" }} value={"imagerie"}>
                      Électronique
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: "13px" }}
                      value={"hospitalisation"}
                    >
                      Mobile money
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className="col-5 ml-2"
                  variant="outlined"
                  size="small"
                  label="Montant recu"
                  value={inputs.montantrecu}
                  onChange={(ev) => researching(ev)}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="mb-2 bg-light"
            onClick={handleClose}
            style={{
              textTransform: "none",
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            className="mb-2"
            onClick={handleClose}
            style={{
              textTransform: "none",
              color: "white",
              backgroundColor: global.theme.primary,
            }}
          >
            Générer le reçu de paiement
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    factureReducer: { listFacturesAttentes },
  } = state;
  return { listFacturesAttentes };
};

const AttenteFactureConnected = connect(mapStateToProps, {
  thunkListFacturesAttentes,
  thunkEncaisserFactures,
  thunkAnnulerFactures,
})(AttenteFacture);
export default AttenteFactureConnected;
