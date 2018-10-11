import update from 'immutability-helper'
import {IPagination} from '../../../type/paginated'
import {Criteria} from '../../../type/criteria/criteria'
import {PAGINATE} from '../../action/paginateAction'
import {createReducer} from './utilsReducer'
import {range} from '../../utils'

export interface IPaginateState<T> {
  route?: Promise<IPagination<T>>;
  isFetching: boolean;
  entities?: T[];
  criteria: Criteria;
  total_size?: number;
  error?: string
}

const defaultState: IPaginateState<any> = {
  route: undefined,
  isFetching: false,
  entities: undefined,
  total_size: undefined,
  criteria: {limit: 10, offset: 0, order_by: 'asc'},
  error: undefined,
}

export default <T>(name: string) => createReducer<IPaginateState<T>>(defaultState, {
  [PAGINATE(name).REQUEST]: request,
  [PAGINATE(name).SUCCESS]: success,
  [PAGINATE(name).FAILURE]: failure,
  [PAGINATE(name).NEXT_PAGE]: nextPage,
  [PAGINATE(name).PREV_PAGE]: prevPage,
  [PAGINATE(name).GO_TO_PAGE]: goToPage,
  [PAGINATE(name).UPDATE_CRITERIA]: updateCriteria,
  [PAGINATE(name).SORT]: sort,
})

const request = <T>(state: IPaginateState<T>, action) => update(state, {
  isFetching: {$set: true},
})

const success = <T>(state: IPaginateState<T>, action) => update(state, {
  isFetching: {$set: false},
  entities: {$set: action.data.data},
  total_size: {$set: action.data.total_size},
})

const failure = <T>(state: IPaginateState<T>, action) => update(state, {
  isFetching: {$set: false},
  error: {$set: action.error},
})

const nextPage = <T>(state: IPaginateState<T>, action) => update(state, {
  criteria: {
    offset: {$set: Math.min(state.criteria.offset + state.criteria.limit, state.total_size || 0)}
  },
})

const prevPage = <T>(state: IPaginateState<T>, action) => update(state, {
  criteria: {
    offset: {$set: Math.max(state.criteria.offset - state.criteria.limit, 0)}
  },
})

const goToPage = <T>(state: IPaginateState<T>, action) => {
  const offset = action.pageNumber * state.criteria.limit
  return update(state, {
    criteria: {
      offset: {$set: range(0, state.total_size || 0)(offset)}
    },
  })
}

const updateCriteria = <T>(state: IPaginateState<T>, action) => update(state, {
  criteria: {
    [action.name]: {$set: action.value}
  },
})
const sort = <T>(state: IPaginateState<T>, action) => update(state, {
  criteria: {
    sort_by: {$set: action.sortBy},
    order_by: {$set: action.orderBy}
  },
})
