import Axios from "axios"
import { Cookies } from 'react-cookie'
import moment from 'moment'

import { disableModal } from './modal'
import { header } from "../../constants/apiQuery"

const cookies = new Cookies()
const initState = {
    listUser: [],
    loading: false,
    aucun: false
}

//les foctions
const LIST_USER_LOADING = 'LIST_USER_LOADING'
const LIST_USER_SUCCESS = 'LIST_USER_SUCCESS'
const LIST_USER_VIDE = 'LIST_USER_VIDE'
//const LIST_USER_ERROR = 'LIST_USER_ERROR'

//les actions creators

const listUser = (list) => ({
    type: LIST_USER_SUCCESS,
    text: 'lister tous les users',
    loading: false,
    aucun: false,
    list: list
})

const listUserVide = (list) => ({
    type: LIST_USER_VIDE,
    text: 'lister tous les users',
    list: list,
    aucun: true,
    loading: false,

})

const listUserLoading = () => ({
    type: LIST_USER_LOADING,
    text: 'lister tous les users',
    list: [],
    loading: true,
    aucun: false
})

const reducerList = (state = initState, action) => {
    switch (action.type) {
        case LIST_USER_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                aucun: action.aucun,
                listUser: action.list
            }
        case LIST_USER_VIDE:
            return {
                ...state,
                listUser: action.list,
                aucun: action.aucun,
                loading: action.loading
            }
        case LIST_USER_LOADING:
            return {
                ...state,
                aucun: action.aucun,
                loading: action.loading,
                listUser: action.list
            }
        default:
            return state
    }
}

//les functions thunk
export function thunkListUser(codeApp) {
    return async (dispatch) => {
        dispatch(listUserLoading())
        Axios.get(`${header.url}/admin/list/${codeApp}/users`)
            .then((res) => res.data.rows)
            .then((data) => {
                data.length !== 0 ? dispatch(listUser(data)) : dispatch(listUserVide(data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const thunkSearchListUser = (app, mot) => {
    return async (dispatch) => {
        dispatch(listUserLoading())
        if (mot.trim().length === 0) {
            Axios.get(`${header.url}/admin/list/${app}/users`)
                .then((res) => res.data.rows)
                .then((data) => {
                    data.length !== 0 ? dispatch(listUser(data)) : dispatch(listUserVide(data))
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            Axios.get(`${header.url}/admin/search/${app}/user/${mot}`)
                .then((res) => res.data.rows)
                .then((data) => {
                    data.length !== 0 ? dispatch(listUser(data)) : dispatch(listUserVide(data))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}

export const thunkUpdateListUser = (app, user, checkedlist) => {
    const { mail, codeapp } = cookies.get("user", { paht: "/" });
    return async (dispatch) => {
        Axios({
            method: "post",
            url: `/admin/add/${app}/user`,
            baseURL: header.url,
            params: { userMail: mail, app: codeapp },
            data: {
                labelUser: user,
                dateUser: moment().format("LLLL"),
                auteurUser: cookies.get('user', { path: '/' }).mail,
                droits: checkedlist,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then(() => {
            dispatch(listUserLoading())
            Axios({
                url: `/admin/list/${app}/users`,
                baseURL: header.url,
                method: 'GET'
            })
                .then((res) => res.data.rows)
                .then((data) => {
                    data.length !== 0 ? dispatch(listUser(data)) : dispatch(listUserVide(data))
                }).then(() => {
                    dispatch(disableModal())
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }
}

export default reducerList