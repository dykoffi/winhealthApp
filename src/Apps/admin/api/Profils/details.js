import Axios from "axios"
import { header } from "../../constants/apiQuery"
const initState = {
    currentProfil: null,
}

//les foctions
const CURRENT_PROFIL_SUCCESS = 'CURRENT_PROFIL_SUCCESS'

//les actions creators
const currentProfil = (profil) => ({
    type: CURRENT_PROFIL_SUCCESS,
    text: "afficher les details d'un profil",
    currentProfil: [...profil]
})

const reducerDetailsProfil = (state = initState, action) => {
    switch (action.type) {
        case CURRENT_PROFIL_SUCCESS:
            return {
                ...state,
                currentProfil: action.currentProfil
            }
        default:
            return state
    }
}


export function thunkDetailsProfil(idProfil) {
    return async (dispatch) => {
        Axios({
            url: `${header.url}/admin/details/profil/${idProfil}`,
            method: "GET"
        })
            .then((response) => response.data.rows)
            .then((data) => {
                dispatch(currentProfil(data))
            });
    }
}


export default reducerDetailsProfil