import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import assuranceReducer from './assurances'



const rootReducers = combineReducers({ pageReducer, assuranceReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 