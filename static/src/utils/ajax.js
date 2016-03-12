/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T19:50:31+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T03:14:54+08:00
* @License: The MIT License (MIT)
*/


import _ from 'underscore';
import $ from 'jquery';

export default function (_url, _options) {
  const def = $.Deferred();
  let url = _url;
  let options = _options;

  if (typeof url === 'object') {
    options = url;
    url = undefined;
  }

  options = _.defaults(options || {}, {
    dataType: 'json',
    xhrFields: {
      withCredentials: true,
    },
  });

  def.xhr = $.ajax(url, options).done((resp, textStatus, jqXHR) => {
    if (+resp.code === 0) {
      def.resolve(resp.data, resp, jqXHR);
    } else {
      if (+resp.code === 40003) {
        def.reject('你没有权限', resp, jqXHR);
      } else {
        def.reject(resp.msg, resp, jqXHR);
      }
    }
  }).fail((jqXHR, _msg) => {
    let msg = _msg;
    let code = 99999;

    if (msg === 'error') {
      msg = '网络错误';
    }

    if (msg === 'parsererror') {
      msg = 'JSON Parse Error';
    }

    if (msg === 'abort') {
      code = -1;
    }

    def.reject(msg, {
      code: code,
      msg: msg,
    }, jqXHR);
  });

  return def;
}
