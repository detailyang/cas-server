import { CHECKAUTH_REQUEST, CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants'
import { push } from 'react-router-redux'
import Antd from 'antd'
import { initialize as initializeForm } from 'redux-form'

import { CALL_API } from '../middleware/api'
import { fields } from '../reducers/personal'


export const checkAuth = () => 
  (dispatch, getState) => 
    dispatch({
      [CALL_API]: {
        types: [CHECKAUTH_REQUEST, CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE],
        endpoint: '/api/users/self',
        onSuccess: () => dispatch(initializeForm('personal', getState().personal, fields)),
        onFail: () => dispatch(push('/login'))
      }
    })

export const login = (username, password) =>
  (dispatch, getState) => 
    dispatch({
      [CALL_API]: {
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
        endpoint: '/public/users/login',
        method: 'POST',
        body: { username, password },
        onSuccess: () => {
          checkAuth(dispatch);
          dispatch(push('/dashboard'))
        },
        onFail: error => Antd.message.error(error.message, 3)
      }
    })
