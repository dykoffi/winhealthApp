import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import {
    thunkAddBordereau,
    thunkListFacturesByAssurances,
    thunkSendFacturesRecues,
    thunkDeleteFacturesRecues,
    setListFacturesRecues,
    setListFacturesByAssurance,
    setShowModal,
    thunkDetailsFacture,
    thunkListFactures
} from "../../api/assurance/bordereaux";

import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import PrintIcon from '@material-ui/icons/Print';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutlined";
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
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
} from "@material-ui/core";
import Axios from "axios";
import GlobalContext, { Info } from "../../../global/context";
import { header } from "../../../global/apiQuery";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

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

const Bordereau = ({
    thunkListFacturesByAssurances,
    thunkSendFacturesRecues,
    thunkListFactures,
    thunkDeleteFacturesRecues,
    listFactures,
    currentFacture,
    listFacturesByAssurance,
    listFacturesRecues,
    setListFacturesRecues,
    showModal,
    thunkDetailsFacture,
    setShowModal,
    setListFacturesByAssurance
}) => {

    const global = useContext(GlobalContext);
    const [value, setValue] = useState("");
    const [tousSelectionner, settousSelectionner] = useState("");
    const [modal, setmodal] = useState(false);
    const [listAssurances, setListAssurance] = useState([]);
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
        nomassurance: "",
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
            typeSejour: "",
            debutDateString: moment().format('DD-MM-YYYY'),
            finDateString: moment().format('DD-MM-YYYY'),
            debutDate: new Date(),
            finDate: new Date()
        });
        setListFacturesRecues([])
        setListFacturesByAssurance([])
    };

    function setdebutDate(value) { setinput({ ...inputs, debutDate: value, debutDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function setfinDate(value) { setinput({ ...inputs, finDate: value, finDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function settype(value) { setinput({ ...inputs, typeSejour: value }) }
    function setassurance(value) { setinput({ ...inputs, nomassurance: value }) }

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
        "Medecin",
        "Auteur",
        "Montant Total",
        "Part Assu",
        "Reste assurance",
        "Part patient",
    ]

    useEffect(() => {
        thunkListFactures()
        Axios({ url: `${header.url}/gap/list/assurances` }).then(({ data: { rows } }) => {
            const Assurance = [];
            rows.forEach(({ idassurance, nomassurance }) => { Assurance.push({ value: idassurance, label: nomassurance }); });
            setListAssurance([{ value: "Tous", label: "Tous" }, ...Assurance]);
        });
    }, []);

    useEffect(() => {
        setListFacturesRecues([])
    }, [inputs.nomassurance, inputs.typeSejour])

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
                        onChange={({ target: { value } }) => { setValue(value) }}
                    />
                    <div className="col-2">
                        <Chip
                            label="Facture(s) recue(s)"
                            avatar={
                                <Avatar
                                    className="white-text"
                                    style={{ backgroundColor: global.theme.primary }}
                                >
                                    {listFactures.filter(facture => facture.statutfactures === 'recu' || facture.statutfactures === 'valide').filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture)).length}
                                </Avatar>
                            }
                        />
                    </div>
                    <div className="col d-flex justify-content-end p-0">
                        <Button
                            variant="contained"
                            onClick={() => setmodal(true)}
                            startIcon={<AddIcon />}
                            style={{
                                textTransform: "none",
                                backgroundColor: global.theme.primary,
                                color: "white",
                                fontSize: "11px",
                            }}
                        >
                            Nouvelles factures recues
                        </Button>
                    </div>
                </div>
            </div>
            <table className="table-sm col-12 table-hover table-striped my-2">
                <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                    <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                </thead>
                <tbody>
                    {listFactures.filter(facture => facture.statutfactures === 'recu' || facture.statutfactures === 'valide').filter(facture => value.trim() === "" || RegExp(value, 'i').test(facture.numerofacture)).map(
                        ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour }, i) => (
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
                                <td>Wilfried GBADJE</td>
                                <td>{auteurfacture}</td>
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
                disableBackdropClick
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                transitionDuration={0}
                fullWidth={true}
                style={{ minHeight: "60vh" }}
                maxWidth="lg"
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
                                className="col-2 p-0"
                                id="AssuranceList"
                                options={listAssurances}
                                onChange={(event, newValue) => {
                                    newValue && setassurance(newValue.label)
                                    newValue && inputs.typeSejour.trim() !== "" && thunkListFacturesByAssurances({ ...inputs, nomassurance: newValue.label })
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
                                        inputs.nomassurance.trim() !== "" && thunkListFacturesByAssurances({ ...inputs, typeSejour: value })
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
                    <table className="table-sm col-12 table-hover table-striped my-3">
                        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                            <tr>{columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                        </thead>
                        <tbody>
                            {listFacturesByAssurance.filter(facture => facture.statutfactures === 'attente').map(
                                ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, auteurfacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour }, i) => (
                                    <tr
                                        key={i}
                                        style={{ cursor: "pointer" }}
                                        className={listFacturesRecues.includes(numerofacture) ? "bgcolor-primary font-weight-bold white-text" : ""}
                                        onClick={() => {
                                            if (listFacturesRecues.includes(numerofacture)) {
                                                listFacturesRecues.splice(listFacturesRecues.indexOf(numerofacture), 1)
                                                setListFacturesRecues([...listFacturesRecues])
                                                settousSelectionner(false)
                                            } else {
                                                if ([...listFacturesRecues, numerofacture].length === listFacturesByAssurance.filter(facture => facture.statutfactures === 'attente').length) {
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
                                        <td>Wilfried GBADJE</td>
                                        <td>{auteurfacture}</td>
                                        <td>{montanttotalfacture} FCFA</td>
                                        <td className="font-weight-bold">{partassurancefacture} FCFA</td>
                                        <td className="font-weight-bold">{resteassurancefacture} FCFA</td>
                                        <td>{partpatientfacture} FCFA</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    {listFacturesByAssurance.filter(facture => facture.statutfactures === 'attente').length !== 0 &&
                        <>
                            <div onClick={() => {
                                if (tousSelectionner) {
                                    setListFacturesRecues([])
                                    settousSelectionner(false)
                                } else {
                                    setListFacturesRecues(
                                        listFacturesByAssurance
                                            .filter(facture => facture.statutfactures === 'attente')
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
                                avatar={<Avatar className="white-text" style={{ backgroundColor: global.theme.primary }} > {listFacturesRecues.length} </Avatar>}
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
                        // onClick={}
                        startIcon={<PrintIcon />}
                        disabled={listFacturesRecues.length !== 0 || listFacturesByAssurance.filter(facture => facture.statutfactures === 'attente').length === 0}
                        className="red text-white"
                        style={{
                            textTransform: "none",
                            fontSize: "11px",
                        }}
                    >
                        Imprimer les factures non reçues
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
                            fontSize: "11px",
                        }}
                    >
                        Valider
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
                    {currentFacture.restepatientfacture === 0 && <><br /><small className="green-text font-weight-bold">(déjà payée)</small></>}
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
                                            <small><b>Montant total : </b> {currentFacture.montanttotalfacture} FCFA</small><br />
                                            <small><b>Part Assurance : </b> {currentFacture.partassurancefacture} FCFA</small><br />
                                        </>
                                    )}
                                </div>
                                <div className="col-6 text-right"></div>
                            </div>
                            <div className="row mx-1 my-3">
                                <Autocomplete
                                    size="small"
                                    className="col p-0"
                                    id="assurancesList"
                                    options={listAssurances}
                                    defaultValue={{ value: currentFacture.idassurance, label: currentFacture.gestionnaire }}
                                    onChange={(event, newValue) => { setgestionnaire(newValue.label); }}
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
                                <Autocomplete
                                    size="small"
                                    className="col p-0 ml-2"
                                    id="assurancesList"
                                    defaultValue={{ value: currentFacture.idassurance, label: currentFacture.organisme }}
                                    options={listAssurances}
                                    onChange={(event, newValue) => { setorganisme(newValue.label); }}
                                    getOptionLabel={(option) => option.label}
                                    filterSelectedOptions
                                    renderOption={(option) => (<><small style={{ fontSize: "12px" }}>{option.label}</small></>)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Organisme"
                                            placeholder="Ajouter ..."
                                        />
                                    )}
                                />
                            </div>
                            <div className="row mx-1 my-3">
                                <FormControl
                                    variant="outlined"
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
                                    variant="outlined"
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
                                    variant="outlined"
                                    size="small"
                                    label="Matricule"
                                    defaultValue={currentFacture.matriculeassure}
                                    onChange={setmatriculeAssure}
                                />
                                <Input
                                    className="col-4 mx-2"
                                    variant="outlined"
                                    size="small"
                                    label="N° PEC"
                                    defaultValue={currentFacture.numeropec}
                                    onChange={setnumeroPEC}
                                />
                                <FormControl
                                    variant="outlined"
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
                                        style={{ fontSize: "11px" }}
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
                        onClick={() => { thunkDeleteFacturesRecues(currentFacture.numerofacture) }}
                        style={{
                            textTransform: "none",
                            fontSize: "13px",
                        }}
                    >
                        Retirer
                    </Button>
                    <Button
                        variant="contained"
                        className="mb-2"
                        onClick={() => { }}
                        startIcon={<CheckCircleOutlineIcon />}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "13px",
                        }}
                    >
                        Valider la transaction
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStatToProps = state => {
    const { bordereauReducer: { listFacturesByAssurance, listFacturesRecues, listFactures, showModal, currentFacture } } = state
    return { listFacturesByAssurance, listFacturesRecues, listFactures, showModal, currentFacture }
}
const BordereauConnected = connect(mapStatToProps, { thunkSendFacturesRecues, thunkListFactures, thunkAddBordereau, thunkListFacturesByAssurances, thunkDetailsFacture,thunkDeleteFacturesRecues, setListFacturesRecues, setListFacturesByAssurance, setShowModal })(Bordereau)
export default BordereauConnected;
