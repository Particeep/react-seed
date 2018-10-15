import {UserCriteria} from '../../../type/criteria/userCriteria'
import {RootState} from '../reducer/index'
import {getConsumerKey} from './_Action'
import {_CALL_API} from '../../middleware/api'
import {consumerRoute} from '../../../conf/routes'
import {_PAGINATE} from './paginateAction'

export const FUNDRAISES = 'fundraises'

const _FUNDRAISES = _PAGINATE(FUNDRAISES)

export const fetchFundraises = (criteria?: UserCriteria,) => (dispatch, getState: () => RootState) => {
  const key = getConsumerKey(getState())
  return dispatch({
    [_CALL_API]: {
      types: [_FUNDRAISES.REQUEST, _FUNDRAISES.SUCCESS, _FUNDRAISES.FAILURE],
      route: consumerRoute(key).fundraises.search(criteria)
    }
  })
}
