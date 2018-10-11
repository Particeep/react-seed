import {IConsumer} from '../../type/consumer'
import dataListReducer, {IDataListReducer} from './generic/dataListReducer'
import {CONSUMERS_FAILURE, CONSUMERS_REQUEST, CONSUMERS_SUCCESS} from '../action/consumerAction'

const consumersReducer: IDataListReducer<IConsumer[]> = dataListReducer(
  CONSUMERS_REQUEST,
  CONSUMERS_SUCCESS,
  CONSUMERS_FAILURE,
)
export default consumersReducer
