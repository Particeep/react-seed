import {RootState} from '../reducer/index'
import {_CRUD, getConsumerKey} from './_Action'
import {_CALL_API} from '../../middleware/api'
import {consumerRoute} from '../../../conf/routes'
import {IContextLoanequity} from '../../../type/context-loanequity'

export const LOANEQUITY = 'ctx_loanequity'
const _LOANEQUITY = _CRUD('ctx_loanequity')

export const getContextLoanequity = () => (dispatch, getState: () => RootState) => {
  const key = getConsumerKey(getState())
  return dispatch({
    [_CALL_API]: {
      types: [_LOANEQUITY.GET.REQUEST, _LOANEQUITY.GET.SUCCESS, _LOANEQUITY.GET.FAILURE],
      route: consumerRoute(key).context.getLoanequity()
    }
  })
}
export const updateContextLoanequity = (c: IContextLoanequity) => (dispatch, getState: () => RootState) => {
  const key = getConsumerKey(getState())
  return dispatch({
    [_CALL_API]: {
      types: [_LOANEQUITY.UPDATE.REQUEST, _LOANEQUITY.UPDATE.SUCCESS, _LOANEQUITY.UPDATE.FAILURE],
      route: consumerRoute(key).context.postLoanequity(c)
    }
  })
}
