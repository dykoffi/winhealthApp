import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext from "../../../global/context";
import moment from 'moment'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {
    thunkAddBordereau,
    thunkListFacturesByAssurances,
    thunkSendFacturesValides,
    setListFacturesValides,
    setListFacturesByAssurance,
    thunkDeleteFacturesValides,
    thunkListFactures,
    setShowModal,
    thunkDetailsFacture
} from "../../api/assurance/bordereaux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
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

const Facturesvalides = ({
    thunkListFacturesByAssurances,
    thunkListFactures,
    thunkSendFacturesValides,
    thunkDeleteFacturesValides,
    listFactures,
    listFacturesByAssurance,
    listFacturesValides,
    setListFacturesValides,
    currentFacture,
    showModal,
    thunkDetailsFacture,
    setShowModal,
    setListFacturesByAssurance
}) => {
    const [value, setValue] = useState("");
    const [tousSelectionner, settousSelectionner] = useState("");
    const [modal, setmodal] = useState(false);
    const [listAssurances, setListAssurance] = useState([]);
    const [inputs, setinput] = useState({
        nomassurance: "",
        nomgarant: "",
        typeSejour: "",
        debutDateString: moment().format('DD-MM-YYYY'),
        finDateString: moment().format('DD-MM-YYYY'),
        debutDate: new Date(),
        finDate: new Date()
    });

    const handleClose = () => {
        setmodal(false);
        setinput({
            nomassurance: "",
            nomgarant: "",
            typeSejour: "",
            debutDateString: moment().format('DD-MM-YYYY'),
            finDateString: moment().format('DD-MM-YYYY'),
            debutDate: new Date(),
            finDate: new Date()
        });
        setListFacturesValides([])
        setListFacturesByAssurance([])
        settousSelectionner(false)
    };

    function setdebutDate(value) { setinput({ ...inputs, debutDate: value, debutDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function setfinDate(value) { setinput({ ...inputs, finDate: value, finDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function settype(value) { setinput({ ...inputs, typeSejour: value }) }
    function setassurance(value) { setinput({ ...inputs, nomassurance: value }) }
    function setgarant(value) { setinput({ ...inputs, nomgarant: value }) }

    const columns = [
        "N°",
        "N°facture",
        "Date",
        "Heure",
        "Gestionnaire",
        "Organisme",
        "Type de sejour",
        "N° PEC",
        "Matricule Assuré",
        "Taux",
        "Patient",
        "Assuré Princ",
        "Montant Total",
        "Part Assu",
        "Reste assurance",
        "Part patient",
    ]
    const global = useContext(GlobalContext);

    useEffect(() => {
        thunkListFactures()
        Axios({ url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => {
            const Assurance = [];
            rows.forEach(({ idassurance, nomassurance }) => { Assurance.push({ value: idassurance, label: nomassurance }); });
            setListAssurance([{ value: "Tous", label: "Tous" }, ...Assurance]);
        });
    }, []);

    useEffect(() => {
        setListFacturesValides([])
    }, [inputs.nomassurance, inputs.typeSejour])

    return (
        <div className="Facturesvalides row p-2">
            <div className="col-12">
                <div className="row">
                    <TextField
                        className="col-2"
                        variant="outlined"
                        size="small"
                        label="Rechercher une facture"
                        value={value}
                        onChange={({ target: { value } }) => { setValue(value) }}
                    />
                    <div className="col-2">
                        <Chip
                            label="Facture(s) valide(s)"
                            avatar={
                                <Avatar
                                    className="white-text"
                                    style={{ backgroundColor: global.theme.primary }}
                                >
                                    {listFactures.filter(facture => facture.statutfactures === 'valide').filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture)).length}
                                </Avatar>
                            }
                        />
                    </div>
                    <div className="col d-flex justify-content-end p-0">
                        <Button
                            variant="contained"
                            onClick={() => setmodal(true)}
                            startIcon={<AssignmentTurnedInIcon />}
                            style={{
                                textTransform: "none",
                                backgroundColor: global.theme.primary,
                                color: "white",
                                fontSize: "11px",
                            }}
                        >
                            Valider des factures
                        </Button>
                    </div>
                </div>
            </div>
            <table className="table-sm col-12 table-hover table-striped my-2">
                <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                    <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                </thead>
                <tbody>
                    {listFactures.filter(facture => facture.statutfactures === 'valide').filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture)).map(
                        ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour }, i) => (
                            <tr
                                key={i}
                                style={{ cursor: "pointer" }}
                                onClick={() => { thunkDetailsFacture(numerofacture) }}
                            >
                                <td>{i + 1}</td>
                                <td>{numerofacture}</td>
                                <td>{datefacture}</td>
                                <td>{heurefacture}</td>
                                <td className="font-weight-bold">{gestionnaire}</td>
                                <td className="font-weight-bold">{organisme}</td>
                                <td className="font-weight-bold">{typesejour}</td>
                                <td className="font-weight-bold">{numeropec}</td>
                                <td className="font-weight-bold">{matriculeassure}</td>
                                <td className="font-weight-bold">{taux}%</td>
                                <td className="font-weight-bold">{nompatient} {prenomspatient}</td>
                                <td className="font-weight-bold">{assureprinc}</td>
                                <td>{montanttotalfacture} FCFA</td>
                                <td className="font-weight-bold">{partassurancefacture} FCFA</td>
                                <td className="font-weight-bold">{resteassurancefacture} FCFA</td>
                                <td>{partpatientfacture} FCFA</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            <Dialog
                open={modal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick
                transitionDuration={0}
                fullWidth={true}
                style={{ minHeight: "60vh" }}
                maxWidth="lg"
            >
                <DialogTitle
                    className="text-center text-secondary"
                    id="alert-dialog-title"
                >
                    <b>Valider des factures conformes</b>
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
                                    newValue && inputs.typeSejour.trim() !== "" &&
                                        inputs.nomgarant.trim() !== "" &&
                                        thunkListFacturesByAssurances({ ...inputs, nomassurance: newValue.label })
                                }}
                                getOptionLabel={(option) => option.label}
                                filterSelectedOptions
                                renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                                renderInput={(params) => (<TextField {...params} variant="outlined" label="Gestionnaire" placeholder="Ajouter ..." />)}
                            />
                            <Autocomplete
                                size="small"
                                className="col-2 p-0 mx-2"
                                options={listAssurances}
                                onChange={(event, newValue) => {
                                    newValue && setgarant(newValue.label)
                                    newValue && inputs.typeSejour.trim() !== "" &&
                                        inputs.nomassurance.trim() !== "" &&
                                        thunkListFacturesByAssurances({ ...inputs, nomgarant: newValue.label })
                                }}
                                getOptionLabel={(option) => option.label}
                                filterSelectedOptions
                                renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                                renderInput={(params) => (<TextField {...params} variant="outlined" label="Garant" placeholder="Selectionner ..." />)}
                            />
                            <FormControl variant="outlined" size="small" className="col-2">
                                <InputLabel id="typesejour-label">Type de sejour </InputLabel>
                                <Select
                                    labelId="typesejour-label"
                                    id="typesejour"
                                    onChange={({ target: { value } }) => {
                                        settype(value)
                                        inputs.nomassurance.trim() !== "" &&
                                            inputs.nomgarant.trim() !== "" &&
                                            thunkListFacturesByAssurances({ ...inputs, typeSejour: value })
                                    }}
                                    label="Type de sejour "
                                    style={{ fontSize: "12px" }}
                                >
                                    <MenuItem style={{ fontSize: "12px" }} value={"Tous"}>Tous</MenuItem>
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
                    </div>
                    <table className="table-sm col-12 table-hover table-striped my-2">
                        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                            <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                        </thead>
                        <tbody>
                            {listFacturesByAssurance.filter(facture => facture.statutfactures === 'recu').map(
                                ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour }, i) => (
                                    <tr
                                        key={i}
                                        className={listFacturesValides.includes(numerofacture) ? "bgcolor-primary font-weight-bold white-text" : ""}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            if (listFacturesValides.includes(numerofacture)) {
                                                listFacturesValides.splice(listFacturesValides.indexOf(numerofacture), 1)
                                                setListFacturesValides([...listFacturesValides])
                                                settousSelectionner(false)
                                            } else {
                                                if ([...listFacturesValides, numerofacture].length === listFacturesByAssurance.filter(facture => facture.statutfactures === 'recu').length) {
                                                    settousSelectionner(true)
                                                }
                                                setListFacturesValides([...listFacturesValides, numerofacture])
                                            }
                                        }} >
                                        <td>{i + 1}</td>
                                        <td>{numerofacture}</td>
                                        <td>{datefacture}</td>
                                        <td>{heurefacture}</td>
                                        <td className="font-weight-bold">{gestionnaire}</td>
                                        <td className="font-weight-bold">{organisme}</td>
                                        <td className="font-weight-bold">{typesejour}</td>
                                        <td className="font-weight-bold">{numeropec}</td>
                                        <td className="font-weight-bold">{matriculeassure}</td>
                                        <td className="font-weight-bold">{taux}%</td>
                                        <td className="font-weight-bold">{nompatient} {prenomspatient}</td>
                                        <td className="font-weight-bold">{assureprinc}</td>
                                        <td>{montanttotalfacture} FCFA</td>
                                        <td className="font-weight-bold">{partassurancefacture} FCFA</td>
                                        <td className="font-weight-bold">{resteassurancefacture} FCFA</td>
                                        <td>{partpatientfacture} FCFA</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    {listFacturesByAssurance.filter(facture => facture.statutfactures === 'recu').length !== 0 &&
                        <>
                            <div onClick={() => {
                                if (tousSelectionner) {
                                    setListFacturesValides([])
                                    settousSelectionner(false)
                                } else {
                                    setListFacturesValides(
                                        listFacturesByAssurance
                                            .filter(facture => facture.statutfactures === 'recu')
                                            .map(facture => facture.numerofacture)
                                    )
                                    settousSelectionner(true)
                                }
                            }} style={{ display: "inline" }}>
                                <Chip

                                    className={`mr-2 ${tousSelectionner ? "bgcolor-secondaryDark text-white font-weight-bold" : ""}`}
                                    style={{ cursor: "pointer" }}
                                    label="Tous selectionner"
                                />
                            </div>
                            <Chip
                                label="Sélectionnée(s)"
                                avatar={<Avatar className="white-text" style={{ backgroundColor: global.theme.primary }} > {listFacturesValides.length} </Avatar>}
                            />
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleClose}
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
                        onClick={() => {
                            thunkSendFacturesValides(listFacturesValides)
                            handleClose()
                        }}
                        disabled={listFacturesValides.length === 0}
                        startIcon={<AssignmentTurnedInIcon />}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "11px",
                        }}
                    >
                        Valider les factures
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showModal}
                onClose={() => { setShowModal(false) }}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                transitionDuration={0}
                fullWidth={true}
                maxWidth="xs"
            >
                <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
                    <b>Facture N° {currentFacture.numerofacture}</b>
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-12">
                            <div className="row mx-1">
                                <div className="col-6 p-0">
                                    <small><b>Patient : </b>{currentFacture.nompatient}{" "} {currentFacture.prenomspatient}</small><br />
                                    <small><b>Type de sejour : </b>{currentFacture.typesejour}</small><br />
                                    <small><b>Date : </b>{currentFacture.datefacture} {currentFacture.heurefacture}</small><br />
                                    <hr className="bg-light" />
                                    {currentFacture.gestionnaire !== "" && (
                                        <>
                                            <small><b>Gestionnaire : </b> {currentFacture.gestionnaire}</small><br />
                                            <small><b>Garant : </b> {currentFacture.organisme}</small><br />
                                            <small><b>Assure princ : </b> {currentFacture.assureprinc}</small><br />
                                            <small><b>Taux : </b> {currentFacture.taux}%</small><br />
                                            <small><b>Montant total : </b> {currentFacture.montanttotalfacture} FCFA</small><br />
                                            <small><b>Part Assurance : </b> {currentFacture.partassurancefacture} FCFA</small><br />
                                        </>
                                    )}
                                </div>
                                <div className="col-6 text-right"></div>
                            </div>
                            <div className="col-12 d-flex justify-content-center mt-4">
                                <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                                <small className="font-weight-bold">
                                    Le retrait et la modification de la facture sont des actions sans confirmation et irréversibles</small>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        className="mb-2"
                        startIcon={<CancelIcon />}
                        onClick={() => { setShowModal(false) }}
                        style={{
                            textTransform: "none",
                            fontSize: "13px",
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        className="mb-2 red text-white"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => { thunkDeleteFacturesValides(currentFacture.numerofacture) }}
                        style={{
                            textTransform: "none",
                            fontSize: "13px",
                        }}
                    >
                        Retirer
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

const mapStatToProps = state => {
    const { bordereauReducer: { listFacturesByAssurance, listFacturesValides, listFactures, currentFacture, showModal } } = state
    return { listFacturesByAssurance, listFacturesValides, listFactures, currentFacture, showModal, }
}
const FacturesvalidesConnected = connect(mapStatToProps, { thunkSendFacturesValides, thunkListFactures, thunkAddBordereau, thunkListFacturesByAssurances, thunkDeleteFacturesValides, setListFacturesValides, setListFacturesByAssurance, setShowModal, thunkDetailsFacture })(Facturesvalides)
export default FacturesvalidesConnected;
