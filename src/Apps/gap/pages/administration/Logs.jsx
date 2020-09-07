import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import moment from 'moment'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import MuiAlert from '@material-ui/lab/Alert';
import {
    thunkListLogs
} from "../../api/administration/logs";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
} from "@material-ui/core";
import Axios from "axios";
import { header } from "../../../global/apiQuery";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }
const Log = ({
    listLogs,
    loading,
    thunkListLogs,
    setLoading,
}) => {

    const global = useContext(GlobalContext);
    const [listusers, setlistusers] = useState()
    const [inputs, setinputs] = useState({
        user: "",
        typelog: "tous",
        objetlog: "tous",
        debutDate: new Date("2020-08-01"),
        finDate: new Date("2020-08-31"),
    })
    const columnsLog = [
        "N°",
        "Date",
        "Heure",
        "Auteur",
        "type",
        "Opération",
        "Objet",
    ]

    function setuser(value) { setinputs({ ...inputs, user: value }) }
    function settypelog(value) { setinputs({ ...inputs, typelog: value }) }
    function setobjetlog(value) { setinputs({ ...inputs, objetlog: value }) }
    function setdebutDate(value) { setinputs({ ...inputs, debutDate: value }) }
    function setfinDate(value) { setinputs({ ...inputs, finDate: value }) }
    useEffect(() => {
        thunkListLogs()
        Axios({ url: `${header.url}/gap/list/logs_users` })
            .then(({ data: { rows } }) => { setlistusers(rows) })
    }, [inputs])

    const typeLog = {
        tous: ["CREATION", "SUPPRESSION", "MODIFICATION", "VALIDATION", "CONNEXION"],
        creation: ["CREATION"],
        modification: ["MODIFICATION"],
        suppression: ["SUPPRESSION"],
        validation: ["VALIDATION"],
        connexion: ["CONNEXION"]
    }

    const objetLog = {
        tous: ["Bordereau", "Facture", "Patient", "Encaissement", "Utilisateur", "Sejour"],
        bordereau: ["Bordereau"],
        facture: ["Facture"],
        patient: ["Patient"],
        encaissement: ["Encaissement"],
        utilisateur: ["Utilisateur"],
        sejour: ["Sejour"]
    }

    return (
        <div className="Facturesvalides row p-2">
            <div className="col-12 mb-2">
                <div className="row mb-2 d-flex justify-content-center">
                    <Autocomplete
                        size="small"
                        className="col p-0"
                        id="listusers"
                        options={listusers}
                        onChange={(event, newValue) => { newValue ? setuser(newValue.auteurlog) : setuser("") }}
                        getOptionLabel={(option) => option.auteurlog}
                        filterSelectedOptions
                        renderOption={(option) => (<><small>{option.auteurlog}</small></>)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Utilisateur"
                                variant="filled"
                                placeholder="Rechercher un utilisateur ..."
                            />
                        )}
                    />
                    <FormControl variant="filled" size="small" className="col ml-2">
                        <InputLabel id="typelog-label">Type de Log </InputLabel>
                        <Select
                            labelId="typelog-label"
                            defaultValue={"tous"}
                            id="typelog"
                            onChange={({ target: { value } }) => { settypelog(value) }}
                            label="Type de sejour "
                            style={{ fontSize: "12px" }}
                        >
                            <MenuItem style={{ fontSize: "12px" }} value={"tous"}>Tous</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"creation"}>Création</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"suppression"}>Suppression</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"modification"}>Modification</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"validation"}>Validation</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" size="small" className="col ml-2">
                        <InputLabel id="objetlog-label">Objet</InputLabel>
                        <Select
                            labelId="objetlog-label"
                            id="objetlog"
                            defaultValue={"tous"}
                            onChange={({ target: { value } }) => { setobjetlog(value) }}
                            label="Type de sejour "
                            style={{ fontSize: "12px" }}
                        >
                            <MenuItem style={{ fontSize: "12px" }} value={"tous"}>Tous</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"patient"}>Patients</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"sejour"}>Séjours</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"facture"}>Factures</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"bordereau"}>Bordereaux</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"encaissement"}>Encaissement</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"utilisateur"}>Utilisateur</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                        <KeyboardDatePicker className='col mx-2' label='Du' id="datedebut" defaultValue={inputs.debutDate} value={inputs.debutDate} format="dd/MM/yyyy" onChange={
                            (date) => {
                                setdebutDate(date)
                            }
                        } />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                        <KeyboardDatePicker className='col' label='Au' id="datefin" defaultValue={new Date("12/31/2020")} value={inputs.finDate} format="dd/MM/yyyy" onChange={
                            (date) => {
                                setfinDate(date)
                            }} />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
            <table className="table-sm col-12 table-hover table-striped">
                <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                    <tr>{columnsLog.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                </thead>
                <tbody>
                    {listLogs
                        .filter(log => typeLog[inputs.typelog].includes(log.typelog))
                        .filter(log => objetLog[inputs.objetlog].includes(log.objetlog))
                        .filter(log => moment(log.datelog).isBetween(moment(inputs.debutDate).subtract(1, 'days'), moment(inputs.finDate).add(1, "days")))
                        .filter(log => inputs.user.trim() === "" || RegExp(inputs.user, 'i').test(log.auteurlog))
                        .map(
                            ({ datelog, heurelog, typelog, actionlog, operationlog, objetlog, auteurlog }, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td className="font-weight-bold">{moment(datelog).format('DD/MM/YYYY')}</td>
                                    <td className="font-weight-bold">{heurelog}</td>
                                    <td>{auteurlog}</td>
                                    <td className="font-weight-bold">{typelog}</td>
                                    <td className="font-weight-bold">{operationlog}</td>
                                    <td className="font-weight-bold">{objetlog}</td>
                                </tr>
                            )
                        )}
                </tbody>
            </table>
            <Snackbar open={loading} onClose={() => setLoading(false)}>
                <Alert variant='standard' severity="info" >
                    Chargement ...
                </Alert>
            </Snackbar>
        </div >
    );
};
const mapStatToProps = state => {
    const { logsReducer: { listLogs } } = state
    return { listLogs }
}
const LogConnected = connect(mapStatToProps, { thunkListLogs })(Log)
export default LogConnected;
