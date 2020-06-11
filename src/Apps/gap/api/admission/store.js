import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import listPatientsReducer from './listPatients'
import detailsPatientReducer from './detailsPatient'
import sejourReducer from './sejour'

const rootReducers = combineReducers({ pageReducer, listPatientsReducer,detailsPatientReducer, sejourReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 