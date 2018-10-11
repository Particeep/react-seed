import {CALL_API} from '../middleware/api'
import {route} from '../../conf/routes'
import {RootState} from '../redux'
import {ConsumerKey} from '../../type/consumer'

export const CONSUMERS_REQUEST = 'CONSUMERS_REQUEST'
export const CONSUMERS_SUCCESS = 'CONSUMERS_SUCCESS'
export const CONSUMERS_FAILURE = 'CONSUMERS_FAILURE'

const fetchConsumers = () => ({
  [CALL_API]: {
    types: [CONSUMERS_REQUEST, CONSUMERS_SUCCESS, CONSUMERS_FAILURE],
    route: route.consumer.getAll()
  }
})

export const loadConsumers = () => (dispatch, getState: () => RootState) => {
  if (getState().consumers.isFetching || getState().consumers.entity) {
    return undefined
  }
  return dispatch(fetchConsumers())
}

export const CONSUMER_REQUEST = 'CONSUMER_REQUEST'
export const CONSUMER_SUCCESS = 'CONSUMER_SUCCESS'
export const CONSUMER_FAILURE = 'CONSUMER_FAILURE'

const fetchConsumer = (key: ConsumerKey) => ({
  [CALL_API]: {
    types: [CONSUMER_REQUEST, CONSUMER_SUCCESS, CONSUMER_FAILURE],
    route: route.consumer.get(key)
  }
})

export const loadConsumer = (key?: ConsumerKey) => (dispatch, getState: () => RootState) => {
  const consumer = getState().consumers.entity
  if (consumer) {
    return undefined
  }
  return dispatch(fetchConsumer(key!))
}
