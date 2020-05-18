import Axios from "axios"
import { setCurrentPage } from './pages'
import { header } from "../../../global/apiQuery"

const initState = {
    currentPatient: {},
    dossiersPatient: [],
    loading: false
}

//les actions

const SET_CURRENT_PATIENT = "SET_CURRENT_PATIENT"
const SET_DOSSIERS_PATIENT = "SET_DOSSIERS_PATIENT"
const SET_LOADING = "SET_LOADING"

//les actions creators

const setCurrentPatient = (data) => ({
    type: SET_CURRENT_PATIENT,
    currentPatient: data,
    loading: false
})

const setLoading = () => ({
    type: SET_LOADING,
    loading: true
})

const setDossiersPatient = (data) => (
    {
        type: SET_DOSSIERS_PATIENT,
        dossiersPatient: data,
        loading: false
    }
)
//reducer
const detailsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_PATIENT:
            return {
                ...state,
                loading: action.loading,
                currentPatient: action.currentPatient
            }

        case SET_DOSSIERS_PATIENT:
            return {
                ...state,
                loading: action.loading,
                currentPatient: action.currentPatient
            }

        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            }

        default:
            return state
    }
}

//les thunks

export function thunkDetailsPatient(idPatient) {
    return async (dispatch) => {
        dispatch(setLoading())
        Axios({
            url: `${header.url}/gap/details/patient/${idPatient}`
        })
            .then(({ data: { rows } }) => {
               dispatch(setCurrentPatient(rows[0]))
               dispatch(setCurrentPage("dossiersPatient"))
            })
    }
}

export function thunkDossierPatient(idPatient) {
    return async (dispatch) => {
        dispatch(setLoading())
        Axios({
            url: `${header.url}/gap/dossiers/patient/${idPatient}`
        })
            .then(({ data: { rows } }) => {
                setDossiersPatient(rows)
            })
    }
}

export default detailsReducer