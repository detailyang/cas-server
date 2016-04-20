/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:47:14+08:00
* @License: The MIT License (MIT)
*/


import { OAUTH_LIST_REQUEST, OAUTH_LIST_SUCCESS, OAUTH_LIST_FAILURE,
         RESET_OAUTH_LIST, SET_OAUTH_PAGE, SET_OAUTH_KEYWORD } from '../constants';
import { CALL_API } from '../middleware/api';
import { fetch, pick } from '../utils';

const resetOAuthList = (data) => ({
  type: RESET_OAUTH_LIST,
  payload: data,
});

export const getOAuth = (OAuthId) =>
  (dispatch, getState) => {
    return fetch(`/admin/oauths/${OAuthId}`);
  };

export const fetchOAuthList = () =>
  (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: [OAUTH_LIST_REQUEST, OAUTH_LIST_SUCCESS, OAUTH_LIST_FAILURE],
        endpoint: '/admin/oauths',
        body: pick(getState().OAuth, 'total', 'per_page', 'page', 'field', 'keyword'),
      },
    })
    .then(data => dispatch(resetOAuthList(data)));
  };

export const setOAuthKeyword = (keyword) => ({
  type: SET_OAUTH_KEYWORD,
  payload: {
    keyword,
  },
});


export const setOAuthPage = (page) => ({
  type: SET_OAUTH_PAGE,
  payload: { page },
});

export const deleteOAuth = (OAuthId) =>
  (dispatch, getState) => {
    return fetch(`/admin/oauths/${OAuthId}`, { method: 'DELETE' });
  };

export const saveOAuth = (values, dispatch) =>
  fetch('/admin/oauths/' + (values.id ? values.id : ''), {
    method: values.id ? 'PUT' : 'POST',
    body: values,
  })
  .catch(error => {
    return Promise.reject(error);
  });
