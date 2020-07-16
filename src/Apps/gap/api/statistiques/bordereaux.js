
import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = {
    listFactures: [],
    listFacturesByAssurance: [],
    listFacturesRecues: [],
    listFacturesValides: [],
    listBordereaux: [],
    currentBordereau: [{}],
    currentFacture: {},
    showModal: false,
    showDetailsFacture: false,
    loading: false,
    typeBordereaux: "tous"
}

//les actions 
const SET_LIST_FACTURES = "SET_LIST_FACTURES"
const SET_SHOW_DETAILS_FACTURE = "SET_SHOW_DETAILS_FACTURE"
const SET_TYPE_BORDEREAUX = "SET_TYPE_BORDEREAU"
const SET_LIST_BORDEREAUX = "SET_LIST_BORDEREAUX"
const SET_LIST_FACTURES_BY_ASSURANCE = "SET_LIST_FACTURES_BY_ASSURANCE"
const SET_LIST_FACTURES_RECUES = "SET_LIST_FACTURES_RECUES"
const SET_LIST_FACTURES_VALIDES = "SET_LIST_FACTURES_VALIDES"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"
const SET_CURRENT_BORDEREAU = "SET_CURRENT_BORDEREAU"
const SET_SHOW_MODAL = "SET_SHOW_MODAL"
const SET_LOADING = "SET_LOADING"

const setCurrentFacture = (data) => ({ type: SET_CURRENT_FACTURE, currentFacture: data })
const setListFactures = (data) => ({ type: SET_LIST_FACTURES, listFactures: data })

const setCurrentBordereau = (data) => ({ type: SET_CURRENT_BORDEREAU, currentBordereau: data })
const setListBordereaux = (data) => ({ type: SET_LIST_BORDEREAUX, listBordereaux: data })
export const setTypeBordereaux = (type) => ({ type: SET_TYPE_BORDEREAUX, typeBordereaux: type })

export const setListFacturesByAssurance = (data) => ({ type: SET_LIST_FACTURES_BY_ASSURANCE, listFacturesByAssurance: data })
export const setListFacturesRecues = (data) => ({ type: SET_LIST_FACTURES_RECUES, listFacturesRecues: data })
export const setListFacturesValides = (data) => ({ type: SET_LIST_FACTURES_VALIDES, listFacturesValides: data })
export const setShowModal = (bool) => ({ type: SET_SHOW_MODAL, showModal: bool })
export const setShowDetailsFacture = (bool) => ({ type: SET_SHOW_DETAILS_FACTURE, showDetailsFacture: bool })
export const setLoading = (bool) => ({ type: SET_LOADING, loading: bool })

//le reducer
const borderauReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_FACTURES: return { ...state, listFactures: action.listFactures };
        case SET_LIST_BORDEREAUX: return { ...state, listBordereaux: action.listBordereaux };
        case SET_TYPE_BORDEREAUX: return { ...state, typeBordereaux: action.typeBordereaux };
        case SET_LIST_FACTURES_BY_ASSURANCE: return { ...state, listFacturesByAssurance: action.listFacturesByAssurance };
        case SET_LIST_FACTURES_RECUES: return { ...state, listFacturesRecues: action.listFacturesRecues };
        case SET_LIST_FACTURES_VALIDES: return { ...state, listFacturesValides: action.listFacturesValides };
        case SET_CURRENT_FACTURE: return { ...state, currentFacture: action.currentFacture };
        case SET_CURRENT_BORDEREAU: return { ...state, currentBordereau: action.currentBordereau };
        case SET_SHOW_MODAL: return { ...state, showModal: action.showModal };
        case SET_SHOW_DETAILS_FACTURE: return { ...state, showDetailsFacture: action.showDetailsFacture };
        case SET_LOADING: return { ...state, loading: action.loading };
        default: return state;
    }
}

export function thunkListFacturesByAssurances({ nomassurance, nomgarant, debutDateString, finDateString, typeSejour }) {
    return async (dispatch) => {
        Axios({
            method: "GET",
            url: `${header.url}/gap/list/factures/${nomassurance}/${nomgarant}/${debutDateString}/${finDateString}/${typeSejour}`
        }).then(({ data: { rows } }) => { rows ? dispatch(setListFacturesByAssurance(rows)) : dispatch(setListFacturesByAssurance([])) })
    }
}

export function thunkSendFacturesRecues(data) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/factures_recues`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(() => { dispatch(thunkListFactures()) })
    }
}

export function thunkSendFacturesValides(data) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/factures_valides`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(() => { dispatch(thunkListFactures()) })
    }
}

export function thunkDeleteFacturesRecues(numeroFacture) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/retrait/facture_recue/${numeroFacture}` }).then(() => {
            dispatch(thunkListFactures())
            dispatch(setShowDetailsFacture(false))
        })
    }
}

export function thunkDeleteFacturesValides(numeroFacture) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/retrait/facture_valide/${numeroFacture}` }).then(() => {
            dispatch(thunkListFactures())
            dispatch(setShowDetailsFacture(false))
        })
    }
}

//bordereaux
export function thunkAddBordereau(data) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/bordereau`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(() => { dispatch(thunkListBorderaux()) })
    }
}

export function thunkUpdateBordereau(data, numeroBordereau) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/update/statut_bordereau/${numeroBordereau}`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(() => {
            dispatch(setShowModal(false))
            dispatch(thunkListBorderaux())
        })
    }
}

export function thunkListBorderaux() {
    return async (dispatch) => { Axios({ url: `${header.url}/gap/list/bordereaux` }).then(({ data: { rows } }) => { dispatch(setListBordereaux(rows)) }) }
}

export function thunkDetailsBorderau(numeroBordereau) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({ url: `${header.url}/gap/details/bordereau/${numeroBordereau}` }).then(({ data: { rows } }) => {
            dispatch(setCurrentBordereau(rows))
            dispatch(setLoading(false))
            dispatch(setShowModal(true))
        })
    }
}

export function thunkTypeBordereaux(type) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({ url: `${header.url}/gap/list/bordereaux/${type}` }).then(({ data: { rows } }) => {
            dispatch(setCurrentBordereau(rows))
            dispatch(setLoading(false))
        })
    }

}

//factures
export function thunkListFactures() {
    return async (dispatch) => { Axios({ url: `${header.url}/gap/list/factures_assurances` }).then(({ data: { rows } }) => { dispatch(setListFactures(rows)) }) }
}

export function thunkDetailsFacture(numeroFacture) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/details/facture/${numeroFacture}` }).then(({ data: { rows } }) => {
            rows ? dispatch(setCurrentFacture(rows[0])) : dispatch(setCurrentFacture({}));
            dispatch(setShowDetailsFacture(true))
        })
    }
}

export function thunkModifyFacture(numeroSejour, data) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/update/sejour/${numeroSejour}`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(() => {
            dispatch(thunkListFactures())
            dispatch(setShowDetailsFacture(false))
        })
    }
}
export default borderauReducer