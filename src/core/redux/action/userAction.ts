import {UserCriteria} from '../../../type/criteria/userCriteria'
import {RootState} from '../reducer/index'
import {_CALL_API} from '../../middleware/api'
import {consumerRoute} from '../../../conf/routes'
import {_API} from './_Action'
import {_PAGINATE} from './paginateAction'

export const USERS = 'users'

const _USERS = _PAGINATE(USERS)

export const fetchUsers = (criteria?: UserCriteria,) => (dispatch, getState: () => RootState) => {
  const actions = _API('PAGINATE_users')
  const key = getState().consumer.entity!.key
  return dispatch({
    [_CALL_API]: {
      types: [actions.REQUEST, actions.SUCCESS, actions.FAILURE],
      route: consumerRoute(key).user.search(criteria)
    }
  })
}
