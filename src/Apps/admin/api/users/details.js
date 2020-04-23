import Axios from "axios"
import { Cookies } from 'react-cookie'
import { header } from "../../constants/apiQuery"
import { thunkListUser } from './list'
import store from './store'

const initState = {
    currentUser: null,
    loadingUser: false,
    modal: false
}
const cookies = new Cookies()

//les foctions
const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS'
const LOADING_USER = 'LOADING_USER'
const DELETE_USER = 'DELETE_USER'
const MODAL_DELETE = 'MODAL_DELETE'

//les actions creators
const currentUser = (profil) => ({
    type: CURRENT_USER_SUCCESS,
    currentUser: [...profil],
    loadingUser: false
})

const loadingUser = () => ({
    type: LOADING_USER,
    loadingUser: true
})

export const setModal = (bool) => ({
    type: MODAL_DELETE,
    modal: bool
})

const deleteUser = (currentUser) => ({
    type: DELETE_USER,
    currentUser: currentUser,
    loadingUser: false
})
//le reducer
const reducerDetailsUser = (state = initState, action) => {
    switch (action.type) {
        case CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.currentUser,
                loadingUser: action.loadingUser

            }
        case DELETE_USER:
            return {
                ...state,
                currentUser: action.currentUser,
                loadingUser: action.loadingUser
            }
        case LOADING_USER:
            return {
                ...state,
                loadingUser: action.loadingUser
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


export function thunkDetailsUser(idUser) {
    return async (dispatch) => {
        dispatch(loadingUser())
        Axios({
            url: `/admin/details/user/${idUser}`,
            baseURL: header.url,
            method: "GET"
        })
            .then((response) => response.data.rows)
            .then((data) => {
                dispatch(currentUser(data))
            });
    }
}

export function thunkDeleteUser(idUser) {
    const { mail, codeapp } = cookies.get("user", { paht: "/" });
    return async (dispatch) => {
        dispatch(loadingUser())
        Axios({
            url: `/admin/delete/${codeapp}/user/${idUser}`,
            baseURL: header.url,
            method: "GET",
            params: { userMail: mail, app: codeapp },
        })
            .then(() => {
                dispatch(deleteUser(null))
                store.dispatch(thunkListUser(store.getState().appReducer.appActive))
                dispatch(setModal(false))
            });
    }
}

export default reducerDetailsUser