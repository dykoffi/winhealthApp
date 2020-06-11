import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {
    thunkAddAssurance,
    thunkListAssurances,
    thunkDeleteAssurance,
    thunkUpdateAssurance,
    thunkDetailsAssurance,
    thunkSearchAssurance,
} from "../../api/assurance/assurances";
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

const Assurance = ({
    thunkAddAssurance,
    thunkListAssurances,
    thunkDeleteAssurance,
    thunkUpdateAssurance,
    thunkDetailsAssurance,
    thunkSearchAssurance,
    currentAssurance,
    loading,
}) => {
    const [value, setValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [listAssurances, setListAssurances] = useState([]);
    const [inputs, setinput] = useState({ debutDate: new Date(), finDate: new Date() });


    const handleClickOpen = (idAssurance) => { thunkDetailsAssurance(idAssurance); };
    const handleClose = () => { setShowModal(false); setinput({}); };
    function sendData(data) { thunkAddAssurance(data); handleClose(); }

    function setdebutDate(value) { setinput({ ...inputs, debutDate: value }); }
    function setfinDate(value) { setinput({ ...inputs, finDate: value }); }

    const [columns] = useState([
        "N°",
        "Nom",
        "Code",
        "Type",
        "Adresse",
        "Téléphone",
        "Fax",
        "Mail",
        "Site web",
    ]);

    const global = useContext(GlobalContext);

    function researching({ target: { value } }) {
        setValue(value);
        thunkSearchAssurance(value.trim());
    }

    useEffect(() => {
        Axios({ url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => {
            const assurances = [];
            rows.forEach(({ idassurance, nomassurance }) => { assurances.push({ value: idassurance, label: nomassurance }); });
            setListAssurances(assurances);
        });
    }, []);

    return (
        <div className="Assurance row p-2">
            <div className="col-12">
                <div className="row mb-2">
                    <Autocomplete
                        size="small"
                        className="col-2 p-0"
                        id="assurancesList"
                        options={listAssurances}
                        onChange={(event, newValue) => { console.log(newValue) }}
                        getOptionLabel={(option) => option.label}
                        filterSelectedOptions
                        renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Gestionnaire"
                                placeholder="Ajouter ..."
                            />
                        )}
                    />
                    <small className="ml-3">Du</small>
                    <div className="col-2">
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={frLocale}
                        >
                            <KeyboardDatePicker
                                id="datedebut"
                                format="dd/MM/yyyy"
                                value={inputs.debutDate}
                                onChange={setdebutDate}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <small className="mx-1">Au</small>
                    <div className="col-2">
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={frLocale}
                        >
                            <KeyboardDatePicker
                                id="datedebut"
                                format="dd/MM/yyyy"
                                value={inputs.finDate}
                                onChange={setfinDate}
                            />

                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="col">
                        <Chip
                            label="Facture(s)"
                            avatar={<Avatar className="white-text" style={{ backgroundColor: global.theme.primary }}>{listAssurances.length}</Avatar>}
                        />
                    </div>
                </div>
            </div>
            {listAssurances.length === 0 ? (
                <div className="col-12 text-secondary text-center">
                    <h6 className="text-center lead">Aucune facture retrouvée</h6>
                    <small>il n'existe pas de facture pour l'assurance dans cette période.</small>
                </div>
            ) : (
                    <table className="table-sm col-12 table-hover">
                        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                            <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                        </thead>
                        <tbody>
                            {listAssurances.map(
                                ({ nomassurance, codeassurance, typeassurance, localassurance, telassurance, faxassurance, mailassurance, siteassurance }, i) => (
                                    <tr key={i} style={{ cursor: "pointer" }} onClick={() => handleClickOpen(nomassurance)}>
                                        <td>{i + 1}</td>
                                        <td className="font-weight-bold">{nomassurance}</td>
                                        <td>{codeassurance}</td>
                                        <td>{typeassurance}</td>
                                        <td>{localassurance}</td>
                                        <td>{telassurance}</td>
                                        <td>{faxassurance}</td>
                                        <td>{mailassurance}</td>
                                        <td>{siteassurance}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                )}
        </div>
    );
};

const mapStateToProps = (state) => {
    const {
        assuranceReducer: { currentAssurance, loading },
    } = state;
    return { currentAssurance, loading };
};

const AssuranceConnected = connect(mapStateToProps, {
    thunkAddAssurance,
    thunkListAssurances,
    thunkDeleteAssurance,
    thunkUpdateAssurance,
    thunkDetailsAssurance,
    thunkSearchAssurance,
})(Assurance);
export default AssuranceConnected;
