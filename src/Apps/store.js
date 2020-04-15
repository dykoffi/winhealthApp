import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Logreducer from './connexion/functions/logUser'
const rootReducers = combineReducers({ Logreducer })

export default createStore(rootReducers,applyMiddleware(thunk))