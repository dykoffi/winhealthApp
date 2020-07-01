import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import moment from 'moment'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {
    thunkAddBordereau,
    thunkListFacturesByAssurances,
    setListFacturesRecues,
    setListFacturesValides
} from "../../api/assurance/bordereaux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AddIcon from '@material-ui/icons/Add'

import {
    TextField,
    Avatar,
    Chip,
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
import Axios from "axios";
import { header } from "../../../global/apiQuery";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const Bordereau = ({
    thunkListFacturesByAssurances,
    listFactures,
    listFacturesRecues,
    setListFacturesRecues,
}) => {

    const [value, setValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [listAssurances, setListAssurance] = useState([]);
    const [inputs, setinput] = useState({
        nomassurance: "",
        typeSejour: "",
        debutDateString: moment().format('DD-MM-YYYY'),
        finDateString: moment().format('DD-MM-YYYY'),
        debutDate: new Date(),
        finDate: new Date()
    });


    const handleClose = () => { setShowModal(false); setinput({}); };
    function setdebutDate(value) {
        setinput({
            ...inputs,
            debutDate: value,
            debutDateString: moment(value.toString()).format('DD-MM-YYYY')
        })
    }
    function setfinDate(value) {
        setinput({
            ...inputs,
            finDate: value,
            finDateString: moment(value.toString()).format('DD-MM-YYYY')
        })
    }

    function settype(value) { setinput({ ...inputs, typeSejour: value }) }
    function setassurance(value) { setinput({ ...inputs, assurance: value }) }
    function sendData() { thunkListFacturesByAssurances(inputs) }

    const columns = ["N°", "N°facture", "Date", "Heure", "Type de sejour", "Patient", "Medecin", "Auteur", "Montant Total", "Part Assu", "Reste assurance", "Part patient", "Reste patient",]
    const global = useContext(GlobalContext);

    useEffect(() => {
        sendData()
        Axios({ url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => {
            const Assurance = [];
            rows.forEach(({ idassurance, nomassurance }) => { Assurance.push({ value: idassurance, label: nomassurance }); });
            setListAssurance(Assurance);
        });
    }, []);

    useEffect(() => {
        setListFacturesRecues([])
    }, [inputs.assurance, inputs.typeSejour])

    return (
        <div className="Bordereau row p-2">
            <Button
                variant="contained"
                onClick={() => setShowModal(true)}
                startIcon={<AddIcon />}
                style={{
                    textTransform: "none",
                    backgroundColor: global.theme.primary,
                    color: "white",
                    fontSize: "11px",
                }}
            >
                Nouveau borderau
            </Button>
            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                style={{ minHeight: "60vh" }}
                maxWidth="lg"
            >
                <DialogTitle
                    className="text-center text-secondary"
                    id="alert-dialog-title"
                >
                    <b>Creer un bordereau</b>
                </DialogTitle>
                <DialogContent>
                    <div className="col-12">
                        <div className="row mb-2 d-flex justify-content-center">
                            <Autocomplete
                                size="small"
                                className="col-2 p-0"
                                id="AssuranceList"
                                options={listAssurances}
                                onChange={(event, newValue) => {
                                    newValue && setassurance(newValue.label)
                                    newValue && thunkListFacturesByAssurances({ ...inputs, assurance: newValue.label })
                                }}
                                getOptionLabel={(option) => option.label}
                                filterSelectedOptions
                                renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                                renderInput={(params) => (<TextField {...params} variant="outlined" label="Gestionnaire" placeholder="Ajouter ..." />)}
                            />
                            <FormControl variant="outlined" size="small" className="col-2 ml-2">
                                <InputLabel id="typesejour-label">Type de sejour </InputLabel>
                                <Select
                                    labelId="typesejour-label"
                                    id="typesejour"
                                    onChange={({ target: { value } }) => {
                                        settype(value)
                                        thunkListFacturesByAssurances({ ...inputs, typeSejour: value })
                                    }}
                                    label="Type de sejour "
                                    style={{ fontSize: "12px" }}
                                >
                                    <MenuItem style={{ fontSize: "12px" }} value={"Consultation"}>Consultation</MenuItem>
                                    <MenuItem style={{ fontSize: "12px" }} value={"Urgence"}>Urgence</MenuItem>
                                    <MenuItem style={{ fontSize: "12px" }} value={"Biologie"}>Biologie</MenuItem>
                                    <MenuItem style={{ fontSize: "12px" }} value={"Imagerie"}>Imagerie</MenuItem>
                                    <MenuItem style={{ fontSize: "12px" }} value={"hospitalisation"}>Hospitalisation</MenuItem>
                                    <MenuItem style={{ fontSize: "12px" }} value={"Soins"}>Soins</MenuItem>
                                </Select>
                            </FormControl>
                            <small className="mx-2">Du</small>
                            <div className="col-2">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                                    <KeyboardDatePicker id="datedebut" value={inputs.debutDate} format="dd/MM/yyyy" onChange={
                                        (date) => {
                                            setdebutDate(date)
                                            thunkListFacturesByAssurances({
                                                ...inputs,
                                                debutDate: date,
                                                debutDateString: moment(date.toString()).format('DD-MM-YYYY')
                                            })
                                        }
                                    } />
                                </MuiPickersUtilsProvider>
                            </div>
                            <small className="mx-2">Au</small>
                            <div className="col-2">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                                    <KeyboardDatePicker id="datefin" value={inputs.finDate} format="dd/MM/yyyy" onChange={
                                        (date) => {
                                            setfinDate(date)
                                            thunkListFacturesByAssurances({
                                                ...inputs,
                                                finDate: date,
                                                finDateString: moment(date.toString()).format('DD-MM-YYYY')
                                            })
                                        }} />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <div className="col">
                            <small>(Etape 1) Veuillez selectionner les factures que vous avez recues</small>
                        </div>
                    </div>
                    {
                        <table className="table-sm col-12 table-hover table-striped my-3">
                            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                                <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                            </thead>
                            <tbody>
                                {listFactures.map(
                                    ({ civilitepatient, numerofacture, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, restepatientfacture, typesejour }, i) => (
                                        <tr
                                            key={i}
                                            className={listFacturesRecues.includes(numerofacture) ? "bgcolor-primary font-weight-bold white-text" : ""}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                if (listFacturesRecues.includes(numerofacture)) {
                                                    listFacturesRecues.splice(listFacturesRecues.indexOf(numerofacture), 1)
                                                    setListFacturesRecues([...listFacturesRecues])
                                                } else {
                                                    setListFacturesRecues([...listFacturesRecues, numerofacture])
                                                }
                                            }} >
                                            <td>{i + 1}</td>
                                            <td>{numerofacture}</td>
                                            <td>{datefacture}</td>
                                            <td>{heurefacture}</td>
                                            <td className="font-weight-bold">{typesejour}</td>
                                            <td className="font-weight-bold">{civilitepatient} {nompatient} {prenomspatient}</td>
                                            <td>Wilfried GBADJE</td>
                                            <td>{auteurfacture}</td>
                                            <td>{montanttotalfacture} FCFA</td>
                                            <td className="font-weight-bold">{partassurancefacture} FCFA</td>
                                            <td className="font-weight-bold">{resteassurancefacture} FCFA</td>
                                            <td>{partpatientfacture} FCFA</td>
                                            <td className={restepatientfacture < 0 && "flash animated infinite red-text font-weight-bold"}>
                                                {restepatientfacture} FCFA
                                        </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    }
                    <div className="col"><small>{listFacturesRecues.length} sélectionnée(s)</small></div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setShowModal(false)}
                        startIcon={<CancelIcon />}
                        style={{
                            textTransform: "none",
                            fontSize: "11px",
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setShowModal(true)}
                        startIcon={<AssignmentTurnedInIcon />}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "11px",
                        }}
                    >
                      (Etape 2) Validation
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStatToProps = state => {
    const { bordereauReducer: { listFactures, listFacturesRecues, listFacturesValides, } } = state
    return { listFactures, listFacturesRecues, listFacturesValides, }
}
const BordereauConnected = connect(mapStatToProps, { thunkAddBordereau, thunkListFacturesByAssurances, setListFacturesRecues, setListFacturesValides, })(Bordereau)
export default BordereauConnected;
