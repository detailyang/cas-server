/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:23:27+08:00
* @License: The MIT License (MIT)
*/


import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import * as reducers from '../reducers';
import { DevTools } from '../containers';

import apiMiddleware from '../middleware/api';

const reducer = combineReducers({
  ...reducers,
  form: formReducer,
  routing: routerReducer,
});

export default function configureStore() {
  const historyMiddleware = routerMiddleware(hashHistory);

  const store = createStore(
    reducer,
    DevTools.instrument(),
    applyMiddleware(thunk, apiMiddleware, historyMiddleware)
  );

  return store;
}
