/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:12:58+08:00
* @License: The MIT License (MIT)
*/


import { OAUTH_LIST_REQUEST,
         OAUTH_LIST_SUCCESS,
         OAUTH_LIST_FAILURE,
         RESET_OAUTH_LIST,
         SET_OAUTH_PAGE,
         SET_OAUTH_KEYWORD,
       } from '../constants';

const initialState = {
  list: [],
  total: 0,
  per_page: 20,
  page: 1,
  fetching: false,
  field: 'name',
  keyword: '',
  formErrors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OAUTH_LIST_REQUEST:
      return {
        ...state, ...{
          fetching: true,
        },
      };
    case OAUTH_LIST_SUCCESS:
    case OAUTH_LIST_FAILURE:
      return {
        ...state, ...{
          fetching: false,
        },
      };
    case RESET_OAUTH_LIST:
      const data = action.payload;
      return {
        ...state, ...{
          list: data.value,
          total: data.total,
          page: data.page,
        },
      };
    case SET_OAUTH_PAGE:
      return {
        ...state, ...{
          page: action.payload.page,
        },
      };
    case SET_OAUTH_KEYWORD:
      return {
        ...state, ...{
          keyword: action.payload.keyword,
        },
      };
    default:
      return state;
  }
};
