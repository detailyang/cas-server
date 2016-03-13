/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:17:03+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T00:50:42+08:00
* @License: The MIT License (MIT)
*/


import 'antd/lib/index.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './views/Login';


function show(component, node) {
  ReactDOM.render(React.createElement(component), node);
}

show(Login, document.getElementById('oauth'));
