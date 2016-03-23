import { CHECK_AUTH, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
  isLogin: false,
  isAdmin: false,
  hasChecked: false,
  username: '',
  failMsg: null
}

export default createReducer(initialState, {

  [LOGIN_SUCCESS](state, action) {
    const { isAdmin, username } = action.payload;
    return {
      ...state, ...{
        isLogin: true, isAdmin, username, failMsg: null, hasChecked: true
      }
    };
  },

  [LOGIN_FAILURE](state, action) {
    const { msg } = action.payload;
    return {
      ...state, ...{
        isLogin: false, username: '', isAdmin: false, failMsg: msg, hasChecked: true
      }
    };
  }
  
})
