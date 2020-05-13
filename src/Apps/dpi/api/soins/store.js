import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import patientsReducer from './patients'
import constantesReducer from './constantes'


const rootReducers = combineReducers({ pageReducer, patientsReducer, constantesReducer})

export default createStore(rootReducers, applyMiddleware(thunk)) 