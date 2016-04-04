import { OAUTH_LIST_REQUEST, OAUTH_LIST_SUCCESS, OAUTH_LIST_FAILURE, RESET_OAUTH_LIST } from '../constants'

const initialState = {
  list: [],
  total: 0,
  per_page: 20,
  page: 1,
  fetching: false,
  field: 'name',
  keyword: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OAUTH_LIST_REQUEST:
      return {
        ...state, ...{
          fetching: true
        }
      }
    case OAUTH_LIST_SUCCESS:
    case OAUTH_LIST_FAILURE:
      return {
        ...state, ...{
          fetching: false
        }
      }
    case RESET_OAUTH_LIST:
      return {
        ...state, ...{
          list: action.payload
        }
      }
    default:
      return state
  }
}
