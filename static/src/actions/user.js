/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:45:05+08:00
* @License: The MIT License (MIT)
*/


import { USER_LIST_REQUEST, USER_LIST_SUCCESS,
         USER_LIST_FAILURE, RESET_USER_LIST,
         SET_USER_PAGE, SET_USER_KEYWORD } from '../constants';
import { CALL_API } from '../middleware/api';
import { fetch, pick } from '../utils';

const resetUserList = (data) => ({
  type: RESET_USER_LIST,
  payload: data,
});

export const getUser = (UserId) =>
  (dispatch, getState) => {
    return fetch(`/admin/users/${UserId}`);
  };

export const fetchUserList = () =>
  (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAILURE],
        endpoint: '/admin/users',
        body: pick(getState().user, 'total', 'per_page', 'page', 'field', 'keyword'),
      },
    })
    .then(data => dispatch(resetUserList(data)));
  };

export const setUserKeyword = (keyword) => ({
  type: SET_USER_KEYWORD,
  payload: {
    keyword,
  },
});


export const setUserPage = (page) => ({
  type: SET_USER_PAGE,
  payload: { page },
});

export const deleteUser = (userId) =>
  (dispatch, getState) => {
    return fetch(`/admin/users/${userId}`, { method: 'DELETE' });
  };

export const saveUser = (values, dispatch) =>
  fetch('/admin/users/' + (values.id ? values.id : ''), {
    method: values.id ? 'PUT' : 'POST',
    body: values,
  })
  .catch(error => {
    return Promise.reject(error);
  });

export const resetUser = (userId) =>
  (dispatch, getState) => {
    return fetch(`/admin/users/${userId}/staticpassword`, {
      method: 'PUT',
      body: {
        reset: true,
      },
    });
  };
