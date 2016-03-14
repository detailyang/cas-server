/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T21:04:44+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T21:05:54+08:00
* @License: The MIT License (MIT)
*/

const models = require('../models');

models.user.afterUpdate(function(user) {
  console.log(user);
});
