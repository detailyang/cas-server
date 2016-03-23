import { CHECK_AUTH, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';
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
    type: CHECK_AUTH
  }
}

export const checkAuth = () => 
  (dispatch, getState) => {
    dispatch(startCheckAuth());
    fetch('/api/users/self').then(({ username, is_admin: isAdmin }) => 
      dispatch(loginSuccess(username, isAdmin))
    ).catch( msg => {
        dispatch(loginFailure(msg))
        dispatch(push('/login'))
      }
    );
  } 
