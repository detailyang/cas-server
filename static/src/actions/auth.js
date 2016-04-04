import { CHECKAUTH_REQUEST, CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE } from '../constants'
import { push } from 'react-router-redux'

import { CALL_API } from '../middleware/api'
import { resetPersonal } from './personal'
import { fetch } from '../utils'


export const checkAuth = () => 
  (dispatch, getState) => 
    dispatch({
      [CALL_API]: {
        types: [CHECKAUTH_REQUEST, CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE],
        endpoint: '/api/users/self'
      }
    })
    .then(data => dispatch(resetPersonal(data)))
    .catch(() => dispatch(push('/login')))

export const login = (values, dispatch) => 
  fetch('/public/users/login', {
    method: 'POST',
    body: values,
  })
  .then(() => {
    dispatch(checkAuth());
    dispatch(push('/dashboard'))
  })
