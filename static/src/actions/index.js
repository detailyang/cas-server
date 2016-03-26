import { START_CHECK_AUTH, LOGIN_SUCCESS, LOGIN_FAILURE, START_LOGIN } from '../constants';
import { push } from 'react-router-redux';
import { authModelInstance } from '../models/Auth';

import fetch from '../utils/fetch';


function loginSuccess (username, isAdmin) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      username,
      isAdmin
    }
  }
}

function loginFailure (msg) {
  return {
    type: LOGIN_FAILURE,
    payload: {
      msg
    }
  }
}

function startCheckAuth () {
  return {
    type: START_CHECK_AUTH
  }
}

function startLogin () {
  return {
    type: START_LOGIN
  }
}

export const checkAuth = () => 
  (dispatch, getState) => {
    dispatch(startCheckAuth())
    fetch('/api/users/self')
      .then(({ username, is_admin: isAdmin }) => {
        dispatch(loginSuccess(username, isAdmin))
      }).catch( msg => {
        dispatch(loginFailure(msg))
        dispatch(push('/login'))
      });
  } 

export const login = (username, password) =>
  (dispatch, getState) => {
    dispatch(startLogin())
    fetch('/public/users/login', 
      { method: 'POST', body: { username, password }})
      .then(({ username, is_admin: isAdmin }) => {
        dispatch(loginSuccess(username, isAdmin))
        dispatch(push('/dashboard'))
      }).catch( msg => {
        console.log(msg);
        dispatch(loginFailure(msg))
        dispatch(push('/login'))
      });
  }
