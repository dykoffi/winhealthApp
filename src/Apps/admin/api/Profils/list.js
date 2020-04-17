import Axios from "axios"
import { Cookies } from 'react-cookie'
import moment from 'moment'

import { disableModal } from './modal'
import { header } from "../../constants/apiQuery"

const cookies = new Cookies()
const initState = {
    listProfil: [],
    loading: false,
    aucun: false
}

//les foctions
const LIST_PROFIL_LOADING = 'LIST_PROFIL_LOADING'
const LIST_PROFIL_SUCCESS = 'LIST_PROFIL_SUCCESS'
const LIST_PROFIL_VIDE = 'LIST_PROFIL_VIDE'
//const LIST_PROFIL_ERROR = 'LIST_PROFIL_ERROR'

//les actions creators

const listProfil = (list) => ({
    type: LIST_PROFIL_SUCCESS,
    text: 'lister tous les profils',
    loading: false,
    aucun: false,
    list: list
})

const listProfilVide = (list) => ({
    type: LIST_PROFIL_VIDE,
    text: 'lister tous les profils',
    list: list,
    aucun: true,
    loading: false,

})

const listProfilLoading = () => ({
    type: LIST_PROFIL_LOADING,
    text: 'lister tous les profils',
    list: [],
    loading: true,
    aucun: false
})

const reducerList = (state = initState, action) => {
    switch (action.type) {
        case LIST_PROFIL_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                aucun: action.aucun,
                listProfil: action.list
            }
        case LIST_PROFIL_VIDE:
            return {
                ...state,
                listProfil: action.list,
                aucun: action.aucun,
                loading: action.loading
            }
        case LIST_PROFIL_LOADING:
            return {
                ...state,
                aucun: action.aucun,
                loading: action.loading,
                listProfil: action.list
            }
        default:
            return state
    }
}

//les functions thunk
export function thunkListProfil(codeApp) {
    return async (dispatch) => {
        dispatch(listProfilLoading())
        Axios.get(`${header.url}/admin/list/${codeApp}/profils`)
            .then((res) => res.data.rows)
            .then((data) => {
                data.length !== 0 ? dispatch(listProfil(data)) : dispatch(listProfilVide(data))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const thunkSearchListProfil = (app, mot) => {
    return async (dispatch) => {
        dispatch(listProfilLoading())
        if (mot.trim().length === 0) {
            Axios.get(`${header.url}/admin/list/${app}/profils`)
                .then((res) => res.data.rows)
                .then((data) => {
                    data.length !== 0 ? dispatch(listProfil(data)) : dispatch(listProfilVide(data))
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            Axios.get(`${header.url}/admin/search/${app}/profil/${mot}`)
                .then((res) => res.data.rows)
                .then((data) => {
                    data.length !== 0 ? dispatch(listProfil(data)) : dispatch(listProfilVide(data))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}

export const thunkUpdateListProfil = (app, profil, checkedlist) => {
    return async (dispatch) => {
        Axios({
            method: "post",
            url: `${header.url}/admin/add/${app}/profil`,
            data: {
                labelProfil: profil,
                dateProfil: moment().format("LLLL"),
                auteurProfil: cookies.get('user', { path: '/' }).mail,
                droits: checkedlist,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then(() => {
            dispatch(listProfilLoading())
            Axios.get(`${header.url}/admin/list/${app}/profils`)
                .then((res) => res.data.rows)
                .then((data) => {
                    data.length !== 0 ? dispatch(listProfil(data)) : dispatch(listProfilVide(data))
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