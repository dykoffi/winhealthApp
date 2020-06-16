import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import assuranceReducer from './assurances'
import bordereauReducer from './bordereaux'

const rootReducers = combineReducers({ pageReducer, assuranceReducer, bordereauReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 