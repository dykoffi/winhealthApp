import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = {
    listFactures: [],
    listFacturesAttentes: [],
    currentFacture: null,

}

//les actions 
const SET_LIST_FACTURES = "SET_LIST_FACTURES"
const SET_LIST_FACTURES_ATTENTES = "SET_LIST_FACTURES_ATTENTES"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"

// const setListFacture = (data) => ({
//     type: SET_LIST_FACTURES,
//     listFactures: data
// })
const setCurrentFacture = () => ({
    type: SET_CURRENT_FACTURE,
})

const setListFacturesAttentes = (data) => ({
    type: SET_LIST_FACTURES_ATTENTES,
    listFacturesAttentes: data
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

export function thunkDetailsFacture(idfacture) {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/gap/details/facture/${idfacture}`
        }).then(({ data: { rows } }) => {
            dispatch(setCurrentFacture(rows[0]))
        })
    }
}

export function thunkEncaisserFactures(idsejour, patient) {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/gap/encaisser/facture/${idsejour}`
        }).then(({ data: { rows } }) => {
            socket.emit("facture_encaisser", { sejour: idsejour, patient: patient })
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

export function thunkSearchFacture(idFacture) {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/gap/search/facture/${idFacture}`
        }).then(({ data: { rows } }) => {
           rows ? dispatch(setListFacturesAttentes(rows)) : dispatch(setListFacturesAttentes([])) 
        })
    }
}

export default factureReducer