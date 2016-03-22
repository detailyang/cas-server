/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T19:48:51+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T11:17:01+08:00
* @License: The MIT License (MIT)
*/
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from 'react-router';

import { authModelInstance } from '../models/Auth';
import { App, Loading, Login, Personal, Dashboard, DevTools } from '../containers';

export default class Root extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <div>
            <Router history={history}>
              <Route path="/" component={App}>
                <IndexRedirect to="/dashboard"/>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={Dashboard}>
                  <IndexRoute component={Personal}/>
                </Route>
              </Route>
            </Router>
            <DevTools />
        </div>
      </Provider>
    )
  }
}

function requireAuth (nextState, replace, callback) {
  setTimeout(function () {
  authModelInstance.self()
    .then(() => {
      store.dispatch(push('/'));
      callback();
    })
    .fail(() => {
      store.dispatch(push('/login'));
      callback();
    });
  }, 3000)
}


// function initApplication(data) {
//   new Router({ isAdmin: (data && data.value && data.value.is_admin)
//     || authModelInstance.get('is_admin') });
//   Backbone.history.start();
// }

// function show(component, node) {
//   ReactDOM.render(React.createElement(component), node);
// }

// show(CheckLogin, document.getElementById('app'));

// authModelInstance.self().done(initApplication).fail(() => {
//   authModelInstance.on('login-success', initApplication);
//   show(Login, document.getElementById('app'));
// });
  