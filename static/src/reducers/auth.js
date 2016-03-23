import { CHECK_AUTH, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';

const initialState = {
  isLogin: false,
  isAdmin: false,
  hasChecked: false,
  username: '',
  failMsg: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { isAdmin, username } = action.payload;
      return {
        ...state, ...{
          isLogin: true, isAdmin, username, failMsg: null, hasChecked: true
        }
      };
    case LOGIN_FAILURE:
      const { msg } = action.payload;
      return {
        ...state, ...{
          isLogin: false, username: '', isAdmin: false, failMsg: msg, hasChecked: true
        }
      };
    default:
      return state;
  }
}