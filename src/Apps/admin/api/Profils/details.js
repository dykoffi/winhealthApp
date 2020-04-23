import Axios from "axios"
import { Cookies } from 'react-cookie'
import { header } from "../../constants/apiQuery"
import { thunkListProfil } from './list'
import store from './store'

const initState = {
    currentProfil: null,
    loadingProfil: false,
    modal: false
}
const cookies = new Cookies()

//les foctions
const CURRENT_PROFIL_SUCCESS = 'CURRENT_PROFIL_SUCCESS'
const LOADING_PROFIL = 'LOADING_PROFIL'
const DELETE_PROFIL = 'DELETE_PROFIL'
const MODAL_DELETE = 'MODAL_DELETE'

//les actions creators
const currentProfil = (profil) => ({
    type: CURRENT_PROFIL_SUCCESS,
    currentProfil: [...profil],
    loadingProfil: false
})

const loadingProfil = () => ({
    type: LOADING_PROFIL,
    loadingProfil: true
})

export const setModal = (bool) => ({
    type: MODAL_DELETE,
    modal: bool
})

const deleteProfil = (currentProfil) => ({
    type: DELETE_PROFIL,
    currentProfil: currentProfil,
    loadingProfil: false
})
//le reducer
const reducerDetailsProfil = (state = initState, action) => {
    switch (action.type) {
        case CURRENT_PROFIL_SUCCESS:
            return {
                ...state,
                currentProfil: action.currentProfil,
                loadingProfil: action.loadingProfil

            }
        case DELETE_PROFIL:
            return {
                ...state,
                currentProfil: action.currentProfil,
                loadingProfil: action.loadingProfil
            }
        case LOADING_PROFIL:
            return {
                ...state,
                loadingProfil: action.loadingProfil
            }
        case MODAL_DELETE:
            return {
                ...state,
                modal: action.modal
            }
        default:
            return state
    }
}


export function thunkDetailsProfil(idProfil) {
    return async (dispatch) => {
        dispatch(loadingProfil())
        Axios({
            url: `/admin/details/profil/${idProfil}`,
            baseURL: header.url,
            method: "GET"
        })
            .then((response) => response.data.rows)
            .then((data) => {
                dispatch(currentProfil(data))
            });
    }
}

export function thunkDeleteProfil(idProfil) {
    const { mailuser, codeapp } = cookies.get("user", { paht: "/" });
    return async (dispatch) => {
        dispatch(loadingProfil())
        Axios({
            url: `/admin/delete/${codeapp}/profil/${idProfil}`,
            baseURL: header.url,
            method: "GET",
            params: { userMail: mailuser, app: codeapp },
        })
            .then(() => {
                dispatch(deleteProfil(null))
                store.dispatch(thunkListProfil(store.getState().appReducer.appActive))
                dispatch(setModal(false))
            });
    }
}

export default reducerDetailsProfil