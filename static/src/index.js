import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './containers';
import configureStore from './store/configureStore';
import { hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import 'antd/lib/index.css';
import './index.scss';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Root history={history} />
  </Provider>,
  document.getElementById('app')
)