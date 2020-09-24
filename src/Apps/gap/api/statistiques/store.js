import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import bordereauReducer from './bordereaux'

const rootReducers = combineReducers({ pageReducer, bordereauReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 