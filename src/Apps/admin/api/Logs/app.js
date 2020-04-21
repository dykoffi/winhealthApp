import Axios from "axios"
import { header } from "../../constants/apiQuery"

const initialeState = {
    listApps: [],
    currentApp: null,
}

//les fonctions
const SET_LIST_APPS = "SET_LIST_APPS"
const SET_APP_ACTIVE = "SET_APP_ACTIVE"


//les actions creators
const setListApps = (data) => ({
    type: SET_LIST_APPS,
    listApps: data,
})

export const setActiveApp = (app) => ({
    type: SET_APP_ACTIVE,
    currentApp: app
})

const reducerApp = (state = initialeState, action) => {
    switch (action.type) {
        case SET_LIST_APPS:
            return {
                ...state,
                listApps: action.listApps,
            }
        case SET_APP_ACTIVE:
            return {
                ...state,
                currentApp: action.currentApp
            }
        default:
            return state;
    }
}

export function thunkSetListApps() {
    return async (dispatch) => {
        Axios({
            url: `/admin/list/apps/`,
            baseURL: header.url,
            method: "GET"
        })
            .then((response) => response.data.rows)
            .then((data) => {
                dispatch(setListApps(data))
            });
    }
}

export default reducerApp