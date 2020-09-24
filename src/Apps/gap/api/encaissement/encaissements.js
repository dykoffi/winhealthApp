import Axios from "axios"
import { header } from "../../../global/apiQuery"
import { Info } from "../../../global/context"

const initState = {
    listEncaissement: [],
    currentEncaissement: {},
    currentFacture: {},
    listFacturesVentiles: [],
    listFacturesByAssurance: [],
    showModal: false,
    modalFacture: false,
    loading: false
}

//actions 
const SET_LIST_FACTURES_BY_ASSURANCE = "SET_LIST_FACTURES_BY_ASSURANCE"
const SET_LIST_FACTURES_VENTILES = "SET_LIST_FACTURES_VENTILES"
const SET_LIST_ENCAISSEMENT = "SET_LIST_ENCAISSEMENT"
const SET_CURRENT_ENCAISSEMENT = "SET_CURRENT_ENCAISSEMENT"
const SET_MODAL = "SET_MODAL"
const SET_MODAL_FACTURE = "SET_MODAL_FACTURE"
const SET_LOADING = "SET_LOADING"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"

//ACTIONS CREATOR
export const setLoading = (bool) => ({ type: SET_LOADING, loading: bool })
export const setListFacturesVentiles = (data) => ({ type: SET_LIST_FACTURES_VENTILES, listFacturesVentiles: data })
export const setListFacturesByAssurance = (data) => ({ type: SET_LIST_FACTURES_BY_ASSURANCE, listFacturesByAssurance: data })
export const setModal = (bool) => ({ type: SET_MODAL, showModal: bool })
export const setModalFacture = (bool) => ({ type: SET_MODAL_FACTURE, modalFacture: bool })
const setCurrentFacture = (data) => ({ type: SET_CURRENT_FACTURE, currentFacture: data })
const setCurrentEncaissement = (data) => ({ type: SET_CURRENT_ENCAISSEMENT, currentEncaissement: data })
const setListEncaissement = (data) => ({ type: SET_LIST_ENCAISSEMENT, listEncaissement: data })

//REDUCER
const encaissementsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_ENCAISSEMENT: return { ...state, listEncaissement: action.listEncaissement };
        case SET_CURRENT_ENCAISSEMENT: return { ...state, currentEncaissement: action.currentEncaissement }
        case SET_CURRENT_FACTURE: return { ...state, currentFacture: action.currentFacture };
        case SET_LIST_FACTURES_BY_ASSURANCE: return { ...state, listFacturesByAssurance: action.listFacturesByAssurance };
        case SET_LIST_FACTURES_VENTILES: return { ...state, listFacturesVentiles: action.listFacturesVentiles };
        case SET_LOADING: return { ...state, loading: action.loading };
        case SET_MODAL: return { ...state, showModal: action.showModal };
        case SET_MODAL_FACTURE: return { ...state, modalFacture: action.modalFacture };
        default: return state;
    }
}

// LES THUNKS

export function thunkListEncaissement() {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/encaissements` }).then(({ data: { rows } }) => {
            dispatch(setListEncaissement(rows))
        })
    }
}

export function thunkDetailsEncaissement(numeroEncaissement) {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/gap/details/encaissement/${numeroEncaissement}`
        }).then(({ data: { rows } }) => {
            if (rows[0]) {
                dispatch(setCurrentEncaissement(rows[0]))
                dispatch(setModal(true))
            }
            else {
                dispatch(setCurrentEncaissement({}))
            }
        })
    }
}

export function thunkAddEncaissement(data) {
    return async (dispatch) => {
        const user = Info.user
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/encaissement`,
            data: { ...data, user: user, recepteur: Info.user.nomuser + " " + Info.user.prenomsuser },
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(({ data: { rows } }) => {
            dispatch(thunkListEncaissement())
        })
    }
}

export function thunkListFacturesByAssurances({ nomassurance, nomgarant, debutDateString, finDateString, typeSejour }) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({
            method: "GET",
            url: `${header.url}/gap/list/factures/${nomassurance}/${nomgarant}/${debutDateString}/${finDateString}/${typeSejour}`
        }).then(({ data: { rows } }) => {
            rows ? dispatch(setListFacturesByAssurance(rows)) : dispatch(setListFacturesByAssurance([]))
            dispatch(setLoading(false))
        })
    }
}

//AVOIR DES DETAILS SUR FACTURE
export function thunkDetailsFacture(numeroFacture) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/details/facture/${numeroFacture}` }).then(({ data: { rows } }) => {
            rows ? dispatch(setCurrentFacture(rows[0])) : dispatch(setCurrentFacture({}));
            dispatch(setModalFacture(true))
        })
    }
}
//ENCAISSER UNE FACTURE
//socket.emit("facture_encaisser", { sejour: idsejour, patient: patient })
export function thunkEncaisserFactures(numeroFacture, data) {
    return async (dispatch) => {
        const user = Info.user
        Axios({
            method: "POST",
            url: `${header.url}/gap/encaisser_assurance/facture/${numeroFacture}`,
            data: { ...data, user: user },
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(({ data: { rows } }) => {
            dispatch(thunkDetailsEncaissement(data.encaissement))
            dispatch(thunkListEncaissement())
            dispatch(setModalFacture(false))
        })
    }
}
export default encaissementsReducer