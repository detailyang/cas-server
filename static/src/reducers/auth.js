import { CHECKAUTH_REQUEST, CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
  isLogin: false,
  isAdmin: false,
  hasChecked: false,
  username: '',
  failMsg: null,
  loginRequesting: false
}

export default createReducer(initialState, {

  [LOGIN_REQUEST](state, action) {
    return {
      ...state, ... {
        loginRequesting: true
      }
    }
  },

  [LOGIN_SUCCESS](state, action) {
    return {
      ...state, ... {
        loginRequesting: false
      }
    }
  },

  [LOGIN_FAILURE](state, action) {
    return {
      ...state, ... {
        loginRequesting: false
      }
    }
  },

  [CHECKAUTH_SUCCESS](state, action) {
    const {is_admin, username } = action.payload;
    return {
      ...state, ...{
        isLogin: true, isAdmin: is_admin, username, failMsg: null, hasChecked: true
      }
    };
  },

  [CHECKAUTH_FAILURE](state, action) {
    const { message } = action;
    return {
      ...state, ...{
        isLogin: false, username: '', isAdmin: false, failMsg: message, hasChecked: true
      }
    };
  }
  
})
