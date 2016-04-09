import { OAUTH_LIST_REQUEST, OAUTH_LIST_SUCCESS, OAUTH_LIST_FAILURE, RESET_OAUTH_LIST, SET_OAUTH_PAGE } from '../constants'
import { CALL_API } from '../middleware/api'
import { fetch, pick } from '../utils'

const resetOAuthList = (data) => ({
  type: RESET_OAUTH_LIST,
  payload: data
})

export const requestOAuthList = () => 
  (dispatch, getState) => {
    dispatch({
      [CALL_API]: {
        types: [OAUTH_LIST_REQUEST, OAUTH_LIST_SUCCESS, OAUTH_LIST_FAILURE],
        endpoint: '/admin/oauths',
        body: pick(getState().OAuth, 'total', 'per_page', 'page', 'field', 'keyword')
      }
    })
    .then(data => dispatch(resetOAuthList(data)))
  }

export const setOAuthPage = (page) => 
  (dispatch, getState) => {
    dispatch({
      type: SET_OAUTH_PAGE,
      payload: { page }
    })

    requestOAuthList()(dispatch, getState)
  }