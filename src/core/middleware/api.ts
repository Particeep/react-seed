export const _CALL_API = 'Call API'

export default store => next => action => {
  const callAPI = action[_CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  const {route, types} = callAPI

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const [requestType, successType, failureType] = types

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[_CALL_API]
    return finalAction
  }

  next(actionWith({type: requestType}))

  route.then(
    data => {
      next(actionWith({
        type: successType,
        data,
      }))
    },
    error => {
      console.log(error)
      next(actionWith({
        type: failureType,
        error: error.messages || 'An error occured'
      }))
    }
  )
  return route
}

