import { PERSONAL_SAVE_REQUEST, PERSONAL_SAVE_SUCCESS, PERSONAL_SAVE_FAILURE, RESET_PERSONAL } from '../constants'
import { pick } from '../utils'

const initialState = {
  id: null,
  username: '',
  realname: '',
  aliasname: '',
  mobile: '',
  email: '',
  is_delete: false,
  gender: false,
  key: '',
  notp: '',
  upload_url: '',
  requesting: false
}


export const fields = Object.keys(initialState)

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PERSONAL:
      return {
        ...state, ...pick(action.payload, ...Object.keys(initialState))
      };
    case PERSONAL_SAVE_REQUEST:
      return {
        ...state, ...{ requesting: true }
      }
    case PERSONAL_SAVE_SUCCESS:
    case PERSONAL_SAVE_FAILURE:
      return {
        ...state, ...{ requesting: false }
      }
    default:
      return state
  }
}
