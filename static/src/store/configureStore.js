import React from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import * as reducers from '../reducers';
import { DevTools } from '../containers';

import apiMiddleware from '../middleware/api';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

export default function configureStore(initialState) {
  const historyMiddleware = routerMiddleware(hashHistory);

  const store = createStore(
    reducer,
    DevTools.instrument(),
    applyMiddleware(thunk, apiMiddleware, historyMiddleware)
  );

  return store;
}