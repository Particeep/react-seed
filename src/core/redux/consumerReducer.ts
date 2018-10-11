import {IConsumer} from '../../type/consumer'
import dataListReducer, {IDataListReducer} from './generic/dataListReducer'
import {CONSUMER_FAILURE, CONSUMER_REQUEST, CONSUMER_SUCCESS} from '../action/consumerAction'

const consumerReducer: IDataListReducer<IConsumer> = dataListReducer(
  CONSUMER_REQUEST,
  CONSUMER_SUCCESS,
  CONSUMER_FAILURE,
)
export default consumerReducer
