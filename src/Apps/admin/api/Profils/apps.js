import Axios from "axios"
import { header } from "../../constants/apiQuery"

const initState = {
    listApps: [],
    appActive: null,
    nomApp : null
}


//les fonctions
const LIST_APPS = "LIST_APPS"
const APP_ACTIVE = "APP_ACTIVE"

//les actoins creator
const listApps = (list) => ({
    type: LIST_APPS,
    listApps: list
})

export const activeApp = (codeApp, nomApp) => ({
    type: APP_ACTIVE,
    appActive: codeApp,
    nomApp : nomApp
})

//le reducer
const reducerApp = (state = initState, action) => {
    switch (action.type) {
        case LIST_APPS:
            return {
                ...state,
                listApps: action.listApps
            }
        case APP_ACTIVE:
            return {
                ...state,
                appActive: action.appActive,
                nomApp : action.nomApp
            }
        default:
            return state;
    }
}

export function thunklistApps() {
    console.log('list app')
    return async (dispatch) => {
        Axios({
            url: `/admin/list/apps/`,
            baseURL: header.url,
            method: "GET"
        })
            .then((response) => response.data.rows)
            .then((data) => {
                console.log(data);

                dispatch(listApps(data))
            });
    }
}

export default reducerApp
