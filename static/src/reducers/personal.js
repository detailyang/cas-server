/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:25:49+08:00
* @License: The MIT License (MIT)
*/


import { RESET_PERSONAL, SAVE_PERSNOAL_FAILURE } from '../constants';
import { pick } from '../utils';

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
  formErrors: {},
};


export const fields = Object.keys(initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PERSONAL:
      return {
        ...state, ...pick(action.payload, ...Object.keys(initialState)), ...{ formErrors: {} },
      };
    case SAVE_PERSNOAL_FAILURE:
      return {
        ...state, ...{ formErrors: action.payload.errors },
      };
    default:
      return state;
  }
};
