

const initState = {
    currentPage: null,
}

//actions
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

//les actions creators
export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    currentPage: page
})

const pageReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        default:
            return state
    }
}

export default pageReducer