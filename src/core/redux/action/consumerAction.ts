import {_CALL_API} from '../../middleware/api'
import {route} from '../../../conf/routes'
import {RootState} from '../reducer/index'
import {ConsumerKey, IConsumer} from '../../../type/consumer'
import {_CRUD, _CRUDLIST} from './_Action'

export const CONSUMERS = 'consumers'
const _CONSUMERS = _CRUDLIST('consumers')

const fetchConsumers = () => ({
  [_CALL_API]: {
    types: [_CONSUMERS.GET.REQUEST, _CONSUMERS.GET.SUCCESS, _CONSUMERS.GET.FAILURE],
    route: route.consumer.getAll()
  }
})

export const loadConsumers = () => (dispatch, getState: () => RootState): Promise<IConsumer[]> => {
  const consumers = getState().consumers.entities
  if (getState().consumers.entities) {
    return new Promise(resolve => resolve(consumers))
  }
  return dispatch(fetchConsumers())
}

export const CONSUMER = 'consumer'
const _CONSUMER = _CRUD(CONSUMER)

const fetchConsumer = (key: ConsumerKey) => ({
  [_CALL_API]: {
    types: [_CONSUMER.GET.REQUEST, _CONSUMER.GET.SUCCESS, _CONSUMER.GET.FAILURE],
    route: route.consumer.get(key)
  }
})

export const loadConsumer = (key?: ConsumerKey) => (dispatch, getState: () => RootState): Promise<IConsumer> => {
  const consumer = getState().consumer.entity
  if (consumer) {
    return new Promise(resolve => resolve(consumer))
  }
  return dispatch(fetchConsumer(key!))
}
