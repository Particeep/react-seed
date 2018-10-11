import {UserCriteria} from '../../type/criteria/userCriteria'
import {RootState} from '../redux'
import {CALL_API} from '../middleware/api'
import {consumerRoute} from '../../conf/routes'
import {API} from './_Action'

export const fetchUsers = (criteria?: UserCriteria,) => (dispatch, getState: () => RootState) => {
  const actions = API('PAGINATE_users')
  const key = getState().consumer.entity!.key
  return dispatch({
    [CALL_API]: {
      types: [actions.REQUEST, actions.SUCCESS, actions.FAILURE],
      route: consumerRoute(key).user.search(criteria)
    }
  })
}
