import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import modalReducer from './modal'
import listReducer from './list'
import detailsReducer from './details'
import appReducer from './apps'

const rootReducers = combineReducers({ modalReducer, listReducer, detailsReducer, appReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 