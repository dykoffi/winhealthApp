import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import encaissementReducer from './encaissements'


const rootReducers = combineReducers({ pageReducer, encaissementReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 