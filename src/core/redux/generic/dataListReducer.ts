import update from 'immutability-helper'
import {IPaginateState} from './paginateReducer'
import {createReducer} from './utilsReducer'

export interface IDataListState<T> {
  isFetching: boolean;
  entity?: T;
  error?: string
}

export type IDataListReducer<T> = (s: IDataListState<T>, state: any) => IDataListState<T>

const defaultState: IDataListState<any> = {
  isFetching: false,
  entity: undefined,
  error: undefined,
}

export default <T>(
  requestType: string,
  successType: string,
  failureType: string
) => createReducer<IDataListState<T>>(defaultState, {
  [requestType]: request,
  [successType]: success,
  [failureType]: failure,
})
// export default (
//   requestType: string,
//   successType: string,
//   failureType: string
// ) => <T>(state: IDataListState<T> = defaultState, action: any): IDataListState<T> => {
//   switch (action.type) {
//     case requestType:
//       return update(state, {
//         entity: {$set: undefined},
//         isFetching: {$set: true},
//       })
//     case successType:
//       return update(state, {
//         isFetching: {$set: false},
//         entity: {$set: action.data},
//       })
//     case failureType:
//       return update(state, {
//         isFetching: {$set: false},
//         error: {$set: action.error},
//       })
//     default:
//       return state
//   }
// }

const request = <T>(state: IPaginateState<T>, action) => update(state, {
  entity: {$set: undefined},
  isFetching: {$set: true},
})

const success = <T>(state: IPaginateState<T>, action) => update(state, {
  isFetching: {$set: false},
  entity: {$set: action.data},
})

const failure = <T>(state: IPaginateState<T>, action) => update(state, {
  isFetching: {$set: false},
  error: {$set: action.error},
})
