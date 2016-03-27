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

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state, ... {
          loginRequesting: true
        }
      }
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return {
        ...state, ... {
          loginRequesting: false
        }
      }
    case CHECKAUTH_SUCCESS:
      const {is_admin, username } = action.payload;
      return {
        ...state, ...{
          isLogin: true, isAdmin: is_admin, username, failMsg: null, hasChecked: true
        }
      };
    case CHECKAUTH_FAILURE:
      const { message } = action;
      return {
        ...state, ...{
          isLogin: false, username: '', isAdmin: false, failMsg: message, hasChecked: true
        }
      };
    default:
      return state
  }
}
