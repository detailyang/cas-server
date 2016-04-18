import fetch from '../utils/fetch';



// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types } = callAPI;
  const option = {
    method: callAPI.method || 'get',
    body: callAPI.body
  }

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ 
    type: requestType,
    payload: { endpoint, ...option }
  }));

  return fetch(endpoint, option).then(
    data => {
      next(actionWith({
        payload: data,
        type: successType
      }))

      return data;
    },
    error => {
      next(actionWith({
        type: failureType,
        error: error
      }))

      return Promise.reject(error);
    }
  )
};