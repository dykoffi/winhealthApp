
import Axios from "axios"
import { header, socket } from "../../../global/apiQuery"

const initState = {
    listLogs: [],
    loading: false,
}

//les actions 
const SET_LIST_LOGS = "SET_LIST_LOGS"

const SET_LOADING = "SET_LOADING"

const setListLogs = (data) => ({ type: SET_LIST_LOGS, listLogs: data })
export const setLoading = (bool) => ({ type: SET_LOADING, loading: bool })

//le reducer
const borderauReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_LOGS: return { ...state, listLogs: action.listLogs };
        case SET_LOADING: return { ...state, loading: action.loading };
        default: return state;
    }
}

export function thunkListLogs() {
    return async (dispatch) => {
        dispatch(setLoading(true))
        Axios({ url: `${header.url}/gap/list/bordereaux` })
            .then(({ data: { rows } }) => { dispatch(setListLogs(rows)) })
    }
}

export default borderauReducer