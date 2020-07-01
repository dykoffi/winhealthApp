import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = { 
    listFactures: [],
    listFacturesRecues : [],
    listFacturesValides : [],
    currentFacture: {}, 
    currentPage : "",
    showModal: false 
}

//les actions 
const SET_LIST_FACTURES = "SET_LIST_FACTURES"
const SET_LIST_FACTURES_RECUES = "SET_LIST_FACTURES_RECUES"
const SET_LIST_FACTURES_VALIDES = "SET_LIST_FACTURES_VALIDES"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"
const SET_SHOW_MODAL = "SET_SHOW_MODAL"

const setCurrentFacture = (data) => ({ type: SET_CURRENT_FACTURE, currentFacture: data })
const setListFactures = (data) => ({ type: SET_LIST_FACTURES, listFactures: data })
export const setCurrentPage = (page) => ({ type: SET_CURRENT_FACTURE, currentPage: page })
export const setListFacturesRecues = (data) => ({ type: SET_LIST_FACTURES_RECUES, listFacturesRecues: data })
export const setListFacturesValides = (data) => ({ type: SET_LIST_FACTURES_VALIDES, listFacturesValides: data })
export const setShowModal = (bool) => ({ type: SET_SHOW_MODAL, showModal: bool })

//le reducer
const borderauReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_FACTURES: return { ...state, listFactures: action.listFactures };
        case SET_LIST_FACTURES_RECUES: return { ...state, listFacturesRecues: action.listFacturesRecues };
        case SET_LIST_FACTURES_VALIDES: return { ...state, listFacturesValides: action.listFacturesValides };
        case SET_CURRENT_FACTURE: return { ...state, currentFacture: action.currentFacture };
        case SET_CURRENT_PAGE: return { ...state, currentPage: action.currentPage };
        case SET_SHOW_MODAL: return { ...state, showModal: action.showModal };
        default: return state;
    }
}

export function thunkListFacturesByAssurances({ assurance, debutDateString, finDateString, typeSejour }) {
    return async (dispatch) => {
        Axios({
            method: "GET",
            url: `${header.url}/gap/list/factures/${assurance}/${debutDateString}/${finDateString}/${typeSejour}`
        }).then(({ data: { rows } }) => { rows ? dispatch(setListFactures(rows)) : dispatch(setListFactures([])) })
    }
}

export function thunkAddBordereau(data) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/bordereau`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then()
    }
}


export default borderauReducer