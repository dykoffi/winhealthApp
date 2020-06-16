import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = { listAssurances: [], currentAssurance: {}, loading: false, showModalDetails: false }

const SET_LIST_ASSURANCE = "SET_LIST_ASSURANCE"
const SET_CURRENT_ASSURANCE = "SET_CURRENT_ASSURANCE"
const SET_LOADING = "SET_LOADING"
const SET_SHOW_MODAL_DETAILS = "SET_SHOW_MODAL_DETAILS"

const setListAssurance = (data) => ({ type: SET_LIST_ASSURANCE, listAssurances: data, loading: false })
const setCurrentAssurance = (data) => ({ type: SET_CURRENT_ASSURANCE, currentAssurance: data, loading: false })
const setLoading = (bool) => ({ type: SET_LOADING, loading: bool })
export const setShowModalDetails = (bool) => ({ type: SET_SHOW_MODAL_DETAILS, showModalDetails: bool })

const assuranceReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_ASSURANCE: return { ...state, listAssurances: action.listAssurances, loading: action.loading }
        case SET_CURRENT_ASSURANCE: return { ...state, currentAssurance: action.currentAssurance, loading: action.loading }
        case SET_LOADING: return { ...state, loading: action.loading }
        case SET_SHOW_MODAL_DETAILS: return { ...state, showModalDetails: action.showModalDetails }
        default: return state
    }
}

/*Ajouter une assurance */
export function thunkAddAssurance(data) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/assurance`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(() => { dispatch(thunkListAssurances()) })
    }
}

export function thunkListAssurances() {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({ method: "GET", url: `${header.url}/gap/list/assurances`, }).then(({ data: { rows } }) => { dispatch(setListAssurance(rows)) })
    }
}

export function thunkSearchAssurance(info) {
    return async (dispatch) => {
        if (info.trim() === "") { dispatch(thunkListAssurances()) }
        else {
            Axios({ method: "GET", url: `${header.url}/gap/search/assurance/${info}`, }).then(({ data: { rows } }) => { dispatch(setListAssurance(rows)) })
        }
    }
}

export function thunkDetailsAssurance(idAssurance) {
    return async (dispatch) => {
        Axios({ method: "GET", url: `${header.url}/gap/details/assurance/${idAssurance}`, }).then(({ data: { rows } }) => {
            rows[0] ? dispatch(setCurrentAssurance(rows[0])) : dispatch(setCurrentAssurance({}))
            dispatch(setShowModalDetails(true))
        })
    }
}

export function thunkDeleteAssurance(idAssurance) {
    return async (dispatch) => {
        Axios({
            method: "GET",
            url: `${header.url}/gap/delete/assurance/${idAssurance}`,
        }).then(({ data: { rows } }) => {
            dispatch(thunkListAssurances())
            dispatch(setShowModalDetails(false))
        })
    }
}

export function thunkUpdateAssurance(idAssurance, data) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({
            method: "POST",
            url: `${header.url}/gap/update/assurance/${idAssurance}`,
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(() => {
            dispatch(thunkListAssurances())
            dispatch(setShowModalDetails(false))
        })
    }
}

export default assuranceReducer