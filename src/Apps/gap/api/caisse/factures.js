import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = {
    listFactures: [],
    listFacturesPatient: [],
    listFacturesAttentes: [],
    currentFacture: [{}],
    currentPatient: {},
    categorieFactures: "tous",
    showModal: false
}

//les actions 
const SET_LIST_FACTURES = "SET_LIST_FACTURES"
const SET_CATEGORIE_FACTURES = "SET_CATEGORIE_FACTURES"
const SET_LIST_FACTURES_PATIENT = "SET_LIST_FACTURES_PATIENT"
const SET_LIST_FACTURES_ATTENTES = "SET_LIST_FACTURES_ATTENTES"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"
const SET_CURRENT_PATIENT = "SET_CURRENT_PATIENT"
const SET_SHOW_MODAL = "SET_SHOW_MODAL"

const setCategorieFactures = (categorie) => ({ type: SET_CATEGORIE_FACTURES, categorieFactures: categorie })
const setListFactures = (data) => ({ type: SET_LIST_FACTURES, listFactures: data })
const setListFacturesAttentes = (data) => ({ type: SET_LIST_FACTURES_ATTENTES, listFacturesAttentes: data })
const setListFacturesPatient = (data) => ({ type: SET_LIST_FACTURES_PATIENT, listFacturesPatient: data })

export const setShowModal = (bool) => ({ type: SET_SHOW_MODAL, showModal: bool })
export const setCurrentPatient = (data) => ({ type: SET_CURRENT_PATIENT, currentPatient: data })
export const setCurrentFacture = (data) => ({ type: SET_CURRENT_FACTURE, currentFacture: data })

//le reducer
const factureReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_FACTURES: return { ...state, listFactures: action.listFactures };
        case SET_CATEGORIE_FACTURES: return { ...state, categorieFactures: action.categorieFactures };
        case SET_LIST_FACTURES_PATIENT: return { ...state, listFacturesPatient: action.listFacturesPatient };
        case SET_LIST_FACTURES_ATTENTES: return { ...state, listFacturesAttentes: action.listFacturesAttentes };
        case SET_CURRENT_FACTURE: return { ...state, currentFacture: action.currentFacture };
        case SET_CURRENT_PATIENT: return { ...state, currentPatient: action.currentPatient };
        case SET_SHOW_MODAL: return { ...state, showModal: action.showModal };
        default: return state;
    }
}

//LISTER TOUTES LES FACTURES
export function thunkListFactures() {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/factures` })
            .then(({ data: { rows } }) => {
                dispatch(setListFactures(rows))
            })
    }
}

//AVOIR DES DETAILS SUR FACTURE
export function thunkDetailsFacture(numeroFacture, numeroSejour) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/details/sejour/${numeroSejour}` }).then(({ data: { rows } }) => {
            rows ? dispatch(setCurrentFacture(rows)) : dispatch(setCurrentFacture([{}]));
            dispatch(setShowModal(true))
        })
    }
}

//ENCAISSER UNE FACTURE
//socket.emit("facture_encaisser", { sejour: idsejour, patient: patient })
export function thunkEncaisserFactures(numeroFacture, data) {
    return async (dispatch, getState) => {
        const { factureReducer } = getState()
        Axios({
            method: "POST",
            url: `${header.url}/gap/encaisser_patient/facture/${numeroFacture}`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(({ data: { rows } }) => {
            dispatch(thunkListFacturesAttentes())
            dispatch(thunkListFacturesPatient(factureReducer.currentPatient));
            dispatch(setShowModal(false))
            socket.emit('attente')
        })
    }
}
//ENCAISSER TOUTES LES FACTURES
export function thunkEncaisserAllFactures(fg) {
    return async (dispatch, getState) => {
        const { factureReducer } = getState()
        Axios({
            method: "POST",
            data: fg,
            headers: { "content-type": "application/x-www-form-urlencoded", },
            url: `${header.url}/gap/encaisser_patient/all_factures`
        }).then(({ data: { rows } }) => {
            dispatch(thunkListFacturesAttentes())
            dispatch(thunkListFacturesPatient(factureReducer.currentPatient));
            dispatch(setShowModal(false))
        })
    }
}

//ANNULER UNE FACTURE
export function thunkAnnulerFactures(idsejour) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/annuler/facture/${idsejour}` }).then(({ data: { rows } }) => { dispatch(thunkListFacturesAttentes()) })
    }
}

//LISTE DES FACTURES EN ATTENTES OU FACTURES IMPAYÉES
export function thunkListFacturesAttentes() {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/factures_attentes` }).then(({ data: { rows } }) => {
            rows ? dispatch(setListFacturesAttentes(rows)) : dispatch(setListFacturesAttentes([]))
        })
    }
}

//RECHERCHER UNE FACTURE PAR SON NUMERO
export function thunkSearchFacture(numeroFacture) {
    return async (dispatch) => {
        if (numeroFacture.trim().length === 0) { dispatch(thunkListFacturesAttentes()) } else {
            Axios({ url: `${header.url}/gap/search/facture/${numeroFacture}` }).then(({ data: { rows } }) => {
                rows ? dispatch(setListFacturesAttentes(rows)) : dispatch(setListFacturesAttentes([]))
            })
        }
    }
}


//LISTER LES FACTURES PAR PATIENT
export function thunkListFacturesPatient(patient) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/factures_patient/${patient.ipppatient}` }).then(({ data: { rows } }) => {
            rows ? dispatch(setListFacturesPatient(rows)) : dispatch(setListFacturesPatient([]))
            dispatch(setCurrentPatient(patient))
            dispatch(setCategorieFactures("tous"))
        })
    }
}

export function thunkListFacturesPayeesPatient(patient) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/factures_payees_patient/${patient.ipppatient}` }).then(({ data: { rows } }) => {
            rows ? dispatch(setListFacturesPatient(rows)) : dispatch(setListFacturesPatient([]))
            dispatch(setCurrentPatient(patient))
            dispatch(setCategorieFactures("payé"))
        })
    }
}

export function thunkListFacturesImpayeesPatient(patient) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/factures_impayees_patient/${patient.ipppatient}` }).then(({ data: { rows } }) => {
            rows ? dispatch(setListFacturesPatient(rows)) : dispatch(setListFacturesPatient([]))
            dispatch(setCurrentPatient(patient))
            dispatch(setCategorieFactures("impayé"))
        })
    }
}

export function thunkAddAvoirFacture(numeroFacture, data) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/facture_avoir/${numeroFacture}`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(({ data: { rows } }) => {
            dispatch(thunkListAvoirFactures())
            dispatch(setShowModal(false))
        })
    }
}
export function thunkListAvoirFactures() {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/factures_avoir` }).then(({ data: { rows } }) => {
            rows ? dispatch(setListFactures(rows)) : dispatch(setListFactures([]))
        })
    }
}
export default factureReducer