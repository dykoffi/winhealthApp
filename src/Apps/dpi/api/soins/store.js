import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import patientsReducer from './patients'


const rootReducers = combineReducers({ pageReducer, patientsReducer})

export default createStore(rootReducers, applyMiddleware(thunk)) 