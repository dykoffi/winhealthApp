import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import PatientReducer from './patients'
import sejourReducer from './sejour'

const rootReducers = combineReducers({ pageReducer, PatientReducer, sejourReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 