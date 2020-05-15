import Axios from "axios"
import { header } from "../../constants/apiQuery"
import { Cookies } from 'react-cookie'
// import store from './store'
const cookies = new Cookies()

const initState = {
    listConstantes: [],
    currentConstante: null,
    loadingConstantes: false
}

//les actions
const SET_LIST_CONSTANTES = "SET_LIST_CONSTANTES"
const SET_CURRENT_CONSTANTE = "SET_CURRENT_CONSTANTE"
const SET_LOADING_CONSTANTES = "SET_LOADING_CONSTANTES"

//les actions creators
const setListConstantes = (data) => ({
    type: SET_LIST_CONSTANTES,
    listConstantes: data,
    loadingConstantes: false
})

const setLoadingConstantes = () => ({
    type: SET_LOADING_CONSTANTES,
    loadingConstantes: true
})

const setCurrentConstante = (data) => ({
    type: SET_CURRENT_CONSTANTE,
    currentConstante: data,
    loadingConstantes: false
})

const constantesReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_CONSTANTES:
            console.log(state)
            return {
                ...state,
                listConstantes: action.listConstantes,
                loadingConstantes: action.loadingConstantes
            }
        case SET_CURRENT_CONSTANTE:
            return {
                ...state,
                currentConstante: action.currentConstante,
                loadingConstantes: action.loadingConstantes
            }

        case SET_LOADING_CONSTANTES:
            return {
                ...state,
                loadingConstantes: action.loadingConstantes
            }

        default:
            return state
    }
}

export function thunkListConstantes(patient) {
    return async (dispatch) => {
        dispatch(setLoadingConstantes())
        Axios({
            url: `${header.url}/dpi/list/constantes/${patient}`
        }).then(({ data: { rows } }) => {
            dispatch(setListConstantes(rows))
            // console.log(store)
        })
    }
}

export function thunkSetCurrentConstante(patient) {
    return async (dispatch) => {
        dispatch(setLoadingConstantes())
        Axios({
            url: `${header.url}/dpi/list/last_constante/${patient}`
        }).then(({ data: { rows } }) => {
           rows[0] ? dispatch(setCurrentConstante(rows[0])) : dispatch(setCurrentConstante(null))
        })
    }
}

export function thunkAddConstantes(sejour, inputs, patient) {
    const { nomuser, prenomsuser } = cookies.get("user", { path: '/' })
    return async (dispatch) => {
        dispatch(setLoadingConstantes())
        Axios({
            method: 'POST',
            url: `${header.url}/dpi/add/constantes/${sejour}`,
            data: { ...inputs, sejourConstante: sejour, auteurConstante: `${nomuser} ${prenomsuser}` },
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            }
        }).then(({ data: { rows } }) => {
            dispatch(thunkListConstantes(patient))
            dispatch(thunkSetCurrentConstante(patient))
        })
    }
}

export default constantesReducer