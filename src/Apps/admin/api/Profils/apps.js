import Axios from "axios"
import { header } from "../../constants/apiQuery"

const initState = {
    listApps: [],
    appActive: null
}


//les fonctions
const LIST_APPS = "LIST_APPS"
const APP_ACTIVE = "APP_ACTIVE"

//les actoins creator
const listApps = (list) => ({
    type: LIST_APPS,
    listApps: list
})

export const activeApp = (app) => ({
    type: APP_ACTIVE,
    appActive: app
})

//le reducer
const reducerApp = (state = initState, action) => {
    switch (action.type) {
        case LIST_APPS:
            const { codeapp } = action.listApps[0]
            return {
                ...state,
                // appActive: state.appActive === null && codeapp,
                listApps: action.listApps
            }
        case APP_ACTIVE:
            return {
                ...state,
                appActive: action.appActive
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
