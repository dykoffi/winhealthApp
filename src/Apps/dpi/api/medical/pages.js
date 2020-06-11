import Onglets from '../../pages/soins/_onglets'

const initState = {
    currentPage: Onglets[0].target || null,
    notification: false
}

//actions
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_NOTIFICATION = "SET_NOTIFICATION"

//les actions creators
export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    currentPage: page
})

export const setNotification = (value) => ({
    type: SET_NOTIFICATION,
    notification: value
})

const pageReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_NOTIFICATION:
            return {
                ...state,
                notification: action.notification
            }

        default:
            return state
    }
}

export default pageReducer