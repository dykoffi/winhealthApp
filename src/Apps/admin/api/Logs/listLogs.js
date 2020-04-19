import Axios from "axios"
import { header } from "../../constants/apiQuery"

const initialeState = {
    listLogs: [],
    typeLogs: null,
    loading: false
}

//les fonctions 
const SET_LIST_LOGS = "SET_LIST_LOGS"
const SET_TYPE_LOGS = "SET_TYPE_LOGS"
const LOADING = "LOADING"

//les actioins creators
const setListLogs = (data) => ({
    type: SET_LIST_LOGS,
    listLogs: data,
    loading: false
})

export const setTypeLogs = (type) => ({
    type: SET_TYPE_LOGS,
    typeLog: type
})

const setLoading = () => ({
    type: LOADING,
    loading: true
})

//le reducer
const listLogsReducer = (state = initialeState, action) => {
    switch (action.type) {
        case SET_LIST_LOGS:
            return {
                ...state,
                listLogs: action.listLogs,
                loading: action.loading
            }

        case SET_TYPE_LOGS:
            return {
                ...state,
                typeLogs: action.typeLog
            }
        case LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
}

export function thunkSetListList(app, typeLog) {
    return async (dispatch) => {
        dispatch(setLoading())
        Axios({
            url: `/admin/list/${app}/logs/${typeLog}`,
            baseURL: header.url,
            method: "GET"
        })
            .then((response) => response.data.rows)
            .then((data) => {
                dispatch(setListLogs(data))
            });
    }
}

export default listLogsReducer