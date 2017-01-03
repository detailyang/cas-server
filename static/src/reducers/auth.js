/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:27:32+08:00
* @License: The MIT License (MIT)
*/


import { CHECKAUTH_SUCCESS, CHECKAUTH_FAILURE, LOGOUT } from '../constants';

const initialState = {
  isLogin: false,
  isAdmin: false,
  hasChecked: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKAUTH_SUCCESS:
      const { is_admin } = action.payload.value;
      return {
        ...state, ...{
          isLogin: true, isAdmin: is_admin, hasChecked: true,
        },
      };
    case CHECKAUTH_FAILURE:
    case LOGOUT:
      return {
        ...state, ...{
          isLogin: false, isAdmin: false, hasChecked: true,
        },
      };
    default:
      return state;
  }
};
