import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import assuranceReducer from './assurances'
import borderauReducer from './borderaux'

const rootReducers = combineReducers({ pageReducer, assuranceReducer, borderauReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 