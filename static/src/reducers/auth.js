import { CHECKAUTH_REQUEST, CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE } from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
  isLogin: false,
  isAdmin: false,
  hasChecked: false,
  username: '',
  failMsg: null
}

export default createReducer(initialState, {

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
