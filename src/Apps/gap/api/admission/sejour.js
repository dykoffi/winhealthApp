import Axios from "axios"
import { header } from "../../constants/apiQuery"

const initState = {
    listSejour: [],
    currentSejour: null,
    detailsSejour: null,
    loadingSejour: false
}


const SET_LIST_SEJOUR = "SET_LIST_SEJOUR"
const SET_CURRENT_SEJOUR = "SET_CURRENT_SEJOUR"
const SET_DETAILS_SEJOUR = "SET_DETAILS_SEJOUR"
const SET_LOADING_SEJOUR = "SET_LOADING_SEJOUR"

const setListSejour = (data) => (
    {
        type: SET_LIST_SEJOUR,
        loadingSejour: false,
        listSejour: data
    }
)


const setCurrentSejour = (sejour) => (
    {
        type: SET_CURRENT_SEJOUR,
        currentSejour: sejour,
        loadingSejour: false
    }
)

const setDetailsSejour = (sejour) => (
    {
        type: SET_DETAILS_SEJOUR,
        detailsSejour: sejour,
        loadingSejour: false
    }
)

const setLoadingSejour = () => ({
    type: SET_LOADING_SEJOUR,
    loadingSejour: true
})

const sejourReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LIST_SEJOUR:
            return {
                ...state,
                listSejour: action.listSejour,
                loadingSejour: action.loadingSejour
            }
        case SET_DETAILS_SEJOUR:
            return {
                ...state,
                detailsSejour: action.detailsSejour,
                loadingSejour: action.loadingSejour
            }
        case SET_LOADING_SEJOUR:
            return {
                ...state,
                loadingSejour: action.loadingSejour
            }
        case SET_CURRENT_SEJOUR:
            return {
                ...state,
                currentSejour: action.currentSejour,
                loadingSejour: action.loadingSejour
            }

        default:
            return state
    }
}

export function thunkListSejour(patient) {
    return async (dispatch) => {
        dispatch(setLoadingSejour())
        Axios({
            url: `${header.url}/gap/list/sejours/${patient}`
        })
            .then(({ data: { rows } }) => {
                dispatch(setListSejour(rows))
            })
    }
}

export function thunkAddSejour(data,patient) {
    return async (dispatch) => {
        dispatch(setLoadingSejour())
        Axios({
            method: "POST",
            url: `${header.url}/gap/add/sejour/${patient}`,
            data: data,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            }
        })
            .then(() => {
                Axios({
                    url: `${header.url}/gap/list/sejours/${patient}`
                })
                    .then(({ data: { rows } }) => {
                        dispatch(setListSejour(rows))
                    })
            })

    }
}

export function thunkDetailsSejour(idSejour) {
    return async (dispatch) => {
        dispatch(setLoadingSejour())
        Axios({
            url: `${header.url}/gap/details/sejour/${idSejour}`
        })
            .then(({ data: { rows } }) => {
                setDetailsSejour(rows[0])
            })
    }
}

export default sejourReducer