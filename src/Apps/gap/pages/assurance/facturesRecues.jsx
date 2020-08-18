import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import FactureNonRecuesDoc from '../../documents/facturesNonRecues'
import {
    thunkAddBordereau,
    thunkListFacturesByAssurances,
    thunkSendFacturesRecues,
    thunkDeleteFacturesRecues,
    thunkModifyFacture,
    setListFacturesRecues,
    setListFacturesByAssurance,
    thunkDetailsFacture,
    thunkListFactures,
    setShowDetailsFacture,
    setLoading
} from "../../api/assurance/bordereaux";

import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
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
    withStyles,
    Snackbar,
    Slide,
} from "@material-ui/core";
import Axios from "axios";
import GlobalContext, { Info } from "../../../global/context";
import { header } from "../../../global/apiQuery";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { separate } from "../../../global/functions";
import Alert from "@material-ui/lab/Alert";
const Transition = React.forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });
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
function PaperComponent(props) {
    return (
        <div className="row" {...props} ></div>
    );
}
const FacturesRecues = ({
    thunkListFacturesByAssurances,
    thunkSendFacturesRecues,
    thunkListFactures,
    thunkDeleteFacturesRecues,
    thunkModifyFacture,
    listFactures,
    currentFacture,
    listFacturesByAssurance,
    listFacturesRecues,
    setListFacturesRecues,
    showDetailsFacture,
    thunkDetailsFacture,
    setShowDetailsFacture,
    setLoading,
    loading,
    setListFacturesByAssurance
}) => {

    const global = useContext(GlobalContext);
    const [value, setValue] = useState("");
    const [tousSelectionner, settousSelectionner] = useState("");
    const [modal, setmodal] = useState(false);
    const [listAssurances, setListAssurance] = useState([]);
    const [pdf, setpdf] = useState(false);
    const [urlPDF, seturlPDF] = useState(false);
    const [inputModifs, setinputModif] = useState({
        gestionnaire: "",
        organisme: "",
        beneficiaire: "",
        matriculeAssure: "",
        assurePrinc: "",
        numeroPEC: "",
        taux: "",
    })
    const [inputs, setinput] = useState({
        nomassurance: "Tous",
        nomgarant: "Tous",
        typeSejour: "Tous",
        debutDateString: moment("2020-01-01").format('DD-MM-YYYY'),
        finDateString: moment("2020-12-31").format('DD-MM-YYYY'),
        debutDate: new Date("2020-01-01"),
        finDate: new Date("2020-12-31"),
    });

    const handleClose = () => {
        setmodal(false);
        setinput({
            nomassurance: "Tous",
            nomgarant: "Tous",
            typeSejour: "Tous",
            debutDateString: moment("2020-01-01").format('DD-MM-YYYY'),
            finDateString: moment("2020-12-31").format('DD-MM-YYYY'),
            debutDate: new Date("2020-01-01"),
            finDate: new Date("2020-12-31"),
        });
        setListFacturesRecues([])
        setListFacturesByAssurance([])
        settousSelectionner(false)
    };
    function showPDF(url) {
        seturlPDF(url)
        setpdf(true)
    }
    function setdebutDate(value) { setinput({ ...inputs, debutDate: value, debutDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function setfinDate(value) { setinput({ ...inputs, finDate: value, finDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function settype(value) { setinput({ ...inputs, typeSejour: value }) }
    function setassurance(value) { setinput({ ...inputs, nomassurance: value }) }
    function setgarant(value) { setinput({ ...inputs, nomgarant: value }) }

    function setgestionnaire(value) { setinputModif({ ...inputModifs, gestionnaire: value }); }
    function setorganisme(value) { setinputModif({ ...inputModifs, organisme: value }); }
    function setbeneficiaire({ target: { value } }) { setinputModif({ ...inputModifs, beneficiaire: value }); }
    function setassurePrinc({ target: { value } }) { setinputModif({ ...inputModifs, assurePrinc: value }); }
    function setmatriculeAssure({ target: { value } }) { setinputModif({ ...inputModifs, matriculeAssure: value }); }
    function setnumeroPEC({ target: { value } }) { setinputModif({ ...inputModifs, numeroPEC: value }); }
    function settaux({ target: { value } }) { setinputModif({ ...inputModifs, taux: value }); }

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
    ]

    useEffect(() => {
        thunkListFactures()
        Axios({ url: `${header.url}/gap/list/assurances` }).then(({ data: { rows } }) => {
            const Assurance = [];
            rows.forEach(({ idassurance, nomassurance }) => { Assurance.push({ value: idassurance, label: nomassurance }); });
            setListAssurance(Assurance);
        });
    }, []);
    useEffect(() => {
        settousSelectionner(false)
    }, [listFacturesByAssurance])
    useEffect(() => {
        setListFacturesRecues([])
    }, [inputs.nomassurance, inputs.typeSejour, inputs.nomgarant, inputs.debutDate, inputs.finDate])

    return (
        <div className="FacturesRecues row p-2">
            <div className="col-12">
                <div className="row">
                    <TextField
                        className="col-2"
                        variant="outlined"
                        size="small"
                        label="Rechercher une facture"
                        value={value}
                        onChange={({ target: { value } }) => {
                            let v = value
                                .replace("*", "")
                                .replace("+", "")
                                .replace("-", "")
                                .replace("/", "")
                                .replace("~", "")
                                .replace("~", "")
                                .replace(")", "")
                                .replace("(", "")
                                .replace("=", "")
                            setValue(v)
                        }}
                    />
                    <div className="col-2">
                        <Chip
                            label="Facture(s) recue(s)"
                            avatar={
                                <Avatar
                                    className="white-text"
                                    style={{ backgroundColor: global.theme.primary }}
                                >
                                    {listFactures.filter(facture => facture.statutfacture === 'recu' || facture.statutfacture === 'valide' || facture.statutfacture === 'bordereau').filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture)).length}
                                </Avatar>
                            }
                        />
                    </div>
                    <div className="col d-flex justify-content-end p-0">
                        <Button
                            size='small'
                            variant="contained"
                            onClick={() => setmodal(true)}
                            startIcon={<AddIcon />}
                            style={{
                                textTransform: "none",
                                backgroundColor: global.theme.primary,
                                color: "white",
                                fontSize: "12px",
                            }}
                        >Nouvelles factures reçues</Button>
                    </div>
                </div>
            </div>
            <table className="table-sm col-12 table-hover table-striped my-2">
                <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                    <tr>
                        {columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}
                        {["Montant Total",
                            "Part Assu",
                            "Reste assurance",
                            "Part patient",].map((col, i) => (<th className="white-text text-right" key={i}>{col}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {listFactures.filter(facture => facture.statutfacture === 'recu' || facture.statutfacture === 'valide' || facture.statutfacture === 'bordereau').filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture)).map(
                        ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour, statutfacture, erreurfacture, commentairefacture }, i) => (
                            <tr
                                title={commentairefacture}
                                key={i}
                                className={erreurfacture === "warning" ? "bg-warning" : erreurfacture === "refuse" ? "bg-danger text-white" : ""}
                                style={{ cursor: statutfacture === 'recu' ? "pointer" : "default" }}
                                onClick={() => { statutfacture === 'recu' && thunkDetailsFacture(numerofacture) }}
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
                                <td className="text-right">{separate(montanttotalfacture)}</td>
                                <td className="font-weight-bold text-right">{separate(partassurancefacture)}</td>
                                <td className="font-weight-bold text-right">{separate(resteassurancefacture)}</td>
                                <td className="text-right">{separate(partpatientfacture)}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            <Dialog
                TransitionComponent={Transition}
                open={modal}
                disableBackdropClick
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                transitionDuration={350}
                fullWidth={true}
                style={{ minHeight: "60vh" }}
                maxWidth="lg"
                onEnter={() => {
                    thunkListFacturesByAssurances(inputs)
                }}
            >
                <DialogTitle
                    className="text-center text-secondary"
                    id="alert-dialog-title"
                >
                    <b>Ajouter des factures recues</b>
                </DialogTitle>
                <DialogContent>
                    <div className="col-12">
                        <div className="row mb-2 d-flex justify-content-center">
                            <Autocomplete
                                size="small"
                                className="col p-0"
                                id="AssuranceList1"
                                defaultValue={{ value: "Tous", label: "Tous" }}
                                options={[{ value: "Tous", label: "Tous" }, ...listAssurances]}
                                onChange={(event, newValue) => {
                                    newValue && setassurance(newValue.label)
                                    newValue && inputs.typeSejour.trim() !== "" &&
                                        inputs.nomgarant.trim() !== "" &&
                                        thunkListFacturesByAssurances({ ...inputs, nomassurance: newValue.label })
                                }}
                                getOptionLabel={(option) => option.label}
                                filterSelectedOptions
                                renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                                renderInput={(params) => (<TextField {...params} variant="filled" label="Gestionnaire" placeholder="Ajouter ..." />)}
                            />
                            <Autocomplete
                                size="small"
                                id="AssuranceList2"
                                className="col p-0 mx-2"
                                defaultValue={{ value: "Tous", label: "Tous" }}
                                options={[{ value: "Tous", label: "Tous" }, ...listAssurances]}
                                onChange={(event, newValue) => {
                                    newValue && setgarant(newValue.label)
                                    newValue && inputs.typeSejour.trim() !== "" &&
                                        inputs.nomassurance.trim() !== "" &&
                                        thunkListFacturesByAssurances({ ...inputs, nomgarant: newValue.label })
                                }}
                                getOptionLabel={(option) => option.label}
                                filterSelectedOptions
                                renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                                renderInput={(params) => (<TextField {...params} variant="filled" label="Garant" placeholder="Selectionner ..." />)}
                            />
                            <FormControl variant="filled" size="small" className="col">
                                <InputLabel id="typesejour-label">Type de sejour </InputLabel>
                                <Select
                                    defaultValue="Tous"
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
                            <div className="col-2">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                                    <KeyboardDatePicker label='Du' id="datedebut" value={inputs.debutDate} defaultValue={new Date("2020-01-01")} format="dd/MM/yyyy" onChange={
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
                            <div className="col-2">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                                    <KeyboardDatePicker label='Au' id="datefin" value={inputs.finDate} defaultValue={new Date("2020-12-31")} format="dd/MM/yyyy" onChange={
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
                    <table className="table-sm col-12 table-hover table-striped my-3">
                        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                            <tr>
                                {columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}
                                {["Montant Total",
                                    "Part Assu",
                                    "Reste assurance",
                                    "Part patient",].map((col, i) => (<th className="white-text text-right" key={i}>{col}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {listFacturesByAssurance.filter(facture => facture.statutfacture === 'attente').map(
                                ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour }, i) => (
                                    <tr
                                        key={i}
                                        style={{ cursor: "pointer" }}
                                        className={listFacturesRecues.includes(numerofacture) ? "bgcolor-primary white-text" : ""}
                                        onClick={() => {
                                            if (listFacturesRecues.includes(numerofacture)) {
                                                listFacturesRecues.splice(listFacturesRecues.indexOf(numerofacture), 1)
                                                setListFacturesRecues([...listFacturesRecues])
                                                settousSelectionner(false)
                                            } else {
                                                if ([...listFacturesRecues, numerofacture].length === listFacturesByAssurance.filter(facture => facture.statutfacture === 'attente').length) {
                                                    settousSelectionner(true)
                                                }
                                                setListFacturesRecues([...listFacturesRecues, numerofacture])
                                            }
                                        }}
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
                                        <td className="text-right">{separate(montanttotalfacture)}</td>
                                        <td className="font-weight-bold text-right">{separate(partassurancefacture)}</td>
                                        <td className="font-weight-bold text-right">{separate(resteassurancefacture)}</td>
                                        <td className="text-right">{separate(partpatientfacture)}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    {listFacturesByAssurance.filter(facture => facture.statutfacture === 'attente').length !== 0 &&
                        <>
                            <div onClick={() => {
                                if (tousSelectionner) {
                                    setListFacturesRecues([])
                                    settousSelectionner(false)
                                } else {
                                    setListFacturesRecues(
                                        listFacturesByAssurance
                                            .filter(facture => facture.statutfacture === 'attente')
                                            .map(facture => facture.numerofacture)
                                    )
                                    settousSelectionner(true)
                                }
                            }} style={{ display: "inline" }}>
                                <Chip
                                    className={`mr-2 ${tousSelectionner ? "bgcolor-secondaryDark text-white" : ""}`}
                                    style={{ cursor: "pointer" }}
                                    label="Tous selectionner"
                                />
                            </div>
                            <Chip
                                label="Sélectionnée(s)"
                                avatar={<Avatar className="white-text" style={{ backgroundColor: global.theme.primary }} >
                                    {listFacturesRecues.length}/{listFacturesByAssurance.filter(facture => facture.statutfacture === 'attente').length}
                                </Avatar>}
                            />
                        </>
                    }

                </DialogContent>
                <DialogActions>
                    {
                        listFacturesByAssurance.filter(
                            facture => facture.statutfacture === 'attente' &&
                                !listFacturesRecues.includes(facture.numerofacture)
                        ).length !== 0 &&
                        <FactureNonRecuesDoc showPDF={showPDF} code='edy koffi' facture={
                            listFactures.filter(facture => facture.statutfacture === 'attente' &&
                                !listFacturesRecues.includes(facture.numerofacture)
                            )} />
                    }
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        startIcon={<CancelIcon />}
                        style={{
                            textTransform: "none",
                            fontSize: "12px",
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            thunkSendFacturesRecues(listFacturesRecues)
                            handleClose()
                        }}
                        disabled={listFacturesRecues.length === 0}
                        startIcon={<AssignmentTurnedInIcon />}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "12px",
                        }}
                    >
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showDetailsFacture}
                onClose={() => { setShowDetailsFacture(false) }}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                transitionDuration={0}
                fullWidth={true}
                onEntered={() =>
                    setinputModif({
                        gestionnaire: currentFacture.gestionnaire,
                        organisme: currentFacture.organisme,
                        beneficiaire: currentFacture.beneficiaire,
                        matriculeAssure: currentFacture.matriculeassure,
                        assurePrinc: currentFacture.assureprinc,
                        numeroPEC: currentFacture.numeropec,
                        taux: currentFacture.taux,
                    })
                }
                maxWidth="xs"
            >
                <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
                    <b>Facture N° {currentFacture.numerofacture}</b>
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-12">
                            <div className="row mx-1">
                                <div className="col-12 p-0">
                                    <small><b>Patient : </b>{currentFacture.nompatient}{" "} {currentFacture.prenomspatient}</small><br />
                                    <small><b>Type de sejour : </b>{currentFacture.typesejour}</small><br />
                                    <small><b>Date : </b>{currentFacture.datefacture} {currentFacture.heurefacture}</small><br />
                                    <hr className="bg-light" />
                                    {currentFacture.gestionnaire !== "" && (
                                        <>
                                            <small><b>Montant total : </b> {separate(currentFacture.montanttotalfacture)} FCFA</small><br />
                                            <small><b>Part Assurance : </b> {separate(currentFacture.partassurancefacture)} FCFA</small><br />
                                        </>
                                    )}
                                </div>
                            </div>
                            {currentFacture.commentairefacture && currentFacture.commentairefacture.trim() !== "" && <div className="row mx-1 my-3 bg-danger p-2">
                                <pre className="text-white">{currentFacture.commentairefacture}</pre>
                            </div>}
                            <div className="row mx-1 my-3">
                                <Autocomplete
                                    size="small"
                                    className="col p-0"
                                    id="assurancesList1"
                                    options={listAssurances}
                                    defaultValue={{ value: currentFacture.idassurance, label: currentFacture.gestionnaire }}
                                    onChange={(event, newValue) => { setgestionnaire(newValue.label); }}
                                    getOptionLabel={(option) => option.label}
                                    filterSelectedOptions
                                    renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            label="Gestionnaire"
                                            placeholder="Ajouter ..."
                                        />
                                    )}
                                />
                                <Autocomplete
                                    size="small"
                                    className="col p-0 ml-2"
                                    id="assurancesList2"
                                    defaultValue={{ value: currentFacture.idassurance, label: currentFacture.organisme }}
                                    options={listAssurances}
                                    onChange={(event, newValue) => { setorganisme(newValue.label); }}
                                    getOptionLabel={(option) => option.label}
                                    filterSelectedOptions
                                    renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            label="Organisme"
                                            placeholder="Ajouter ..."
                                        />
                                    )}
                                />
                            </div>
                            <div className="row mx-1 my-3">
                                <FormControl
                                    variant="filled"
                                    size="small"
                                    className="col"
                                >
                                    <InputLabel id="assurance-label">Bénéficiaire</InputLabel>
                                    <Select
                                        labelId="assurance-label"
                                        id="assurance"
                                        label="Bénéficiaire"
                                        onChange={setbeneficiaire}
                                        defaultValue={currentFacture.beneficiaire}
                                        style={{ fontSize: "12px" }}
                                    >
                                        <MenuItem style={{ fontSize: "12px" }} value={"assuré"}>L'assuré</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={"enfant"}>L'enfant</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={"conjoint(e)"}>Le/La conjoint(e)</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={"ayant droit"}>L'ayant droit</MenuItem>
                                    </Select>
                                </FormControl>
                                <Input
                                    className="col-7 ml-2"
                                    variant="filled"
                                    size="small"
                                    defaultValue=" "
                                    label="Identité de l'Assuré"
                                    defaultValue={currentFacture.assureprinc}
                                    onChange={setassurePrinc}
                                />
                            </div>
                            <div className="row mx-1 my-2">
                                <Input
                                    className="col-4"
                                    variant="filled"
                                    size="small"
                                    label="Matricule"
                                    defaultValue={currentFacture.matriculeassure}
                                    onChange={setmatriculeAssure}
                                />
                                <Input
                                    className="col-4 mx-2"
                                    variant="filled"
                                    size="small"
                                    label="N° PEC"
                                    defaultValue={currentFacture.numeropec}
                                    onChange={setnumeroPEC}
                                />
                                <FormControl
                                    variant="filled"
                                    size="small"
                                    className="col"
                                >
                                    <InputLabel id="assurance-label">Taux</InputLabel>
                                    <Select
                                        labelId="assurance-label"
                                        id="assurance"
                                        label="Taux"
                                        defaultValue={currentFacture.taux}
                                        onChange={settaux}
                                        style={{ fontSize: "12px" }}
                                    >
                                        <MenuItem style={{ fontSize: "12px" }} value={10}>10%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={20}>20%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={30}>30%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={40}>40%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={50}>50%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={60}>60%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={70}>70%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={75}>75%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={80}>80%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={85}>85%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={90}>90%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={95}>95%</MenuItem>
                                        <MenuItem style={{ fontSize: "12px" }} value={100}>100%</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
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
                        onClick={() => { setShowDetailsFacture(false) }}
                        style={{
                            textTransform: "none",
                            fontSize: "12px",
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        className="mb-2 bg-danger text-white"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => { thunkDeleteFacturesRecues(currentFacture.numerofacture) }}
                        style={{
                            textTransform: "none",
                            fontSize: "12px",
                        }}
                    >
                        Retirer
                    </Button>
                    <Button
                        variant="contained"
                        className="mb-2"
                        onClick={() => { }}
                        startIcon={<EditIcon />}
                        onClick={() => {
                            thunkModifyFacture(currentFacture.numerosejour, inputModifs)
                        }}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "12px",
                        }}
                    >
                        Valider la modification
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={pdf}
                onClose={() => setpdf(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                style={{ overflowX: 'hidden' }}
                maxWidth="md"
                scroll={'body'}
                PaperComponent={PaperComponent}
            >
                <object data={urlPDF} className="col-12" height={700} type="application/pdf"></object>
            </Dialog>
            <Snackbar open={loading} onClose={() => setLoading(false)}>
                <Alert variant='standard' severity="info" >
                    Chargement ...
                </Alert>
            </Snackbar>
        </div>
    );
};

const mapStatToProps = state => {
    const { bordereauReducer: { listFacturesByAssurance, listFacturesRecues, listFactures, showDetailsFacture, currentFacture, loading } } = state
    return { listFacturesByAssurance, listFacturesRecues, listFactures, showDetailsFacture, currentFacture, loading }
}
const FacturesRecuesConnected = connect(mapStatToProps, { thunkSendFacturesRecues, thunkListFactures, thunkAddBordereau, thunkListFacturesByAssurances, thunkDetailsFacture, thunkDeleteFacturesRecues, thunkModifyFacture, setListFacturesRecues, setListFacturesByAssurance, setShowDetailsFacture, setLoading })(FacturesRecues)
export default FacturesRecuesConnected;
