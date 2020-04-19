import Axios from "axios"
import { header } from "../../constants/apiQuery"
const initState = {
    currentProfil: null,
    loadingProfil: false
}

//les foctions
const CURRENT_PROFIL_SUCCESS = 'CURRENT_PROFIL_SUCCESS'
const LOADING_PROFIL = 'LOADING_PROFIL'

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
//le reducer
const reducerDetailsProfil = (state = initState, action) => {
    switch (action.type) {
        case CURRENT_PROFIL_SUCCESS:
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
            method: "GET",
            params: {
                user: ["edy", "koffi"]
            }
        })
            .then((response) => response.data.rows)
            .then((data) => {
                dispatch(currentProfil(data))
            });
    }
}


export default reducerDetailsProfil