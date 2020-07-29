import Axios from "axios"
import { header } from "../../../global/apiQuery"
import { setCurrentPage } from './pages'

const initState = {
    listPatients: [],
    currentPatient: {},
    modalModif: false,
    modalAdd: false,
    loading: false
}

const SET_LIST_PATIENTS = "SET_LIST_PATIENTS"
const SET_MODAL_MODIF = "SET_MODAL_MODIF"
const SET_MODAL_ADD = "SET_MODAL_ADD"
const SET_CURRENT_PATIENT = "SET_CURRENT_PATIENT"
const SET_LOADING = "SET_LOADING"

//definition des actions creators
const setListPatients = (list) => ({ type: SET_LIST_PATIENTS, listPatients: list })
export const setModalModif = (bool) => ({ type: SET_MODAL_MODIF, modalModif: bool })
export const setModalAdd = (bool) => ({ type: SET_MODAL_ADD, modalAdd: bool })
const setCurrentPatient = (data) => ({ type: SET_CURRENT_PATIENT, currentPatient: data })
export const setLoading = (bool) => ({ type: SET_LOADING, loading: bool })
const PatientsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_PATIENTS: return { ...state, listPatients: action.listPatients, loading: action.loading }
        case SET_CURRENT_PATIENT: return { ...state, loading: action.loading, currentPatient: action.currentPatient }
        case SET_LOADING: return { ...state, loading: action.loading }
        case SET_MODAL_MODIF: return { ...state, modalModif: action.modalModif }
        case SET_MODAL_ADD: return { ...state, modalAdd: action.modalAdd }
        default: return state
    }
}

export function thunkListPatient() {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({
            url: `${header.url}/gap/list/patients`
        }).then(({ data: { rows } }) => {
            dispatch(setListPatients(rows))
            dispatch(setLoading(false))
        })
    }
}

export function thunkSearchPatient(info) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        if (info.trim().length === 0) {
            dispatch(thunkListPatient())
        } else {
            Axios({
                url: `${header.url}/gap/search/patients/${info}`
            }).then(({ data: { rows } }) => {
                dispatch(setListPatients(rows))
                dispatch(setLoading(false))
            })
        }
    }
}

export function thunkDetailsPatient(ipppatient) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({
            url: `${header.url}/gap/details/patient/${ipppatient}`,
        })
            .then(({ data: { rows } }) => {
                dispatch(setCurrentPatient(rows[0]))
                dispatch(setCurrentPage("dossiersPatient"))
                dispatch(setLoading(false))
            })
    }
}

export function thunkAddPatient(data) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({
            url: `${header.url}/gap/add/patient`,
            method: "POST",
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", },
        }).then(({ data: { message, rows } }) => {
            dispatch(thunkListPatient())
            dispatch(setModalAdd(false))
            dispatch(setLoading(false))
        });
    }
}

export function thunkModifPatient(data, ipppatient) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({
            url: `${header.url}/gap/update/patient/${ipppatient}`,
            method: "POST",
            data: data,
            headers: { "content-type": "application/x-www-form-urlencoded", },
        }).then(({ data: { rows } }) => {
            dispatch(thunkListPatient())
            dispatch(thunkDetailsPatient(ipppatient))
            dispatch(setModalModif(false))
            dispatch(setLoading(false))
        });
    }
}

export function thunkDeletePatient(ipppatient) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({
            url: `${header.url}/gap/delete/patient/${ipppatient}`,
        })
            .then(({ data: { rows } }) => {
                dispatch(thunkListPatient())
                dispatch(setCurrentPatient({}))
                dispatch(setModalModif(false))
                dispatch(setLoading(false))
            })
    }
}

export default PatientsReducer