
//le state initiale
const initState = {
    visible: false
}
//les fonctions
const ENABLE_MODAL = 'ENABLE_MODAL'
const DISABLE_MODAL = 'DISABLE_MODAL'

//les actions creators
export const enableModal = () => ({
    type: ENABLE_MODAL,
    text: "Voir le modal",
    visible: true
})

export const disableModal = () => ({
    type: DISABLE_MODAL,
    text: "Voir le modal",
    visible: false
})

//moon reducer

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case ENABLE_MODAL:
            return {
                ...state,
                visible: action.visible
            }
        case DISABLE_MODAL:
            return {
                ...state,
                visible: action.visible
            }

        default:
            return state
    }
}

export default modalReducer