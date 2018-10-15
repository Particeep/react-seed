import {createReducer} from '../utils/createReducer'
import {_CRUDLIST} from '../../action/_Action'
import {Id} from '../../../../type/basics'
import {IEntity} from '../../../../type/entity'

export type ICrudListReducer<T extends IEntity> = (s: ICrudListState<T>, action: any) => ICrudListState<T>

interface ICrudListState<T> {
  entities?: T[]
  error?: string
  isFetching: boolean
  isCreating: boolean
  updatingId?: Id
  deletingId?: Id
}

const defaultState = <T>(): ICrudListState<T> => ({
  entities: undefined,
  error: undefined,
  isFetching: false,
  isCreating: false,
  updatingId: undefined,
  deletingId: undefined,
})

const fetch = {
  request: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    isFetching: true,
    entities: undefined,
  }),

  success: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    isFetching: false,
    entities: action.data,
  }),

  failure: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    isFetching: false,
    error: action.error,
  }),
}

const update = {
  request: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    updatingId: action.id,
  }),

  success: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    updatingId: undefined,
    entities: state.entities && state.entities.map(e => e.id === action.id ? action.data : e),
  }),

  failure: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    updatingId: undefined,
    error: action.error,
  }),
}

const create = {
  request: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    isCreating: true,
  }),

  success: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    isCreating: false,
    entities: [...(state.entities || []), action.data],
  }),

  failure: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    isCreating: true,
    error: action.error,
  }),
}

const remove = {
  request: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    deletingId: action.id,
  }),

  success: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    deletingId: undefined,
    entities: state.entities && state.entities.filter(e => e.id === action.id),
  }),

  failure: <T extends IEntity>(state: ICrudListState<T>, action) => ({
    ...state,
    deletingId: undefined,
    error: action.error,
  }),
}

export const crudListReducer = <T extends IEntity>(name: string): ICrudListReducer<T> => createReducer<ICrudListState<T>>(defaultState<T>(), {
  [_CRUDLIST(name).GET.REQUEST]: fetch.request,
  [_CRUDLIST(name).GET.SUCCESS]: fetch.success,
  [_CRUDLIST(name).GET.FAILURE]: fetch.failure,
  [_CRUDLIST(name).CREATE.REQUEST]: create.request,
  [_CRUDLIST(name).CREATE.SUCCESS]: create.success,
  [_CRUDLIST(name).CREATE.FAILURE]: create.failure,
  [_CRUDLIST(name).UPDATE.REQUEST]: update.request,
  [_CRUDLIST(name).UPDATE.SUCCESS]: update.success,
  [_CRUDLIST(name).UPDATE.FAILURE]: update.failure,
  [_CRUDLIST(name).REMOVE.REQUEST]: remove.request,
  [_CRUDLIST(name).REMOVE.SUCCESS]: remove.success,
  [_CRUDLIST(name).REMOVE.FAILURE]: remove.failure,
})
