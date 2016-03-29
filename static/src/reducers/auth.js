import { CHECKAUTH_REQUEST, CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE } from '../constants';

const initialState = {
  isLogin: false,
  isAdmin: false,
  hasChecked: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKAUTH_SUCCESS:
      const { is_admin } = action.payload;
      return {
        ...state, ...{
          isLogin: true, isAdmin: is_admin, hasChecked: true
        }
      };
    case CHECKAUTH_FAILURE:
      const { message } = action;
      return {
        ...state, ...{
          isLogin: false, isAdmin: false, hasChecked: true
        }
      };
    default:
      return state
  }
}
