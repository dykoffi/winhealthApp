import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import factureReducer from './factures'


const rootReducers = combineReducers({ pageReducer,factureReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 