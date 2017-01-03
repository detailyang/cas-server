/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:34:05+08:00
* @License: The MIT License (MIT)
*/


import React from 'react';
import { Nav, Header } from '../components';
import { connect } from 'react-redux';
import { logout } from '../actions';

function Dashboard({ children, auth, location, logout }) {
  return (
    <div>
      <Header handleLogout={logout} />
      <Nav isAdmin={ auth.isAdmin } currentPath={ location.pathname } />
      <div className="dashboard-container">{children}</div>
    </div>
  );
}


export default connect(
  ({ auth }) => ({ auth }),
  { logout }
)(Dashboard);
