import {UserCriteria} from '../../type/criteria/userCriteria'
import {RootState} from '../redux'
import {API} from './_Action'
import {CALL_API} from '../middleware/api'
import {consumerRoute} from '../../conf/routes'

export const fetchFundraises = (criteria?: UserCriteria,) => (dispatch, getState: () => RootState) => {
  const actions = API('PAGINATE_fundraises')
  const key = getState().consumer.entity!.key
  return dispatch({
    [CALL_API]: {
      types: [actions.REQUEST, actions.SUCCESS, actions.FAILURE],
      route: consumerRoute(key).fundraises.search(criteria)
    }
  })
}
