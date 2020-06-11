import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import appReducer from './app'
import listLogsReducer from './listLogs'

const rootReducer = combineReducers({ appReducer, listLogsReducer })

export default createStore(rootReducer, applyMiddleware(thunk))