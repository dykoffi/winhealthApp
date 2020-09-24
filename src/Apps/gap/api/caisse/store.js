import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import factureReducer from './factures'
import compteReducer from './comptes'


const rootReducers = combineReducers({ pageReducer,factureReducer, compteReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 