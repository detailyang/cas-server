/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:22:45+08:00
* @License: The MIT License (MIT)
*/


import fetch from 'isomorphic-fetch';

export default (url, option) => {
  option = Object.assign({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'get',
  }, option);

  if (option.method.toLowerCase() === 'get' && option.body) {
    const suffix = Object.keys(option.body)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(option.body[key])}`)
            .join('&')
            .replace(/%20/g, '+');
    url += `?${suffix}`;
    delete option.body;
  }
  if (option.body) {
    option.body = JSON.stringify(option.body);
  }
  return fetch(url, option)
    .then(res => res.json())
    .then(res => {
      if (+res.code === 0) {
        return Promise.resolve(res.data);
      }
      return Promise.reject({
        message: res.msg,
        data: res.data,
      });
    });
};
