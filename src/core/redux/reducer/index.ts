import {applyMiddleware, combineReducers, compose, createStore, Store} from 'redux'
import thunk from 'redux-thunk'
import api from '../../middleware/api'
import {StateType} from 'typesafe-actions'
import paginateReducer from './generic/paginateReducer'
import {IUser} from '../../../type/user'
import {IFundraise} from '../../../type/enterprise/fundraise'
import {IContextLoanequity} from '../../../type/context-loanequity'
import {crudReducer} from './generic/crudReducer'
import {crudListReducer} from './generic/crudListReducer'
import {IConsumer} from '../../../type/consumer'
import {themeReducer} from './themeReducer'
import {LocalStorageEntity} from '../../localStorage'
import {CONSUMER, CONSUMERS} from '../action/consumerAction'
import {LOANEQUITY} from '../action/contextLoanequityAction'
import {USERS} from '../action/userAction'
import {FUNDRAISES} from '../action/fundraiseAction'
import {i18nReducer} from './i18nReducer'
import {CONNECTEDUSER} from '../action/connectedUser'
import {getAppParams} from '../../../conf/params'

const storage = new LocalStorageEntity('particeep-setup-state')

const persistedState = storage.load() || {}

const rootReducer = combineReducers({
  consumers: crudListReducer<IConsumer>(CONSUMERS),
  consumer: crudReducer<IConsumer>(CONSUMER),
  connectedUser: crudReducer<IUser>(CONNECTEDUSER, getAppParams().connectedUser),
  contextLoanEquity: crudReducer<IContextLoanequity>(LOANEQUITY),
  paginate: combineReducers({
    users: paginateReducer<IUser>(USERS),
    fundraises: paginateReducer<IFundraise>(FUNDRAISES),
  }),
  ui: combineReducers({
    theme: themeReducer,
    i18n: i18nReducer,
  })
})

export type RootState = StateType<typeof rootReducer>;

export const store: Store<RootState> = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk, api),
    // Redux DevToops Chrome plugins
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.subscribe(() => {
  storage.save({
    ui: {
      theme: store.getState().ui.theme,
      i18n: store.getState().ui.i18n,
    }
  })
})

