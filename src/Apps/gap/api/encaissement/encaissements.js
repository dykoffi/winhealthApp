import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = {
    listEncaissement: [],
}


//actions 
const SET_LIST_ENCAISSEMENT = "SET_LIST_ENCAISSEMENT"

//ACTIONS CREATOR
const setListEncaissement = (data) => ({
    type: SET_LIST_ENCAISSEMENT,
    listEncaissement: data
})

//REDUCER
const encaissementsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_ENCAISSEMENT: return { ...state, listEncaissement: action.listEncaissement };
        default: return state;
    }
}

// LES THUNKS

export function thunkListEncaissement() {
    return async (dispatch) => {
        Axios({ url: `${header.url}/gap/list/encaissements` }).then(({ data: { rows } }) => {
            dispatch(setListEncaissement(rows))
        })
    }
}

export function thunkAddEncaissement(data) {
    return async (dispatch) => {
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/transaction`,
            data: { ...data },
            headers: { "content-type": "application/x-www-form-urlencoded", }
        }).then(({ data: { rows } }) => {
            dispatch(thunkListEncaissement())
        })
    }
}

export default encaissementsReducer