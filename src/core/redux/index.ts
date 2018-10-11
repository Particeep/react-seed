import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import consumersReducer from './consumersReducer'
import {StateType} from 'typesafe-actions'
import consumerReducer from './consumerReducer'
import paginateReducer from './generic/paginateReducer'
import {IUser} from '../../type/user'
import {IFundraise} from '../../type/enterprise/fundraise'

const rootReducer = combineReducers({
  consumers: consumersReducer,
  consumer: consumerReducer,
  paginate: combineReducers({
    users: paginateReducer<IUser>('users'),
    fundraises: paginateReducer<IFundraise>('fundraises'),
  })
})

export type RootState = StateType<typeof rootReducer>;

export const index = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk, api),
    // Redux DevToops Chrome plugins
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)
