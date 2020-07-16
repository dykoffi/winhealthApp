import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = {
    listComptes: [],
    currentCompte: {},
    showMmodal: false
}


//actions 
const SET_LIST_COMPTES = "SET_LIST_COMPTES"
const SET_CURRENT_COMPTE = "SET_CURRENT_COMPTE"
const SET_SHOW_MODAL = "SET_SHOW_MODAL"
//ACTIONS CREATOR

const setListComptes = (data) => ({
    type: SET_LIST_COMPTES,
    listComptes: data
})
export const setShowModal = (bool) => ({
    type: SET_SHOW_MODAL,
    showModal: bool
})
const setCurrentCompte = (compte) => ({
    type: SET_CURRENT_COMPTE,
    currentCompte: compte
})

//REDUCER
const comptesReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_COMPTES: return { ...state, listComptes: action.listComptes };
        case SET_CURRENT_COMPTE: return { ...state, currentCompte: action.currentCompte };
        case SET_SHOW_MODAL: return { ...state, showModal: action.showModal };
        default: return state;
    }
}

// LES THUNKS

export function thunkListComptes() {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/comptes` }).then(({ data: { rows } }) => {
            dispatch(setListComptes(rows))
        })
    }
}

export function thunkAddcompte(ipp) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/compte`,
            data: { ipp },
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(({ data: { rows } }) => { dispatch(thunkListComptes()) })
    }
}

export function thunkAddTransaction(data, compte) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/transaction`,
            data: { ...data, compte },
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(({ data: { rows } }) => {
            dispatch(thunkListComptes())
            dispatch(setShowModal(false))
        })
    }
}

export function thunkDetailsCompte(numeroCompte) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/details/compte/${numeroCompte}` }).then(({ data: { rows } }) => {
            rows ? dispatch(setCurrentCompte(rows[0])) : dispatch(setCurrentCompte({}))
            dispatch(setShowModal(true))
        })
    }
}

export function thunkSetCurrentCompte(numeroCompte) {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/details/compte/${numeroCompte}` }).then(({ data: { rows } }) => {
            rows ? dispatch(setCurrentCompte(rows[0])) : dispatch(setCurrentCompte({}))
            dispatch(setShowModal(true))
        })
    }
}

export function thunkSearchCompte(numeroCompte) {
    return async (dispatch) => {
        if (numeroCompte.trim().length === 0) { dispatch(thunkListComptes()) } else {
            Axios({ url: `${header.url}/gap/search/compte/${numeroCompte}` }).then(({ data: { rows } }) => {
                dispatch(setListComptes(rows))
            })
        }
    }
}


export default comptesReducer