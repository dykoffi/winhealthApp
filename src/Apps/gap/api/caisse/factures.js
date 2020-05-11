import Axios from "axios"

const initState = {
    listFactures: [],
    listFacturesAttentes: [],
    currentFacture: null,

}

//les actions 
const SET_LIST_FACTURES = "SET_LIST_FACTURES"
const SET_LIST_FACTURES_ATTENTES = "SET_LIST_FACTURES_ATTENTES"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"

const setListFacture = (data) => ({
    type: SET_LIST_FACTURES,
    listFactures: data
})

const setListFacturesAttentes = (data) => ({
    type: SET_LIST_FACTURES_ATTENTES,
    listFacturesAttentes: data
})

const setCurrentFacture = () => ({
    type: SET_CURRENT_FACTURE,
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
        return async (dispatch) => {
            Axios({
                url: `http://localhost:8000/gap/list/factures`
            }).then(({ data: { rows } }) => {
                dispatch(setListFacturesAttentes(rows))
            })
        }
    }
}

export function thunkEncaisserFactures(idsejour) {
    return async (dispatch) => {
        Axios({
            url: `http://localhost:8000/gap/encaisser/facture/${idsejour}`
        }).then(({ data: { rows } }) => {
            dispatch(thunkListFacturesAttentes())
        })
    }
}

export function thunkAnnulerFactures(idsejour) {
    return async (dispatch) => {
        Axios({
            url: `http://localhost:8000/gap/annuler/facture/${idsejour}`
        }).then(({ data: { rows } }) => {
            dispatch(thunkListFacturesAttentes())
        })
    }
}

export function thunkListFacturesAttentes() {
    return async (dispatch) => {
        Axios({
            url: `http://localhost:8000/gap/list/factures_attentes`
        }).then(({ data: { rows } }) => {
            dispatch(setListFacturesAttentes(rows))
        })
    }
}

export default factureReducer