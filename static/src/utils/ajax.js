import _ from 'underscore';
import $ from 'jquery';

export default function (url, options) {
    var def = $.Deferred();

    if (typeof url === 'object') {
        options = url;
        url = undefined;
    }

    options = _.defaults(options || {}, {
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        }
    });

    def.xhr = $.ajax(url, options).done(function (resp, textStatus, jqXHR) {
        if (+resp.code === 0) {
            def.resolve(resp.data, resp, jqXHR);
        } else {
            if (+resp.code === 40003) {
                def.reject('你没有权限', resp, jqXHR);
            } else {
                def.reject(resp.msg, resp, jqXHR);
            }
        }
    }).fail(function (jqXHR, msg) {
        var code = 99999;

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
            msg: msg
        }, jqXHR);
    });

    return def;
}
