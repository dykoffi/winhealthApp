import Axios from "axios"
import { setCurrentPage } from './pages'
import { header } from '../../constants/apiQuery'

const initState = {
    listAttentePatients: [],
    loading: null,
    currentPatient: {},
    currentSejour: null
}

//les actions
const SET_CURRENT_PATIENT = "SET_CURRENT_PATIENT"
const SET_LIST_PATIENTS = "SET_LIST_PATIENTS"
const SET_CURRENT_SEJOUR = "SET_CURRENT_SEJOUR"
const LOADING = "LAODING"

//definition des actions creators
const setListPatients = (list) => (
    {
        type: SET_LIST_PATIENTS,
        listAttentePatients: list,
        loading: false
    }
)

const setCurrentSejour = (data) => ({
    type: SET_CURRENT_SEJOUR,
    currentSejour: data,
    loadingConstantes: false
})

const setLoading = () => ({
    type: LOADING,
    loading: true
})
const setCurrentPatient = (data) => ({
    type: SET_CURRENT_PATIENT,
    currentPatient: data,
    loading: false
})

const PatientsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_PATIENT:
            return {
                ...state,
                loading: action.loading,
                currentPatient: action.currentPatient
            }
        case SET_LIST_PATIENTS:
            return {
                ...state,
                listAttentePatients: action.listAttentePatients,
                loading: action.loading
            }
        case SET_CURRENT_SEJOUR:
            return {
                ...state,
                currentSejour: action.currentSejour,
                loadingConstantes: action.loadingConstantes
            }
        case LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state
    }
}

export function thunkListAttentePatients() {
    return async (dispatch) => {
        dispatch(setLoading())
        Axios({
            url: `${header.url}/dpi/list/consultations/file_attente`
        }).then(({ data: { rows } }) => {
            console.log(rows)
            dispatch(setListPatients(rows))
        })
    }
}

export function thunkSearchPatient(info) {
    return async (dispatch) => {
        dispatch(setLoading())
        if (info.trim().length === 0) {
            dispatch(thunkListAttentePatients())
        } else {
            Axios({
                url: `${header.url}/gap/search/patients/${info}`
            }).then(({ data: { rows } }) => {
                dispatch(setListPatients(rows))
            })
        }
    }
}

export function thunkDetailsPatient(idPatient, idSejour) {
    return async (dispatch) => {
        dispatch(setLoading())
        Axios({
            url: `${header.url}/gap/details/patient/${idPatient}`
        })
            .then(({ data: { rows } }) => {
                dispatch(setCurrentPatient(rows[0]))
                dispatch(setCurrentSejour(idSejour))
                dispatch(setCurrentPage("constantePatient"))
            })
    }
}

export default PatientsReducer