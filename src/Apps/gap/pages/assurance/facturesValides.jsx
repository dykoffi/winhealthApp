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
    setShowDetailsFacture,
    thunkDetailsFacture,
    setShowCommentFacture,
    thunkReportFacture,
    thunkCommentFacture,
    setLoading
} from "../../api/assurance/bordereaux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import EditIcon from '@material-ui/icons/Edit';
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
    Snackbar,
    Slide,
} from "@material-ui/core";
import Axios from "axios";
import { header } from "../../../global/apiQuery";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { separate } from "../../../global/functions";
import Alert from "@material-ui/lab/Alert";
const Transition = React.forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });
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
    showDetailsFacture,
    thunkDetailsFacture,
    setShowDetailsFacture,
    setLoading,
    loading,
    setListFacturesByAssurance,
    setShowCommentFacture,
    showCommentFacture,
    thunkCommentFacture,
    thunkReportFacture
}) => {
    const [value, setValue] = useState("");
    const [modal, setmodal] = useState(false);
    const [listAssurances, setListAssurance] = useState([]);
    const [inputComment, setinputComment] = useState({
        erreur: "",
        comment: ""
    })
    const [check, setcheck] = useState({
        gestionnaire: false,
        organisme: false,
        noBon: false,
        assurePrinc: false,
        montantTotal: false,
        partAssurance: false,
        tauxAssurance: false
    });

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
        setListFacturesValides([])
        setListFacturesByAssurance([])
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
    }, [inputs.nomassurance, inputs.typeSejour, inputs.nomgarant, inputs.debutDate, inputs.finDate])

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
                            label="Facture(s) valide(s)"
                            avatar={
                                <Avatar
                                    className="white-text"
                                    style={{ backgroundColor: global.theme.primary }}
                                >
                                    {listFactures.filter(facture => facture.statutfacture === 'valide' || facture.statutfacture === 'bordereau').filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture)).length}
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
                                fontSize: "12px",
                            }}
                        >Valider des factures</Button>
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
                    {listFactures.filter(facture => facture.statutfacture === 'valide' || facture.statutfacture === 'bordereau').filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture)).map(
                        ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour, statutfacture, erreurfacture, commentairefacture }, i) => (
                            <tr
                                title={commentairefacture}
                                key={i}
                                className={erreurfacture === "warning" ? "bg-warning" : erreurfacture === "refuse" ? "bg-danger text-white" : ""}
                                style={{ cursor: statutfacture === 'valide' ? "pointer" : "default" }}
                                onClick={() => statutfacture === 'valide' ? thunkDetailsFacture(numerofacture) : null}
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
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick
                transitionDuration={350}
                fullWidth={true}
                style={{ minHeight: "60vh" }}
                maxWidth="lg"
                onEntering={() => {
                    thunkListFacturesByAssurances(inputs)
                }}
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
                                defaultValue={{ value: "Tous", label: "Tous" }}
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
                                defaultValue={{ value: "Tous", label: "Tous" }}
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
                                    defaultValue="Tous"
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
                                    <KeyboardDatePicker id="datedebut" defaultValue={new Date("2020-01-01")} value={inputs.debutDate} format="dd/MM/yyyy" onChange={
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
                                    <KeyboardDatePicker id="datefin" defaultValue={new Date("2020-12-31")} value={inputs.finDate} format="dd/MM/yyyy" onChange={
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
                            <tr>
                                {columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}
                                {["Montant Total",
                                    "Part Assu",
                                    "Reste assurance",
                                    "Part patient",].map((col, i) => (<th className="white-text text-right" key={i}>{col}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {listFacturesByAssurance.filter(facture => facture.statutfacture === 'recu' && facture.erreurfacture === "").map(
                                ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour, erreurfacture, statutfacture }, i) => (
                                    <tr
                                        key={i}
                                        className={listFacturesValides.includes(numerofacture) ? "bgcolor-primary font-weight-bold white-text" : ""}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            if (listFacturesValides.includes(numerofacture)) {
                                                listFacturesValides.splice(listFacturesValides.indexOf(numerofacture), 1)
                                                setListFacturesValides([...listFacturesValides])
                                            } else {
                                                thunkCommentFacture(numerofacture)
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
                                        <td className="text-right">{separate(montanttotalfacture)}</td>
                                        <td className="font-weight-bold text-right">{separate(partassurancefacture)}</td>
                                        <td className="font-weight-bold text-right">{separate(resteassurancefacture)}</td>
                                        <td className="text-right">{separate(partpatientfacture)}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    {listFacturesByAssurance.filter(facture => facture.statutfacture === 'recu' && facture.erreurfacture === "").length !== 0 &&
                        <Chip
                            label="Sélectionnée(s)"
                            avatar={<Avatar className="white-text" style={{ backgroundColor: global.theme.primary }} >
                                {listFacturesValides.length}/{listFacturesByAssurance.filter(facture => facture.statutfacture === 'recu' && facture.erreurfacture === "").length} </Avatar>}
                        />
                    }
                </DialogContent>
                <DialogActions>
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
                            thunkSendFacturesValides(listFacturesValides)
                            handleClose()
                        }}
                        disabled={listFacturesValides.length === 0}
                        startIcon={<AssignmentTurnedInIcon />}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "12px",
                        }}
                    >
                        Valider les factures
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
                                            <small><b>Gestionnaire : </b> {currentFacture.gestionnaire}</small><br />
                                            <small><b>Garant : </b> {currentFacture.organisme}</small><br />
                                            <small><b>Assure princ : </b> {currentFacture.assureprinc}</small><br />
                                            <small><b>Taux : </b> {currentFacture.taux}%</small><br />
                                            <small><b>Montant total : </b> {separate(currentFacture.montanttotalfacture)} FCFA</small><br />
                                            <small><b>Part Assurance : </b> {separate(currentFacture.partassurancefacture)} FCFA</small><br />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 d-flex justify-content-center mt-4">
                                <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                                <small className="font-weight-bold">
                                    Le retrait de la facture est une action sans confirmation et irréversibles</small>
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
                        onClick={() => { thunkDeleteFacturesValides(currentFacture.numerofacture) }}
                        style={{
                            textTransform: "none",
                            fontSize: "12px",
                        }}
                    >
                        Retirer
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showCommentFacture}
                onClose={() => {
                    setShowCommentFacture(false)
                    setinputComment({ erreur: "", comment: "", })
                }}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                onEntered={() =>
                    setinputComment({ erreur: currentFacture.erreurfacture, comment: currentFacture.commentairefacture, })
                }
                maxWidth="xs"
                transitionDuration={0}
            >
                <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
                    <b>Facture N° {currentFacture.numerofacture}</b>
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-12">
                            <div className="row mx-1">
                                <FormControlLabel className="col-12 p-0 m-0" control={<Checkbox checked={check.gestionnaire} onChange={({ target: { checked } }) => {
                                    setcheck({ ...check, gestionnaire: checked })
                                }} />}
                                    label={<small>Gestionnaire : <b>{currentFacture.gestionnaire}</b></small>} />
                                <FormControlLabel className="col-12 p-0 m-0" control={<Checkbox checked={check.organisme} onChange={({ target: { checked } }) => {
                                    setcheck({ ...check, organisme: checked })
                                }} />}
                                    label={<small>Organisme : <b>{currentFacture.organisme}</b></small>} />
                                <FormControlLabel className="col-12 p-0 m-0" control={<Checkbox checked={check.noBon} onChange={({ target: { checked } }) => {
                                    setcheck({ ...check, noBon: checked })
                                }} />}
                                    label={<small>N° de Bon : <b>{currentFacture.numeropec}</b></small>} />
                                <FormControlLabel className="col-12 p-0 m-0" control={<Checkbox checked={check.assurePrinc} onChange={({ target: { checked } }) => {
                                    setcheck({ ...check, assurePrinc: checked })
                                }} />}
                                    label={<small>Assuré principal : <b>{currentFacture.assureprinc}</b></small>} />
                                <FormControlLabel className="col-12 p-0 m-0" control={<Checkbox checked={check.montantTotal} onChange={({ target: { checked } }) => {
                                    setcheck({ ...check, montantTotal: checked })
                                }} />}
                                    label={<small>Montant Total : <b>{separate(currentFacture.montanttotalfacture)} FCFA</b></small>} />
                                <FormControlLabel className="col-12 p-0 m-0" control={<Checkbox checked={check.tauxAssurance} onChange={({ target: { checked } }) => {
                                    setcheck({ ...check, tauxAssurance: checked })
                                }} />}
                                    label={<small>Taux : <b>{currentFacture.taux}%</b></small>} />
                                <FormControlLabel className="col-12 p-0 m-0" control={<Checkbox checked={check.partAssurance} onChange={({ target: { checked } }) => {
                                    setcheck({ ...check, partAssurance: checked })
                                }} />}
                                    label={<small>Part Assurance : <b>{separate(currentFacture.partassurancefacture)} FCFA</b></small>} />
                            </div>
                            <div className="row mx-1 my-3">
                                <TextField
                                    style={{ fontSize: "12px" }}
                                    className="col-12"
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={4}
                                    label="Commentaire"
                                    defaultValue={currentFacture.commentairefacture}
                                    onChange={({ target: { value } }) => {
                                        let v = value
                                        setinputComment({ ...inputComment, comment: v })
                                    }}
                                />
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                                <small className="font-weight-bold">Veuillez vérifier toutes les informations avant de valider la facture</small>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        className="mb-2"
                        startIcon={<CancelIcon />}
                        onClick={() => {
                            setShowCommentFacture(false)
                            setcheck({
                                gestionnaire: false,
                                organisme: false,
                                noBon: false,
                                assurePrinc: false,
                                montantTotal: false,
                                partAssurance: false,
                                tauxAssurance: false
                            })
                        }}
                        style={{
                            textTransform: "none",
                            fontSize: "12px",
                        }}
                    >Fermer</Button>
                    <Button
                        variant="contained"
                        className="mb-2 bg-warning"
                        startIcon={<EditIcon />}
                        disabled={inputComment.comment.trim() === ""}
                        onClick={() => {
                            thunkReportFacture(currentFacture.numerofacture, { ...inputComment, erreur: "warning" })
                        }}
                        style={{
                            textTransform: "none",
                            fontSize: "12px",
                        }}
                    >Signaler</Button>
                    <Button
                        className="mb-2"
                        variant="contained"
                        onClick={() => {
                            setListFacturesValides([...listFacturesValides, currentFacture.numerofacture])
                            setShowCommentFacture(false)
                            setcheck({
                                gestionnaire: false,
                                organisme: false,
                                noBon: false,
                                assurePrinc: false,
                                montantTotal: false,
                                partAssurance: false,
                                tauxAssurance: false
                            })
                        }}
                        disabled={[...Object.keys(check)].filter(c => check[c] === false).length !== 0}
                        startIcon={<AssignmentTurnedInIcon />}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.secondaryDark,
                            color: "white",
                            fontSize: "12px",
                        }}
                    >Facture conforme</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={loading} onClose={() => setLoading(false)}>
                <Alert variant='standard' severity="info" >
                    Chargement ...
                </Alert>
            </Snackbar>
        </div >
    );
};

const mapStatToProps = state => {
    const { bordereauReducer: { listFacturesByAssurance, listFacturesValides, listFactures, currentFacture, showDetailsFacture, loading, showCommentFacture } } = state
    return { listFacturesByAssurance, listFacturesValides, listFactures, currentFacture, showDetailsFacture, loading, showCommentFacture }
}
const FacturesvalidesConnected = connect(mapStatToProps, { thunkSendFacturesValides, thunkListFactures, thunkAddBordereau, thunkListFacturesByAssurances, thunkDeleteFacturesValides, setListFacturesValides, thunkReportFacture, setListFacturesByAssurance, setShowCommentFacture, setShowDetailsFacture, thunkDetailsFacture, setLoading, thunkCommentFacture })(Facturesvalides)
export default FacturesvalidesConnected;
