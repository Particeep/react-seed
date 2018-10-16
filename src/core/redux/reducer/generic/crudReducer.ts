import {createReducer} from '../utils/createReducer'
import {_CRUD} from '../../action/_Action'
import {IEntity} from '../../../../type/entity'

export type ICrudReducer<T extends IEntity> = (s: ICrudState<T>, action: any) => ICrudState<T>

interface ICrudState<T> {
  entity?: T
  error?: string
  isFetching: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
}

const defaultState = <T>(defaultEntity?: T): ICrudState<T> => ({
  entity: defaultEntity,
  error: undefined,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
})

const fetch = {
  request: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isFetching: true,
    entity: undefined,
  }),

  success: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isFetching: false,
    entity: action.data,
  }),

  failure: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isFetching: false,
    error: action.error,
  }),
}

const update = {
  request: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isUpdating: true,
  }),

  success: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isUpdating: false,
    entity: action.data,
  }),

  failure: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isUpdating: false,
    error: action.error,
  }),
}

const create = {
  request: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isCreating: true,
  }),

  success: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isCreating: false,
    entity: action.data,
  }),

  failure: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isCreating: true,
    error: action.error,
  }),
}

const remove = {
  request: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isDeleting: action.id,
  }),

  success: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isDeleting: undefined,
    entity: undefined,
  }),

  failure: <T extends IEntity>(state: ICrudState<T>, action) => ({
    ...state,
    isDeleting: undefined,
    error: action.error,
  }),
}

export const crudReducer = <T extends IEntity>(name: string, defaultEntity?: T): ICrudReducer<T> => createReducer<ICrudState<T>>(defaultState<T>(defaultEntity), {
  [_CRUD(name).GET.REQUEST]: fetch.request,
  [_CRUD(name).GET.SUCCESS]: fetch.success,
  [_CRUD(name).GET.FAILURE]: fetch.failure,
  [_CRUD(name).CREATE.REQUEST]: create.request,
  [_CRUD(name).CREATE.SUCCESS]: create.success,
  [_CRUD(name).CREATE.FAILURE]: create.failure,
  [_CRUD(name).UPDATE.REQUEST]: update.request,
  [_CRUD(name).UPDATE.SUCCESS]: update.success,
  [_CRUD(name).UPDATE.FAILURE]: update.failure,
  [_CRUD(name).REMOVE.REQUEST]: remove.request,
  [_CRUD(name).REMOVE.SUCCESS]: remove.success,
  [_CRUD(name).REMOVE.FAILURE]: remove.failure,
})
