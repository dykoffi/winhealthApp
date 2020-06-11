import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = { listFactures: [], currentFacture: {}, showModal: false }

//les actions 
const SET_LIST_FACTURES = "SET_LIST_FACTURES"
const SET_CURRENT_FACTURE = "SET_CURRENT_FACTURE"
const SET_SHOW_MODAL = "SET_SHOW_MODAL"

const setCurrentFacture = (data) => ({ type: SET_CURRENT_FACTURE, currentFacture: data })
const setListFactures = (data) => ({ type: SET_LIST_FACTURES, listFacturesAttentes: data })
export const setShowModal = (bool) => ({ type: SET_SHOW_MODAL, showModal: bool })

//le reducer
const borderauReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_FACTURES: return { ...state, listFactures: action.listFactures };
        case SET_CURRENT_FACTURE: return { ...state, currentFacture: action.currentFacture };
        case SET_SHOW_MODAL: return { ...state, showModal: action.showModal };
        default: return state;
    }
}

export function thunkListFactures() {
    return async (dispatch) => { Axios({ url: `${header.url}/gap/list/factures` }).then(({ data: { rows } }) => { dispatch(setListFactures(rows)) }) }
}
export default borderauReducer