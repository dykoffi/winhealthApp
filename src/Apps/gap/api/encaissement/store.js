import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import encaissementReducer from './encaissements'
import ventilationReducer from './ventilations'


const rootReducers = combineReducers({ pageReducer, encaissementReducer, ventilationReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 