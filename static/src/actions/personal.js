/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:46:14+08:00
* @License: The MIT License (MIT)
*/


import { RESET_PERSONAL, SAVE_PERSNOAL_FAILURE, CHANGE_PASSWORD_REQUEST,
         CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
         CHECK_DYNAMIC_PASSWORD_REQUEST, CHECK_DYNAMIC_PASSWORD_SUCCESS,
         CHECK_DYNAMIC_PASSWORD_FAILURE } from '../constants';
import { fetch } from '../utils';
import { CALL_API } from '../middleware/api';

export const resetPersonal = (data) => ({
  type: RESET_PERSONAL,
  payload: data,
});

const savePersonalFail = (errors) => ({
  type: SAVE_PERSNOAL_FAILURE,
  payload: { errors },
});

export const savePersonal = (values, dispatch) =>
  fetch('/api/users/self', {
    method: values.id ? 'PUT' : 'POST',
    body: values,
  })
  .then(() => {
    dispatch(resetPersonal(values));
    return values;
  })
  .catch(error => {
    dispatch(savePersonalFail(error.data.errors));
    return Promise.reject(error);
  });

export const changePassword = (oldpassword, newpassword) =>
  (dispatch, getState) =>
    dispatch({
      [CALL_API]: {
        types: [CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE],
        endpoint: '/api/users/self/staticpassword',
        method: 'PUT',
        body: { oldpassword, newpassword },
      },
    });

export const checkDynamicPassword = (password) =>
  (dispatch, getState) =>
    dispatch({
      [CALL_API]: {
        types: [CHECK_DYNAMIC_PASSWORD_REQUEST, CHECK_DYNAMIC_PASSWORD_SUCCESS,
                CHECK_DYNAMIC_PASSWORD_FAILURE],
        endpoint: '/api/users/self/dynamicpassword',
        method: 'POST',
        body: { dynamicpassword: password },
      },
    });
