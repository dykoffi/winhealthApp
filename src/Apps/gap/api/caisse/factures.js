import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = {
    listFactures: [],
    listFacturesAttentes: [],
    currentFacture: {},
    showModal: false
}

//les actions 
const SET_LIST_FACTURES = "SET_LIST_FACTURES"
const SET_LIST_FACTURES_ATTENTES = "SET_LIST_FACTURES_ATTENTES"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"
const SET_SHOW_MODAL = "SET_SHOW_MODAL"

const setCurrentFacture = (data) => ({
    type: SET_CURRENT_FACTURE,
    currentFacture: data
})

const setListFacturesAttentes = (data) => ({
    type: SET_LIST_FACTURES_ATTENTES,
    listFacturesAttentes: data
})

export const setShowModal = (bool) => ({
    type: SET_SHOW_MODAL,
    showModal: bool
})

//le reducer

const factureReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_FACTURES:
            return {
                ...state,
                listFactures: action.listFactures
            };
        case SET_LIST_FACTURES_ATTENTES:
            return {
                ...state,
                listFacturesAttentes: action.listFacturesAttentes
            };
        case SET_CURRENT_FACTURE:
            return {
                ...state,
                currentFacture: action.currentFacture
            };
        case SET_SHOW_MODAL:
            return {
                ...state,
                showModal: action.showModal
            };
        default:
            return state;
    }
}

export function thunkListFactures() {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/gap/list/factures`
        }).then(({ data: { rows } }) => {
            dispatch(setListFacturesAttentes(rows))
        })
    }
}

export function thunkDetailsFacture(numeroFacture) {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/gap/details/facture/${numeroFacture}`
        }).then(({ data: { rows } }) => {
            rows ? dispatch(setCurrentFacture(rows[0])) : dispatch(setCurrentFacture({}))
            dispatch(setShowModal(true))
        })
    }
}

export function thunkEncaisserFactures(numeroFacture, data) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/encaisser_patient/facture/${numeroFacture}`,
            data: data,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            }
        }).then(({ data: { rows } }) => {
            //socket.emit("facture_encaisser", { sejour: idsejour, patient: patient })
            dispatch(thunkListFacturesAttentes())
        })
    }
}

export function thunkAnnulerFactures(idsejour) {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/gap/annuler/facture/${idsejour}`
        }).then(({ data: { rows } }) => {
            dispatch(thunkListFacturesAttentes())
        })
    }
}

export function thunkListFacturesAttentes() {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/gap/list/factures_attentes`
        }).then(({ data: { rows } }) => {
            rows ? dispatch(setListFacturesAttentes(rows)) : dispatch(setListFacturesAttentes([]))
        })
    }
}

export function thunkSearchFacture(numeroFacture) {
    return async (dispatch) => {
        if (numeroFacture.trim().length === 0) {
            dispatch(thunkListFacturesAttentes())
        } else {
            Axios({
                url: `${header.url}/gap/search/facture/${numeroFacture}`
            }).then(({ data: { rows } }) => {
                rows ? dispatch(setListFacturesAttentes(rows)) : dispatch(setListFacturesAttentes([]))
            })
        }
    }
}

export default factureReducer