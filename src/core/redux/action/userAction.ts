import {UserCriteria} from '../../../type/criteria/userCriteria'
import {RootState} from '../reducer/index'
import {_CALL_API} from '../../middleware/api'
import {consumerRoute} from '../../../conf/routes'
import {_PAGINATE} from './paginateAction'

export const USERS = 'users'

const _USERS = _PAGINATE(USERS)

export const fetchUsers = (criteria?: UserCriteria,) => (dispatch, getState: () => RootState) => {
  const key = getState().consumer.entity!.key
  return dispatch({
    [_CALL_API]: {
      types: [_USERS.REQUEST, _USERS.SUCCESS, _USERS.FAILURE],
      route: consumerRoute(key).user.search(criteria)
    }
  })
}
