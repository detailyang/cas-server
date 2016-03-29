import { RESET_PERSONAL } from '../constants'
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
  upload_url: ''
}


export const fields = Object.keys(initialState)

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PERSONAL:
      return {
        ...state, ...pick(action.payload, ...Object.keys(initialState))
      };
    default:
      return state
  }
}
