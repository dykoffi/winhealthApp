import React, { useEffect, useState, useContext, useRef } from "react";
import { connect } from "react-redux";
import Chart from 'chart.js'
import { schemeSet3 } from 'd3'
import GlobalContext from "../../../global/context";
import moment from 'moment'
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";
import MuiAlert from '@material-ui/lab/Alert';
import {
    thunkListFacturesByAssurances,
    thunkDetailsFacture,
    setShowModal,
    thunkDetailsBorderau,
    thunkListBorderaux,
    setLoading,
    setShowDetailsFacture,
    setTypeBordereaux
} from "../../api/statistiques/bordereaux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CancelIcon from "@material-ui/icons/CancelOutlined";

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
} from "@material-ui/core";
import Axios from "axios";
import { header } from "../../../global/apiQuery";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { separate } from "../../../global/functions";
//import { useSpeechSynthesis } from 'react-speech-kit';
// import useSpeechRecognition from "react-speech-kit/dist/useSpeechRecognition";

const Transition = React.forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });
function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }
const Bordereau = ({
    thunkListFacturesByAssurances,
    thunkListBorderaux,
    listBordereaux,
    listFacturesByAssurance,
    setListFacturesValides,
    currentBordereau,
    showModal,
    thunkDetailsBorderau,
    setShowModal,
    loading,
    setLoading,
    setListFacturesByAssurance,
}) => {
    const canvasbar = useRef(null)
    const canvasline = useRef(null)
    const canvaspie = useRef(null)
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [listAssurances, setListAssurance] = useState([]);

    //charts
    const [pie, setpie] = useState(null)
    const [line, setline] = useState(null)
    const [bar, setbar] = useState(null)

    //speech
    //const { speak } = useSpeechSynthesis();


    const [inputs, setinput] = useState({
        nomassurance: "Tous",
        nomgarant: "Tous",
        typeSejour: "Tous",
        statutBordereau: "tous",
        debutDateString: moment("01/01/2020").format('DD-MM-YYYY'),
        finDateString: moment("12/31/2020").format('DD-MM-YYYY'),
        debutDate: new Date("01/01/2020"),
        finDate: new Date("12/31/2020"),
    });


    function setdebutDate(value) { setinput({ ...inputs, debutDate: value, debutDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function setfinDate(value) { setinput({ ...inputs, finDate: value, finDateString: moment(value.toString()).format('DD-MM-YYYY') }) }
    function settype(value) { setinput({ ...inputs, typeSejour: value }) }
    function setstatut(value) { setinput({ ...inputs, statutBordereau: value }) }
    function setassurance(value) { setinput({ ...inputs, nomassurance: value }) }
    function setgarant(value) { setinput({ ...inputs, nomgarant: value }) }
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
        "Nombre de factures",
        "Montant total",
        "Part Assurance",
        "Part Patient",
    ]

    const global = useContext(GlobalContext);
    useEffect(() => {
        thunkListFacturesByAssurances(inputs)
        thunkListBorderaux()
        Axios({ url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => {
            const Assurances = [];
            rows.forEach(({ idassurance, nomassurance }) => { Assurances.push({ value: idassurance, label: nomassurance }); });
            setListAssurance(Assurances);
        });
    }, []);

    useEffect(() => {
        const charLine = canvasline.current.getContext("2d");
        const charBar = canvasbar.current.getContext("2d");
        const charPie = canvaspie.current.getContext("2d");

        bar !== null && bar.destroy()
        setbar(new Chart(charBar, {
            type: "horizontalBar",
            data: {
                //Bring in data
                labels: ["Consultation", "Hospitalisation", "Urgence", "Biologie", "Imagerie", "Soins"],
                datasets: listAssurances
                    .filter(assurance => listBordereaux.map(bordereau => bordereau.gestionnairebordereau).includes(assurance.label))
                    .map(
                        (assurance, i) => {
                            return {
                                label: assurance.label,
                                data: [
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.typesejourbordereau === "Consultation").length,
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.typesejourbordereau === "Hospitalisation").length,
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.typesejourbordereau === "Urgence").length,
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.typesejourbordereau === "Biologie").length,
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.typesejourbordereau === "Imagerie").length,
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.typesejourbordereau === "Soins").length,
                                ],
                                borderColor: 'transparent',
                                backgroundColor: schemeSet3[i]
                            }
                        }
                    )
            },
            options: {
                scales : {
                    xAxes : [
                        {
                            
                        }
                    ]
                }
                //Customize chart options
            }
        }))

        //PIE

        pie !== null && pie.destroy()
        setpie(new Chart(charPie, {
            type: "doughnut",
            data: {
                labels: ["Envoyé", "Décharge", "Rejeté", "Encaissé",],
                datasets: [
                    {
                        data: [
                            listBordereaux.filter(b => b.statutbordereau === "Envoie").length,
                            listBordereaux.filter(b => b.statutbordereau === "Décharge").length,
                            listBordereaux.filter(b => b.statutbordereau === "Rejeté").length,
                            listBordereaux.filter(b => b.statutbordereau === "Encaisse").length,
                        ], backgroundColor: [
                            schemeSet3[0],
                            schemeSet3[1],
                            schemeSet3[3],
                            schemeSet3[2],
                        ],
                        borderWidth: 0
                    },
                ]
            },
            options: {
                //Customize chart options
            }
        }))

        //LINE
        line !== null && line.destroy()
        setline(new Chart(charLine, {
            type: "horizontalBar",
            data: {
                //Bring in data
                labels: ["Encaissé", "Rejeté", "Décharge", "Envoyé"],
                datasets: listAssurances
                    .filter(assurance => listBordereaux.map(bordereau => bordereau.gestionnairebordereau).includes(assurance.label))
                    .map(
                        (assurance, i) => {
                            return {
                                label: assurance.label,
                                data: [
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.statutbordereau === "Encaissé").length,
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.statutbordereau === "Rejeté").length,
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.statutbordereau === "Décharge").length,
                                    listBordereaux.filter(b => b.gestionnairebordereau === assurance.label && b.statutbordereau === "Envoie").length,
                                ],
                                borderColor: 'transparent',
                                backgroundColor: schemeSet3[i]
                            }
                        }
                    )
            },
            options: {
                //Customize chart options
            }
        }))
    }, [listBordereaux, listAssurances])
    // const { listen, listening, stop } = useSpeechRecognition({
    //     onResult: (result) => {
    //         sets(result)
    //         if (result.match(/statistiques de ascoma/)) {
    //             speak({ text: "Il n'existe aucune données statistiques, enregistrées avec ascoma. La seule données enregistrée, est celle de sounou assurance. Voulez vous l'afficher?" })
    //         }
    //         if (result.match(/ok/)) {
    //             stop()
    //             setstats(true)
    //         }
    //     },
    // });
    // const [s, sets] = useState("")
    // const [stats, setstats] = useState(false)
    // useEffect(() => {
    //     setTimeout(() => {
    //         speak({ text: "Bienvenue Monsieur, sur les statistiques de winhealth. Que voulez vous faire ?" })
    //         listen()
    //     }, 1000);

    // }, [listBordereaux])


    return (
        <div className="Facturesvalides row p-2">
            <div className="col-12 mb-2">
                <div className="row mb-2 d-flex justify-content-center">
                    <Autocomplete
                        size="small"
                        className="col p-0"
                        id="AssuranceList"
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
                            labelId="typesejour-label"
                            defaultValue={"Tous"}
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
                            <MenuItem style={{ fontSize: "12px" }} value={"Hospitalisation"}>Hospitalisation</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"Soins"}>Soins</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" size="small" className="col ml-2">
                        <InputLabel id="statutbordereau-label">Statut du borderau</InputLabel>
                        <Select
                            labelId="statutbordereau-label"
                            id="statutbordereau"
                            defaultValue={inputs.statutBordereau}
                            onChange={({ target: { value } }) => {
                                inputs.nomassurance.trim() !== "" &&
                                    inputs.nomgarant.trim() !== "" &&
                                    setstatut(value)

                            }}
                            label="Type de sejour "
                            style={{ fontSize: "12px" }}
                        >
                            <MenuItem style={{ fontSize: "12px" }} value={"tous"}>Tous</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"envoie"}>Envoie</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"decharge"}>Décharge</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"rejete"}>Rejet</MenuItem>
                            <MenuItem style={{ fontSize: "12px" }} value={"creation"}>Création</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                        <KeyboardDatePicker className='col mx-2' label='Du' id="datedebut" defaultValue={new Date("01/01/2020")} value={inputs.debutDate} format="dd/MM/yyyy" onChange={
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

                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} >
                        <KeyboardDatePicker className='col' label='Au' id="datefin" defaultValue={new Date("12/31/2020")} value={inputs.finDate} format="dd/MM/yyyy" onChange={
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
            <div className="col-12 mb-2 p-0 stats">
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center col-4">
                        <canvas ref={canvasbar}></canvas>
                    </div>
                    <div className="d-flex justify-content-center align-items-center col-4">
                        <canvas ref={canvasline}></canvas>
                    </div>
                    <div className="d-flex justify-content-center align-items-center col-4">
                        <canvas ref={canvaspie}></canvas>
                    </div>
                </div>
            </div>
            <table className="table-sm col-12 table-hover mb-2">
                <thead style={{ backgroundColor: global.theme.primary }}>
                    <tr>{["Assurance", "Nombre bordereaux", "Nombre Factures", "Montant total", "Part assurance", "Payés", "Impayés"].map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                </thead>
                <tbody>
                    {
                        listAssurances
                            .filter(assurance => listBordereaux.map(bordereau => bordereau.gestionnairebordereau).includes(assurance.label))
                            .map((assurance, i) =>
                                <tr>
                                    <td>{assurance.label}</td>
                                    <td>{listBordereaux.filter(bordereau => bordereau.gestionnairebordereau === assurance.label).length}</td>
                                    <td>{listBordereaux
                                        .filter(bordereau => bordereau.gestionnairebordereau === assurance.label)
                                        ?.map(bordereau => parseInt(bordereau.nbfacture))
                                        ?.reduce((acc, curv) => acc + curv)
                                    }</td>
                                    <td>{
                                        listBordereaux
                                            .filter(bordereau => bordereau.gestionnairebordereau === assurance.label)
                                            ?.map(bordereau => bordereau.montanttotal)
                                            ?.reduce((acc, curv) => acc + curv)
                                    }</td>
                                    <td>{
                                        listBordereaux
                                            .filter(bordereau => bordereau.gestionnairebordereau === assurance.label)
                                            ?.map(bordereau => bordereau.partassurance)
                                            ?.reduce((acc, curv) => acc + curv)
                                    }</td>
                                    <td>0</td>
                                    <td>{
                                        listBordereaux
                                            .filter(bordereau => bordereau.gestionnairebordereau === assurance.label)
                                            ?.map(bordereau => bordereau.partassurance)
                                            ?.reduce((acc, curv) => acc + curv)
                                    }</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>

            <div className="col-12 mb-2">
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
                                    {listFacturesByAssurance.filter(bordereau => value.trim() === "" || RegExp(value, 'i').test(bordereau.numerobordereau))
                                        .filter(bordereau => statutbordereauTab(inputs.statutBordereau).includes(bordereau.statutbordereau)).length}
                                </Avatar>
                            }
                        />
                    </div>
                </div>
            </div>
            <table className="table-sm col-12 table-hover table-striped">
                <thead style={{ backgroundColor: global.theme.secondaryDark }}>
                    <tr>{columnsBordereau.map((col, i) => (<th className="white-text" key={i}>{col}</th>))}</tr>
                </thead>
                <tbody>
                    {listFacturesByAssurance.filter(bordereau => value.trim() === "" || RegExp(value, 'i').test(bordereau.numerobordereau))
                        .filter(bordereau => statutbordereauTab(inputs.statutBordereau).includes(bordereau.statutbordereau))
                        .map(
                            ({ numerobordereau, datecreationbordereau, gestionnairebordereau, datelimitebordereau, organismebordereau, typesejourbordereau, statutbordereau, nbfactures, montanttotal, partassurance, partpatient }, i) => (
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
                                    <td>{nbfactures}</td>
                                    <td>{separate(montanttotal)}</td>
                                    <td>{separate(partassurance)}</td>
                                    <td>{separate(partpatient)}</td>
                                </tr>
                            )
                        )}
                </tbody>
            </table>
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
                                    label="Rechercher une facture"
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
                                    ({ numerofacture, gestionnaire, organisme, matriculeassure, numeropec, assureprinc, taux, datefacture, heurefacture, nompatient, prenomspatient, montanttotalfacture, partassurancefacture, resteassurancefacture, partpatientfacture, typesejour, erreurfacture, commentairefacture }, i) => (
                                        <tr
                                            key={numerofacture}
                                            style={{ cursor: "default" }}
                                            className={erreurfacture === "warning" ? "bg-warning" : ""}
                                            title={commentairefacture}
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
                    {/* <BordereauDoc showPDF={showPDF} code={``} bordereau={currentBordereau} cie={cie} /> */}
                </DialogActions>
            </Dialog>
            <Snackbar open={loading} onClose={() => setLoading(false)}>
                <Alert variant='standard' severity="info" >
                    Chargement ...
                </Alert>
            </Snackbar>
            {/* <Snackbar open={true} onClose={() => setLoading(false)}>
                <Alert variant='standard' severity="info" >
                    {s}
                </Alert>
            </Snackbar> */}
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
    thunkListBorderaux,
    thunkListFacturesByAssurances,
    setShowModal,
    thunkDetailsBorderau,
    setLoading,
    thunkDetailsFacture,
    setShowDetailsFacture,
    setTypeBordereaux
})(Bordereau)
export default BordereauConnected;
