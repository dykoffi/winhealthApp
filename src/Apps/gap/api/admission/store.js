import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './pages'

const rootReducers = combineReducers({ pageReducer })

export default createStore(rootReducers, applyMiddleware(thunk)) 