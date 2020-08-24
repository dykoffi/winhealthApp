import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"
import { Info } from "../../../global/context"

const initState = {
    listSejour: [],
    currentSejour: null,
    currentFacture: null,
    detailsSejour: null,
    loadingSejour: false
}
const SET_LIST_SEJOUR = "SET_LIST_SEJOUR"
const SET_CURRENT_SEJOUR = "SET_CURRENT_SEJOUR"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"
const SET_DETAILS_SEJOUR = "SET_DETAILS_SEJOUR"
const SET_LOADING_SEJOUR = "SET_LOADING_SEJOUR"
const setListSejour = (data) => ({ type: SET_LIST_SEJOUR, listSejour: data })
const setCurrentSejour = (sejour) => ({ type: SET_CURRENT_SEJOUR, currentSejour: sejour })
const setCurrentFacture = (facture) => ({ type: SET_CURRENT_FACTURE, currentFacture: facture })
const setLoadingSejour = () => ({ type: SET_LOADING_SEJOUR })
const sejourReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_SEJOUR: return { ...state, listSejour: action.listSejour }
        case SET_DETAILS_SEJOUR: return { ...state, detailsSejour: action.detailsSejour }
        case SET_LOADING_SEJOUR: return { ...state, loadingSejour: action.loadingSejour }
        case SET_CURRENT_SEJOUR: return { ...state, currentSejour: action.currentSejour }
        case SET_CURRENT_FACTURE: return { ...state, currentFacture: action.currentFacture }
        default: return state
    }
}

export function thunkListSejour(patient) {
    return async (dispatch) => {
        dispatch(setLoadingSejour())
        Axios({ url: `${header.url}/gap/list/sejours/${patient}`, })
            .then(({ data: { rows } }) => {
                dispatch(setListSejour(rows))
                rows[0] ? dispatch(thunkDetailsSejour(rows[0].numerosejour)) : setCurrentSejour(null)
            })
    }
}

export function thunkAddSejour(data, patient) {
    return async (dispatch) => {
        const user = Info.user
        dispatch(setLoadingSejour())
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/sejour/${patient}`,
            data: { ...data, user: user },
            headers: { "content-type": "application/x-www-form-urlencoded", },
        })
            .then(() => {
                socket.emit("facture_nouvelle")
                dispatch(thunkListSejour(patient))
            })
    }
}

export function thunkAddControle(numeroSejour, data, patient) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/controle/${numeroSejour}`,
            data: { ...data },
            headers: { "content-type": "application/x-www-form-urlencoded", },
        })
            .then(() => {
                socket.emit("facture_nouvelle")
                dispatch(thunkListSejour(patient))
            })
    }
}

export function thunkDetailsSejour(numeroSejour) {
    return async (dispatch) => {
        dispatch(setLoadingSejour())
        Axios({
            url: `${header.url}/gap/details/sejour/${numeroSejour}`,
        })
            .then(({ data: { rows } }) => {
                if (rows[0]) {
                    dispatch(setCurrentSejour(rows[0]))
                    dispatch(setCurrentFacture(rows))
                } else {
                    dispatch(setCurrentSejour(null))
                    dispatch(setCurrentFacture(null))
                }
            })
    }
}
export default sejourReducer