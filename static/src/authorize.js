/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:17:03+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-05T00:17:23+08:00
* @License: The MIT License (MIT)
*/


import 'antd/lib/index.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Authorize from './containers/Authorize';


ReactDOM.render(React.createElement(Authorize), document.getElementById('authorize'));
