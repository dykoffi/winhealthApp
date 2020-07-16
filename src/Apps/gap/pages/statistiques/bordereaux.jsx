import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import GlobalContext, { Info } from "../../../global/context";
import moment from 'moment'
import BordereauDoc from '../../documents/bordereau'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {
    thunkListFacturesByAssurances,
    thunkAddBordereau,
    setListFacturesValides,
    setListFacturesByAssurance,
    thunkDeleteFacturesValides,
    thunkListFactures,
    thunkDetailsFacture,
    setShowModal,
    thunkDetailsBorderau,
    thunkListBorderaux,
    setLoading,
    thunkDeleteFacturesRecues,
    setShowDetailsFacture,
    thunkUpdateBordereau,
    setTypeBordereaux
} from "../../api/assurance/bordereaux";
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
const Bordereau = ({
    thunkListFacturesByAssurances,
    thunkListBorderaux,
    thunkAddBordereau,
    thunkDeleteFacturesValides,
    listBordereaux,
    listFacturesByAssurance,
    listFacturesValides,
    setListFacturesValides,
    currentBordereau,
    showModal,
    thunkDetailsBorderau,
    setShowModal,
    loading,
    setLoading,
    currentFacture,
    thunkUpdateBordereau,
    showDetailsFacture,
    setShowDetailsFacture,
    setListFacturesByAssurance,
    setTypeBordereaux,
    typeBordereaux
}) => {
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [tousSelectionner, settousSelectionner] = useState("");
    const [pdf, setpdf] = useState(false);
    const [urlPDF, seturlPDF] = useState(false);
    const [modal, setmodal] = useState(false);
    const [cie, setcie] = useState(false);
    const [listAssurances, setListAssurance] = useState([]);
    const [statutbordereau, setstatutbordereau] = useState(null)
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
        nomgarant: "",
        typeSejour: "",
        debutDateString: moment().format('DD-MM-YYYY'),
        finDateString: moment().format('DD-MM-YYYY'),
        limiteDateString: moment().format('DD-MM-YYYY'),
        debutDate: new Date(),
        finDate: new Date(),
        limiteDate: new Date(),
    });
    const handleClose = () => {
        setmodal(false);
        setinput({
            nomassurance: "",
            nomgarant: "",
            typeSejour: "",
            debutDateString: moment().format('DD-MM-YYYY'),
            finDateString: moment().format('DD-MM-YYYY'),
            limiteDateString: moment().format('DD-MM-YYYY'),
            debutDate: new Date(),
            finDate: new Date(),
            limiteDate: new Date(),
        });
        setListFacturesValides([])
        setListFacturesByAssurance([])
        settousSelectionner(false)
    };
    function setdebutDate(value) { setinput({ ...inputs, debutDate: value, debutDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function setfinDate(value) { setinput({ ...inputs, finDate: value, finDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function setlimiteDate(value) { setinput({ ...inputs, limiteDate: value, limiteDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
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
    function showPDF(url) { seturlPDF(url); setpdf(true) }
    function statutbordereauTab(statut) {
        switch (statut) {
            case "tous": return ['Création', 'Rejeté', 'Validé', 'Décharge', 'Envoie']
            case "creation": return ['Création']
            case "rejete": return ['Rejeté']
            case "decharge": return ['Décharge']
            case "envoie": return ['Envoie']
            default: break;
        }
    }
    const columnsBordereau = [
        "N°",
        "Numero Bordereau",
        "Gestionnaire",
        "Organisme",
        "Type de sejour",
        "Date d'envoie",
        "Date limite",
        "Status du bordereau",
        "Nombre de facture"
    ]
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
        "Assuré Princ"
    ]
    const global = useContext(GlobalContext);
    useEffect(() => {
        thunkListBorderaux()
        Axios({ url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => {
            const Assurance = [];
            rows.forEach(({ idassurance, nomassurance }) => { Assurance.push({ value: idassurance, label: nomassurance }); });
            setListAssurance([{ value: "Tous", label: "Tous" }, ...Assurance]);
        });
    }, []);
    useEffect(() => {
        setListFacturesValides([])
        setLoading(false)
    }, [inputs.nomassurance, inputs.typeSejour])
    return (
        <div className="Facturesvalides row p-2">
            <div className="col-12">
                <div className="row">
                    <TextField
                        className="col-2"
                        variant="outlined"
                        size="small"
                        label="Rechercher un borderau"
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
                            label="Bordereau(x)"
                            avatar={
                                <Avatar
                                    className="white-text"
                                    style={{ backgroundColor: global.theme.primary }}
                                >
                                    {listBordereaux.filter(bordereau => value.trim() === "" || RegExp(value, 'i').test(bordereau.numerobordereau)).length}
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
                            Ajouter un borderau
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-2 p-0 my-2">
                <div className="row">
                    <div className="col-12">
                        <ul className="list-group rounded-0" id="list-tab" role="tablist">
                            <li
                                onClick={() => {
                                    listBordereaux.filter(b => statutbordereauTab("tous").includes(b.statutbordereau)).length !== 0 &&
                                        setTypeBordereaux("tous")
                                }}
                                style={{ cursor: listBordereaux.filter(b => statutbordereauTab("tous").includes(b.statutbordereau)).length === 0 ? "default" : "pointer" }}
                                className={`
                                        list-group-item d-flex justify-content-between align-items-center
                                        ${typeBordereaux === "tous" ? "bgcolor-primary text-white" : "text-secondary"}
                            `}>
                                <small>Tous les bordereaux</small>
                                <span className="badge badge-light badge-pill">{listBordereaux.filter(b => statutbordereauTab("tous").includes(b.statutbordereau)).length}</span>
                            </li>
                            <li
                                onClick={() => {
                                    listBordereaux.filter(b => statutbordereauTab("creation").includes(b.statutbordereau)).length !== 0 &&
                                        setTypeBordereaux("creation")
                                }}
                                style={{ cursor: listBordereaux.filter(b => statutbordereauTab("creation").includes(b.statutbordereau)).length === 0 ? "default" : "pointer" }}
                                className={`
                                        list-group-item d-flex justify-content-between align-items-center
                                        ${typeBordereaux === "creation" ? "bgcolor-primary text-white" : "text-secondary"}
                                `}
                            ><small>Bordereaus en Création</small><span className="badge badge-light badge-pill">{listBordereaux.filter(b => b.statutbordereau === "Création").length}</span></li>
                            <li
                                onClick={() => {
                                    listBordereaux.filter(b => statutbordereauTab("envoie").includes(b.statutbordereau)).length !== 0 &&
                                        setTypeBordereaux("envoie")
                                }}
                                style={{ cursor: listBordereaux.filter(b => statutbordereauTab("envoie").includes(b.statutbordereau)).length === 0 ? "default" : "pointer" }}
                                className={`
                                        list-group-item d-flex justify-content-between align-items-center
                                        ${typeBordereaux === "envoie" ? "bgcolor-primary text-white" : "text-secondary"}
                                `}
                            ><small>Bordereaus envoyés</small><span className="badge badge-light badge-pill">{listBordereaux.filter(b => b.statutbordereau === "Envoie").length}</span></li>
                            <li
                                onClick={() => {
                                    listBordereaux.filter(b => statutbordereauTab("decharge").includes(b.statutbordereau)).length !== 0 &&
                                        setTypeBordereaux("decharge")
                                }}
                                style={{ cursor: listBordereaux.filter(b => statutbordereauTab("decharge").includes(b.statutbordereau)).length === 0 ? "default" : "pointer" }}
                                className={`
                                         list-group-item d-flex justify-content-between align-items-center
                                         ${typeBordereaux === "decharge" ? "bgcolor-primary text-white" : "text-secondary"}
                                 `}
                            ><small>Bordereaux déchargés</small><span className="badge badge-light badge-pill">{listBordereaux.filter(b => b.statutbordereau === "Décharge").length}</span></li>
                            <li
                                onClick={() => {
                                    listBordereaux.filter(b => statutbordereauTab("rejete").includes(b.statutbordereau)).length !== 0 &&
                                        setTypeBordereaux("rejete")
                                }}
                                style={{ cursor: listBordereaux.filter(b => statutbordereauTab("rejete").includes(b.statutbordereau)).length === 0 ? "default" : "pointer" }}
                                className={`
                                         list-group-item d-flex justify-content-between align-items-center
                                         ${typeBordereaux === "rejete" ? "bgcolor-primary text-white" : "text-secondary"}
                                 `}
                            ><small>Bordereaux rejetés</small><span className="badge badge-light badge-pill">{listBordereaux.filter(b => b.statutbordereau === "Rejeté").length}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-10 pl-4 my-2">
                <div className="row">
                    <table className="table-sm col-12 table-hover table-striped">
                        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                            <tr>{columnsBordereau.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                        </thead>
                        <tbody>
                            {listBordereaux.filter(bordereau => value.trim() === "" || RegExp(value, 'i').test(bordereau.numerobordereau))
                                .filter(bordereau => statutbordereauTab(typeBordereaux).includes(bordereau.statutbordereau))
                                .map(
                                    ({ numerobordereau, datecreationbordereau, gestionnairebordereau, datelimitebordereau, organismebordereau, typesejourbordereau, statutbordereau, nbfacture }, i) => (
                                        <tr
                                            key={i}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { thunkDetailsBorderau(numerobordereau) }}
                                        >
                                            <td>{i + 1}</td>
                                            <td className="font-weight-bold">{numerobordereau}</td>
                                            <td className="font-weight-bold">{gestionnairebordereau}</td>
                                            <td className="font-weight-bold">{organismebordereau}</td>
                                            <td className="font-weight-bold">{typesejourbordereau}</td>
                                            <td>{datecreationbordereau}</td>
                                            <td>{datelimitebordereau}</td>
                                            <td className={`font-weight-bold ${
                                                statutbordereau === 'Rejeté' ? "red-text animated infinite flash" :
                                                    statutbordereau === "Décharge" ? "blue-text" :
                                                        statutbordereau === "Envoie" ? "green-text" : ""}`}>{statutbordereau}</td>
                                            <td>{nbfacture}</td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
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
                ><b>Ajouter un nouveau bordereau</b></DialogTitle>
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
                    <table className="table-sm col-12 table-hover table-striped my-3">
                        <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                            {columns.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}
                            {["Montant Total",
                                "Part Assu",
                                "Reste assurance",
                                "Part patient",].map((col, i) => (<th className="white-text text-right" key={i}>{col}</th>))}
                        </thead>
                        <tbody>
                            {listFacturesByAssurance.filter(facture => facture.statutfactures === 'valide').map(
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
                                                if ([...listFacturesValides, numerofacture].length === listFacturesByAssurance.filter(facture => facture.statutfactures === 'valide').length) {
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
                                        <td className="text-right">{separate(montanttotalfacture)}</td>
                                        <td className="font-weight-bold text-right">{separate(partassurancefacture)}</td>
                                        <td className="font-weight-bold text-right">{separate(resteassurancefacture)}</td>
                                        <td className="text-right">{separate(partpatientfacture)}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    {listFacturesByAssurance.filter(facture => facture.statutfactures === 'valide').length !== 0 &&
                        <>
                            <div onClick={() => {
                                if (tousSelectionner) {
                                    setListFacturesValides([])
                                    settousSelectionner(false)
                                } else {
                                    setListFacturesValides(
                                        listFacturesByAssurance
                                            .filter(facture => facture.statutfactures === 'valide')
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
                            <div className="col-12 p-0 mt-2 justify-content-end d-flex">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                                    <KeyboardDatePicker id="datelimite" label="Date limite de depot" inputVariant="filled" value={inputs.limiteDate} format="dd/MM/yyyy" onChange={
                                        (date) => { setlimiteDate(date) }
                                    } />
                                </MuiPickersUtilsProvider>
                            </div>
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
                            thunkAddBordereau({ ...inputs, factures: listFacturesValides })
                            handleClose()
                        }}
                        disabled={listFacturesValides.length === 0}
                        startIcon={<ListAltIcon />}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "11px",
                        }}
                    >
                        Generer le bordereau
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                TransitionComponent={Transition}
                open={showModal}
                onClose={() => { setShowModal(false) }}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="lg"
                fullScreen
                onEntered={() => { setstatutbordereau(currentBordereau[0].statutbordereau) }}
            >
                <DialogTitle className="text-center text-secondary" id="alert-dialog-title">
                    <b>Bordereau N° {currentBordereau[0].numerobordereau}</b>
                </DialogTitle>
                <DialogContent>
                    <div className="row mx-1">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-auto p-0">
                                    <small><b>N° Bordereau : </b>{currentBordereau[0].numerobordereau}</small><br />
                                    <small><b>Type de sejour : </b>{currentBordereau[0].typesejourbordereau}</small><br />
                                    <small><b>Date de creation : </b>{currentBordereau[0].datecreationbordereau} {currentBordereau[0].heurecreationbordereau}</small><br />
                                    <small><b>Date limite d'envoi : </b>{currentBordereau[0].datelimitebordereau}</small><br />
                                </div>
                                <div className="col-auto">
                                    {currentBordereau[0].gestionnairebordereau !== "" && (
                                        <>
                                            <small><b>Gestionnaire : </b> {currentBordereau[0].gestionnairebordereau}</small><br />
                                            <small><b>Garant : </b> {currentBordereau[0].organismebordereau}</small><br />
                                            <small><b>Montant total : </b> {separate(currentBordereau.map(bordereau => bordereau.montanttotalfacture).reduce((acc, curv) => acc + curv))} FCFA</small><br />
                                            <small><b>Statut : </b> {currentBordereau[0].statutbordereau}</small><br />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between mt-3">
                                <TextField
                                    className="col-2"
                                    variant="outlined"
                                    size="small"
                                    label="Rechercher un borderau"
                                    value={value2}
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
                                        setValue2(v)
                                    }}
                                />
                                <Chip
                                    className="ml-2"
                                    label="Facture(s)"
                                    avatar={
                                        <Avatar
                                            className="white-text"
                                            style={{ backgroundColor: global.theme.primary }}
                                        >
                                            {currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerobordereau)).length}
                                        </Avatar>
                                    }
                                />
                                <div className="col p-0 d-flex justify-content-end">
                                    <FormControl variant="outlined" size="small" className="col-3">
                                        <InputLabel id="statutbordereau-label">Statut du bordereau  </InputLabel>
                                        <Select
                                            labelId="statutbordereau-label"
                                            id="statutbordereau"
                                            defaultValue={currentBordereau[0].statutbordereau}
                                            onChange={({ target: { value } }) => { setstatutbordereau(value) }}
                                            label="Statut du bordereau "
                                            style={{ fontSize: "12px" }}
                                        >
                                            <MenuItem style={{ fontSize: "12px" }} value={"Création"}>Création</MenuItem>
                                            <MenuItem style={{ fontSize: "12px" }} value={"Envoie"}>Envoie</MenuItem>
                                            <MenuItem style={{ fontSize: "12px" }} value={"Décharge"}>Décharge réçue</MenuItem>
                                            <MenuItem style={{ fontSize: "12px" }} value={"Rejeté"}>Rejeté</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        className="text-white ml-3"
                                        startIcon={<CheckCircleOutlineIcon />}
                                        onClick={() => {
                                            thunkUpdateBordereau({ statut: statutbordereau }, currentBordereau[0].numerobordereau)
                                        }}
                                        style={{
                                            textTransform: "none",
                                            fontSize: "13px",
                                            backgroundColor: global.theme.primary
                                        }}
                                    >Valider</Button>
                                </div>
                            </div>
                        </div>
                        <table className="table-sm col-12 table-hover table-striped my-3">
                            <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                                <tr>{
                                    [
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

                                    ].map((col, i) => (<th className="white-text" key={i}>{col}</th>))

                                }
                                    {
                                        ["Montant Total",
                                            "Part Assu",
                                            "Reste assurance",
                                            "Part patient",].map((col, i) => (<th className="white-text text-right" key={i}>{col}</th>))
                                    }
                                </tr>

                            </thead>
                            <tbody>
                                {currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).map(
                                    ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour }, i) => (
                                        <tr
                                            key={numerofacture}
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
                                            <td className="text-right">{separate(montanttotalfacture)}</td>
                                            <td className="font-weight-bold text-right">{separate(partassurancefacture)}</td>
                                            <td className="font-weight-bold text-right">{separate(resteassurancefacture)}</td>
                                            <td className="text-right">{separate(partpatientfacture)}</td>
                                        </tr>
                                    )
                                )}
                                <tr className="white">
                                    <td colSpan={11}></td>
                                    <td className="text-white font-weight-bold bgcolor-primary">TOTAL : </td>
                                    <td className="text-white font-weight-bold text-right bgcolor-primary">
                                        {
                                            currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).length !== 0
                                            &&
                                            separate(currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).map(bordereau => bordereau.montanttotalfacture).reduce((acc, curv) => acc + curv))}
                                    </td>
                                    <td className="text-white font-weight-bold text-right bgcolor-primary">
                                        {
                                            currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).length !== 0
                                            &&
                                            separate(currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).map(bordereau => bordereau.partassurancefacture).reduce((acc, curv) => acc + curv))}
                                    </td>
                                    <td className="text-white font-weight-bold text-right bgcolor-primary">
                                        {
                                            currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).length !== 0
                                            &&
                                            separate(currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).map(bordereau => bordereau.resteassurancefacture).reduce((acc, curv) => acc + curv))}
                                    </td>
                                    <td className="text-white font-weight-bold text-right bgcolor-primary">
                                        {
                                            currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).length !== 0
                                            &&
                                            separate(currentBordereau.filter(bordereau => value2.trim() === "" || RegExp(value2, 'i').test(bordereau.numerofacture)).map(bordereau => bordereau.partpatientfacture).reduce((acc, curv) => acc + curv))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="col-12 d-flex justify-content-center mt-4">
                            <ReportProblemOutlinedIcon className="bg-warning mr-2" />
                            <small className="font-weight-bold">
                                Le retrait et la modification de la facture sont des actions sans confirmation et irréversibles</small>
                        </div>
                        <div onClick={() => {
                            return cie ? setcie(false) : setcie(true)
                        }} style={{ display: "inline" }}>
                            <Chip
                                className={`mr-2 ${cie ? "bgcolor-secondaryDark text-white font-weight-bold" : ""}`}
                                style={{ cursor: "pointer" }}
                                label="Factures CIE/SODECI"
                            />
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
                    >Fermer</Button>
                    <BordereauDoc showPDF={showPDF} code={``} bordereau={currentBordereau} cie={cie} />
                    <Button
                        variant="contained"
                        className="mb-2 red text-white ml-3"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => { thunkDeleteFacturesValides(currentBordereau.numerofacture) }}
                        style={{
                            textTransform: "none",
                            fontSize: "13px",
                        }}
                    >Supprimer</Button>
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
                                    Le retrait et la modification de la facture sont des actions sans confirmation et irréversibles
                                </small>
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
                        startIcon={<EditIcon />}
                        // onClick={() => {
                        //     thunkModifyFacture(currentFacture.numerosejour, inputModifs)
                        // }}
                        style={{
                            textTransform: "none",
                            backgroundColor: global.theme.primary,
                            color: "white",
                            fontSize: "13px",
                        }}
                    >
                        Valider la modification
                </Button>
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
    const { bordereauReducer: {
        listFacturesByAssurance,
        listFacturesValides,
        listFactures,
        currentBordereau,
        showModal,
        listBordereaux,
        loading,
        currentFacture,
        showDetailsFacture,
        typeBordereaux } } = state
    return {
        listFacturesByAssurance,
        listFacturesValides,
        listFactures,
        currentBordereau,
        showModal,
        listBordereaux,
        loading,
        currentFacture,
        showDetailsFacture,
        typeBordereaux
    }
}
const BordereauConnected = connect(mapStatToProps, {
    thunkAddBordereau,
    thunkListBorderaux,
    thunkAddBordereau,
    thunkListFacturesByAssurances,
    thunkDeleteFacturesValides,
    setListFacturesValides,
    setListFacturesByAssurance,
    setShowModal,
    thunkDetailsBorderau,
    setLoading,
    thunkUpdateBordereau,
    thunkDetailsFacture,
    thunkDeleteFacturesRecues,
    setShowDetailsFacture,
    setTypeBordereaux
})(Bordereau)
export default BordereauConnected;