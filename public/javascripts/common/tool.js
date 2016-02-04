/**
 * Created by WesternRanger on 16/1/7.
 */
define(['jquery'],function($){

    var cookie = function(name, value, options) {
        var cookie, cookieValue, cookies, date, domain, expires, i, path, secure, _i, _ref;
        if (typeof value !== 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            expires = '';
            if (options.expires && ((typeof options.expires === 'number') || options.expires.toUTCString)) {
                date = null;
                if (typeof options.expires === 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            path = options.path ? '; path=' + options.path : '';
            domain = options.domain ? '; domain=' + options.domain : '';
            secure = options.secure ? '; secure' : '';
            return document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                cookies = document.cookie.split(';');
                for (i = _i = 0, _ref = cookies.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                    cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
    var getUrlParam = function(name) {
        var r, reg;
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        r = encodeURI(window.location.search).substr(1).match(reg);
        if (r !== null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }
    return{
        cookie:cookie,
        getUrlParam:getUrlParam
    }
})