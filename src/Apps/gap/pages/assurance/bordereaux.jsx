import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import moment from 'moment'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {
    thunkAddBordereau,
    thunkListFacturesByAssurances,
    listFactures
} from "../../api/assurance/bordereaux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
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
import SearchIcon from '@material-ui/icons/Search'

const Bordereau = ({
    thunkAddBordereau,
    thunkListFacturesByAssurances,
    listFactures
}) => {
    const [value, setValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [listAssurances, setListAssurance] = useState([]);
    const [inputs, setinput] = useState({
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

    const [columns] = useState(["N°", "N°facture", "Date", "Heure", "Type de sejour", "Patient", "Medecin", "Auteur", "Montant Total", "Part Assu", "Reste assurance", "Part patient", "Reste patient",]);
    const global = useContext(GlobalContext);

    useEffect(() => {
        sendData()
        Axios({ url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => {
            const Assurance = [];
            rows.forEach(({ idassurance, nomassurance }) => { Assurance.push({ value: idassurance, label: nomassurance }); });
            setListAssurance(Assurance);
        });
    }, []);

    return (
        <div className="Bordereau row p-2">
            <div className="col-12">
                <div className="row mb-2">
                    <Autocomplete
                        size="small"
                        className="col-2 p-0"
                        id="AssuranceList"
                        options={listAssurances}
                        onChange={(event, newValue) => { setassurance(newValue.label) }}
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
                            onChange={settype}
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
                    <small className="ml-3">Du</small>
                    <div className="col-2">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                            <KeyboardDatePicker id="datedebut" value={inputs.debutDate} format="dd/MM/yyyy" onChange={setdebutDate} />
                        </MuiPickersUtilsProvider>
                    </div>
                    <small className="mx-1">Au</small>
                    <div className="col-2">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                            <KeyboardDatePicker id="datedebut" value={inputs.finDate} format="dd/MM/yyyy" onChange={setfinDate} />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="col">
                        <Chip label="Facture(s)" avatar={<Avatar className="white-text" style={{ backgroundColor: global.theme.primary }}>{listFactures.length}</Avatar>}
                        />
                    </div>
                    <Button
                        disableElevation
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={sendData}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "11px",
                        }}
                    >
                        Liste des facture
                        </Button>
                </div>
            </div>
            {listFactures.length === 0 ? (
                <div className="col-12 text-secondary text-center">
                    <h6 className="text-center lead">Aucune facture retrouvée</h6>
                    <small>Il n'existe pas de facture pour l'Assurance {inputs.assurance} dans la période du {moment(inputs.debutDate.toString()).format('DD MMMM YYYY')} au {moment(inputs.finDate.toString()).format('DD MMMM YYYY')}.</small>
                </div>
            ) : (
                    <table className="table-sm col-12 table-hover table-striped">
                        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                            <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                        </thead>
                        <tbody>
                            {listFactures.map(
                                ({ civilitepatient, numerofacture, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, restepatientfacture, typesejour }, i) => (
                                    <tr key={i} style={{ cursor: "pointer" }} >
                                        <td>{i + 1}</td>
                                        <td>{numerofacture}</td>
                                        <td>{datefacture}</td>
                                        <td>{heurefacture}</td>
                                        <td>{typesejour}</td>
                                        <td>{civilitepatient} {nompatient} {prenomspatient}</td>
                                        <td>Wilfried GBADJE</td>
                                        <td>{auteurfacture}</td>
                                        <td>{montanttotalfacture} FCFA</td>
                                        <td>{partassurancefacture} FCFA</td>
                                        <td>{resteassurancefacture} FCFA</td>
                                        <td>{partpatientfacture} FCFA</td>
                                        <td className={restepatientfacture < 0 && "flash animated infinite red-text font-weight-bold"}>
                                            {restepatientfacture} FCFA
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                )}
        </div>
    );
};

const mapStatToProps = state => {
    const { bordereauReducer: { listFactures } } = state
    return { listFactures }
}
const BordereauConnected = connect(mapStatToProps, { thunkAddBordereau, thunkListFacturesByAssurances })(Bordereau)
export default BordereauConnected;
