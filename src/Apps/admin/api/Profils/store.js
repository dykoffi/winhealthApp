import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import modalReducer from './modal'
import listReducer from './list'
import detailsReducer from './details'
const rootReducers = combineReducers({ modalReducer, listReducer, detailsReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 