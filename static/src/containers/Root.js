/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T19:48:51+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T11:17:01+08:00
* @License: The MIT License (MIT)
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from 'react-router';
import { push } from 'react-router-redux';

import { App, Loading, Login, Personal, Dashboard, DevTools } from '../containers';

import { checkAuth } from '../actions';

class Root extends Component {

  constructor (props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
    
    this.props.checkAuth();
  }

  render () {
    const { history, auth } = this.props;
    
    const router = (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRedirect to="/dashboard"/>
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}>
            <IndexRoute component={Personal}/>
          </Route>
        </Route>
      </Router>
    )

    return (
        <div>
          { auth.hasChecked ? router : <Loading/> }
          <DevTools />
        </div>
    )
  }

  loggedIn (state) {
    return state.login.isLogged;
  }

}

export default connect(
  (({auth})=>({auth})),
  { checkAuth }
)(Root);