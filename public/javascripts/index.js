(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Created by WesternRanger on 16/2/4.
 */

var countTime = 1;
$("ul.intro").click(function () {
    var user = $("input[name='title']").val(),
        pass = $("textarea[name='content']").val(),
        _url = '/api/demo/profile',
        _data = {};

    getAjax(_url, _data, function (rs) {
        console.log(44);
        if (countTime < 10) {
            countTime++;
            setTimeout(function () {
                $("ul.intro").click();
            }, 1000);
        }
    });
});
function getAjax(_url, _data, d) {
    $.ajax({
        url: _url,
        type: 'post',
        data: _data,
        success: function success(rs) {
            d(rs);
        }
    });
}
},{}]},{},[1])