import React, { useEffect, useState, useContext, useRef } from "react";
import { connect } from "react-redux";
import Chart from 'chart.js'
import GlobalContext, { Info } from "../../../global/context";
import moment from 'moment'
import LogDoc from '../../documents/bordereau'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {
    thunkListLogs
} from "../../api/administration/logs";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PrintIcon from '@material-ui/icons/Print';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import ListAltIcon from '@material-ui/icons/ListAlt';
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
    Slide,
    Snackbar,
    withStyles,
} from "@material-ui/core";
import Axios from "axios";
import { header } from "../../../global/apiQuery";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { separate } from "../../../global/functions";
import { useSpeechSynthesis } from 'react-speech-kit';
import useSpeechRecognition from "react-speech-kit/dist/useSpeechRecognition";

const Transition = React.forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });
function PaperComponent(props) { return (<div className="row" {...props} ></div>); }
function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }
const Input = withStyles({
    root: {
        "& label.Mui-focused": { color: Info.theme.primary, },
        "& .MuiInput-underline:after": { borderBottomColor: Info.theme.primary, },
        "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: Info.theme.primary, }, },
    },
})(TextField);
const Log = ({
    listLogs,
    loading,
    thunkListLogs,
    setLoading,
}) => {

    const global = useContext(GlobalContext);
    const [inputs, setinputs] = useState({

    })
    const columnsLog = [

    ]

    return (
        <div className="Facturesvalides row p-2">
            <div className="col-12 mb-2">
                <div className="row mb-2 d-flex justify-content-center">
                    <FormControl variant="filled" size="small" className="col">
                        <InputLabel id="typesejour-label">Type de sejour </InputLabel>
                        <Select
                            labelId="typesejour-label"
                            defaultValue={"Tous"}
                            id="typesejour"
                            onChange={({ target: { value } }) => {


                            }}
                            label="Type de sejour "
                            style={{ fontSize: "12px" }}
                        >
                            <MenuItem style={{ fontSize: "12px" }} value={"Tous"}>Tous</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"Création"}>Création</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"Suppression"}>Suppression</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"Modification"}>Modification</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"Validation"}>Validation</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" size="small" className="col ml-2">
                        <InputLabel id="objetlog-label">Objet</InputLabel>
                        <Select
                            labelId="objetlog-label"
                            id="objetlog"
                            defaultValue={inputs.objetlog}
                            onChange={({ target: { value } }) => {

                            }}
                            label="Type de sejour "
                            style={{ fontSize: "12px" }}
                        >
                            <MenuItem style={{ fontSize: "12px" }} value={"tous"}>Tous</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"patient"}>Patients</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"séjour"}>Séjours</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"facture"}>Factures</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"bordereau"}>Bordereaux</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                        <KeyboardDatePicker className='col mx-2' label='Du' id="datedebut" defaultValue={new Date("01/01/2020")} value={inputs.debutDate} format="dd/MM/yyyy" onChange={
                            (date) => {

                            }
                        } />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                        <KeyboardDatePicker className='col' label='Au' id="datefin" defaultValue={new Date("12/31/2020")} value={inputs.finDate} format="dd/MM/yyyy" onChange={
                            (date) => {

                            }} />
                    </MuiPickersUtilsProvider>
                    <Chip
                        className="col"
                        label="Log(s)"
                        avatar={
                            <Avatar
                                className="white-text"
                                style={{ backgroundColor: global.theme.primary }}
                            >{listLogs.length}</Avatar>
                        }
                    />
                </div>
            </div>
            <table className="table-sm col-12 table-hover table-striped">
                <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                    <tr>{columnsLog.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                </thead>
                <tbody>
                    {listLogs
                        .map(
                            ({ datelog, heurelog, typelog, actionlog, operationlog, auteurlog }, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td className="font-weight-bold">{datelog}</td>
                                    <td className="font-weight-bold">{heurelog}</td>
                                    <td className="font-weight-bold">{typelog}</td>
                                    <td className="font-weight-bold">{actionlog}</td>
                                    <td>{auteurlog}</td>
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
