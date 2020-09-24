import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'
import logsReducer from './logs'

const rootReducers = combineReducers({ pageReducer, logsReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 