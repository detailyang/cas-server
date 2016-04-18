import { CHECKAUTH_REQUEST, CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE, LOGOUT } from '../constants'

const initialState = {
  isLogin: false,
  isAdmin: false,
  hasChecked: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKAUTH_SUCCESS:
      const { is_admin } = action.payload.value;
      return {
        ...state, ...{
          isLogin: true, isAdmin: is_admin, hasChecked: true
        }
      }
    case CHECKAUTH_FAILURE:
    case LOGOUT:
      const { message } = action;
      return {
        ...state, ...{
          isLogin: false, isAdmin: false, hasChecked: true
        }
      }
    default:
      return state
  }
}
