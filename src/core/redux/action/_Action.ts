import {RootState} from '../reducer/index'

export const _API = (name: string) => ({
  REQUEST: `${name}_REQUEST`,
  SUCCESS: `${name}_SUCCESS`,
  FAILURE: `${name}_FAILURE`,
})

export const _CRUD = (name: string) => ({
  CREATE: _API('CREATE_' + name),
  GET: _API('GET_' + name),
  UPDATE: _API('UPDATE_' + name),
  REMOVE: _API('REMOVE_' + name),
})

export const _CRUDLIST = (name: string) => _CRUD('LIST_' + name)

export const getConsumerKey = (state: RootState) => state.consumer.entity!.key
