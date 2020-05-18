import Axios from "axios"
import { header } from "../../../global/apiQuery"

const initState = {
    listPatients: [],
    loading: null
}

const SET_LIST_PATIENTS = "SET_LIST_PATIENTS"
const LOADING = "LAODING"

//definition des actions creators
const setListPatients = (list) => (
    {
        type: SET_LIST_PATIENTS,
        listPatients: list,
        loading: false
    }
)

const setLoading = () => ({
    type: LOADING,
    loading: true
})

const listPatientsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_PATIENTS:
            return {
                ...state,
                listPatients: action.listPatients,
                loading: action.loading
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

export function thunkListPatient() {

    return async (dispatch) => {
        dispatch(setLoading())
        Axios({
            url: `${header.url}/gap/list/patients`
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
            Axios({
                url: `${header.url}/gap/list/patients`
            }).then(({ data: { rows } }) => {
                console.log(rows)
                dispatch(setListPatients(rows))
            })
        } else {
            Axios({
                url: `${header.url}/gap/search/patients/${info}`
            }).then(({ data: { rows } }) => {
                dispatch(setListPatients(rows))
            })
        }
    }
}

export default listPatientsReducer