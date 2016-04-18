import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAILURE, RESET_USER_LIST, SET_USER_PAGE, SET_USER_KEYWORD } from '../constants'
import { CALL_API } from '../middleware/api'
import { fetch, pick } from '../utils'

const resetUserList = (data) => ({
  type: RESET_USER_LIST,
  payload: data
})

export const getUser = (UserId) =>
  (dispatch, getState) => {
    return fetch(`/admin/users/${UserId}`)
  }

export const fetchUserList = () => 
  (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAILURE],
        endpoint: '/admin/users',
        body: pick(getState().user, 'total', 'per_page', 'page', 'field', 'keyword')
      }
    })
    .then(data => dispatch(resetUserList(data)))
  }

export const setUserKeyword = (keyword) => ({
  type: SET_USER_KEYWORD,
  payload: {
    keyword
  }
})


export const setUserPage = (page) => ({
  type: SET_USER_PAGE,
  payload: { page }
})

export const deleteUser = (UserId) =>
  (dispatch, getState) => {
    return fetch(`/admin/users/${UserId}`, { method: 'DELETE' })
  }

export const saveUser = (values, dispatch) => 
  fetch('/admin/users/' + (values.id ? values.id : ''), {
    method: values.id ? 'PUT': 'POST',
    body: values,
  })
  .catch(error => {
    return Promise.reject(error)
  })
